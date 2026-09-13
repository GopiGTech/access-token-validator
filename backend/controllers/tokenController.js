const jwt = require("jsonwebtoken");
const Validation = require("../models/validation");

const validateToken = async (req, res) => {

    const { token, verificationKey } = req.body;

    const supportedAlgorithm = [
        "HS256", "HS384", "HS512",
        "RS256", "RS384", "RS512",
        "PS256", "PS384", "PS512",
        "ES256", "ES384", "ES512"
    ];

    const algorithmTypes = {
        HS256: "secret",
        HS384: "secret",
        HS512: "secret",

        RS256: "publicKey",
        RS384: "publicKey",
        RS512: "publicKey",

        PS256: "publicKey",
        PS384: "publicKey",
        PS512: "publicKey",

        ES256: "publicKey",
        ES384: "publicKey",
        ES512: "publicKey"
    };

    try {

        if (!token) {
            return res.status(400).json({
                message: "token required"
            });
        }

        if (!verificationKey) {
            return res.status(400).json({
                message: "verification key required"
            });
        }

        const decodeHeader = jwt.decode(token, { complete: true });

        if (!decodeHeader?.header?.alg) {
            return res.status(400).json({
                message: "Invalid JWT token"
            });
        }

        const algorithm = decodeHeader.header.alg;
        const keyType = algorithmTypes[algorithm];

        if (!supportedAlgorithm.includes(algorithm)) {
            return res.status(400).json({
                valid: false,
                message: `Unsupported algorithm ${algorithm}`
            });
        }

        if (keyType === "secret" && typeof verificationKey !== "string") {
            return res.status(400).json({
                valid: false,
                message: "A secret is required for this algorithm"
            });
        }

        if (keyType === "publicKey" && typeof verificationKey !== "string") {
            return res.status(400).json({
                valid: false,
                message: "A public key is required for this algorithm"
            });
        }

        const decoded = jwt.verify(
            token,
            verificationKey,
            {
                complete: true,
                algorithms: [algorithm]
            }
        );

        await Validation.create({
            valid: true,
            expired: false,
            algorithm: decoded.header.alg,
            issuer: decoded.payload.iss,
            audience: decoded.payload.aud,
            claims: decoded.payload,
            validatedAt: new Date()
        });

        res.status(200).json({
            valid: true,
            expired: false,
            algorithm: decoded.header.alg,
            claims: decoded.payload,
            issuedAt: decoded.payload.iat
                ? new Date(decoded.payload.iat * 1000)
                : null,
            expiresAt: decoded.payload.exp
                ? new Date(decoded.payload.exp * 1000)
                : null
        });

    } catch (error) {

        if (error.name === "TokenExpiredError") {

    const decoded = jwt.decode(token, { complete: true });

    await Validation.create({
        valid: false,
        expired: true,
        algorithm: decoded.header.alg,
        issuer: decoded.payload.iss,
        audience: decoded.payload.aud,
        claims: decoded.payload,
        validatedAt: new Date()
    });

    return res.status(400).json({
        valid: false,
        expired: true,
        message: "Token expired",

        algorithm: decoded.header.alg,
        claims: decoded.payload,

        issuedAt: decoded.payload.iat
            ? new Date(decoded.payload.iat * 1000)
            : null,

        expiresAt: decoded.payload.exp
            ? new Date(decoded.payload.exp * 1000)
            : null
    });
}

        if (error.name === "JsonWebTokenError") {

            const decoded = jwt.decode(token, { complete: true });

            await Validation.create({
                valid: false,
                expired: false,
                algorithm: decoded?.header?.alg || null,
                issuer: decoded?.payload?.iss || null,
                audience: decoded?.payload?.aud || null,
                claims: {},
                validatedAt: new Date()
            });

            return res.status(400).json({
                valid: false,
                expired: false,
                message: "Invalid token",
                error: error.message
            });
        }

        return res.status(500).json({
            valid: false,
            message: "Server error"
        });
    }
};

const getValidations = async (req, res) => {
    try {
        const { page, limit, status } = req.query;

        const pageNumber = parseInt(page,10);

        const limitNumber = parseInt(limit,10);

        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
            return res.status(400).json({
                message: "Page and limit must be positive numbers"
            })
        }

        const filter = {};

        if(status === "valid"){
            filter.valid = true;
            filter.expired = false;
        }

        if(status === "expired"){
            filter.expired = true;
        }

        if(status === "invalid"){
            filter.valid = false;
            filter.expired = false;
        }

        const skipNo = (pageNumber - 1) * limitNumber;

        const tokenData = await Validation.find(filter).sort({ validatedAt: -1 }).skip(skipNo).limit(limitNumber);

        const totalRecords = await Validation.countDocuments(filter);

        const totalPages = Math.ceil(totalRecords / limitNumber);

        return res.status(200).json({
            message: "Token retrieved",
            tokenData,
            currentPage: pageNumber,
            limit: limitNumber,
            totalRecords,
            totalPages
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

const getValidationById = async (req, res) => {
    try {
        const id = req.params.id;
        const tokenData = await Validation.findById(id);
        if (!tokenData) {
            return res.status(404).json({
                message: "Token not found"
            });
        }
        res.status(200).json({
            message: "Token retrieved!",
            tokenData
        })
    }
    catch (error) {
        if (error.name === "CastError")
            return res.status(400).json({
                message: "Invalid validation ID",
                error: error.message
            })

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};

const deleteValidation = async (req, res) => {

    try {

        const { id } = req.params;

        const tokenData = await Validation.findByIdAndDelete(id);

        if (!tokenData) {
            return res.status(404).json({
                message: "Record not found"
            });
        }
        return res.status(200).json({
            message: "Record deleted successfully",
            tokenData
        });
    }

    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid validation ID",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const deleteAllValidations = async (req, res) => {
    try {
        const tokenData = await Validation.deleteMany();

        if (tokenData.deletedCount === 0) {
            return res.status(404).json({
                message: "No validation records found to delete"
            });
        }

        return res.status(200).json({
            message: "All records deleted successfully",
            deletedCount: tokenData.deletedCount
        });
    }

    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
};

module.exports = { validateToken,getValidations,getValidationById,deleteValidation,deleteAllValidations };