import {
    ShieldCheck,
    CircleCheck,
    CircleAlert,
    CircleX,
    Braces,
    Copy,
    Shield,
    Eye,
    PenLine,
    Trash2,
    User,
    Mail
} from "lucide-react";

import { useState, useEffect } from "react";
import { validateToken } from "../services/api";

const Validator = () => {

    const [token, setToken] = useState("");
    const [verificationKey, setVerificationKey] = useState("");
    const [validationResult, setValidationResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);
    const [detectedAlgorithm, setDetectedAlgorithm] = useState("");

    const [claimsCopied, setClaimsCopied] = useState(false);
    const [permissionsCopied, setPermissionsCopied] = useState(false);

    const permissions = validationResult?.claims?.permissions || [];

    const isValid = validationResult?.valid;
    const isExpired = validationResult?.expired;


    // Token Expiry Countdown

    useEffect(() => {

        if (!validationResult?.expiresAt) {
            setTimeLeft(null);
            return;
        }

        const updateTimeLeft = () => {

            const expiryTime = new Date(
                validationResult.expiresAt
            ).getTime();

            const currentTime = Date.now();

            const difference = expiryTime - currentTime;

            if (isNaN(expiryTime)) {
                setTimeLeft(null);
                return;
            }

            if (difference <= 0) {
                setTimeLeft("Expired");
                return;
            }

            const totalSeconds = Math.floor(
                difference / 1000
            );

            const hours = Math.floor(
                totalSeconds / 3600
            );

            const minutes = Math.floor(
                (totalSeconds % 3600) / 60
            );

            const seconds = totalSeconds % 60;

            setTimeLeft(
                `${hours}h ${minutes}m ${seconds}s left`
            );
        };

        updateTimeLeft();

        const interval = setInterval(
            updateTimeLeft,
            1000
        );

        return () => clearInterval(interval);

    }, [validationResult]);


    // Token Validation Handler

    const handleValidate = async () => {

        if (!token.trim()) {
            setValidationResult(null);

            setErrorMessage(
                "Please enter a JWT token."
            );

            return;
        }

        if (!verificationKey.trim()) {
            setValidationResult(null);

            setErrorMessage(
                "Please enter a verification secret or public key."
            );

            return;
        }

        try {

            setErrorMessage("");

            const data = await validateToken(
                token,
                verificationKey
            );

            setValidationResult(data);

        } catch (error) {

            setValidationResult(null);

            setErrorMessage(
                error.message
            );
        }
    };


    // Copy Claims Handler

    const handleCopyClaims = async () => {

        if (!validationResult?.claims) return;

        await navigator.clipboard.writeText(
            JSON.stringify(
                validationResult.claims,
                null,
                2
            )
        );

        setClaimsCopied(true);

        setTimeout(() => {
            setClaimsCopied(false);
        }, 2000);

    };


    // Copy Permissions Handler

    const handleCopyPermissions = async () => {

        if (!permissions?.length) return;

        await navigator.clipboard.writeText(
            JSON.stringify(
                permissions,
                null,
                2
            )
        );

        setPermissionsCopied(true);

        setTimeout(() => {
            setPermissionsCopied(false);
        }, 2000);

    };


    // Permission Icons Mapping

    const permissionIcons = {
        read: Eye,
        write: PenLine,
        delete: Trash2,
        profile: User,
        email: Mail
    };


    // JWT Algorithm Detection

    const detectAlgorithm = (token) => {

        try {

            const parts = token
                .trim()
                .split(".");

            if (parts.length !== 3) {
                setDetectedAlgorithm("");
                return;
            }

            const header = JSON.parse(
                atob(
                    parts[0]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );

            setDetectedAlgorithm(
                header.alg || ""
            );

        } catch {

            setDetectedAlgorithm("");

        }
    };

    return (

        <div className="min-h-screen bg-slate-50">


            {/* Page Header */}

            <div className="flex flex-col items-center px-4 py-8 sm:px-6 sm:py-10">

                <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
                    Access Token Validator
                </h1>

                <p className="mt-2 text-center text-sm text-slate-500 sm:text-base">
                    Validate and inspect your JWT access token
                </p>

            </div>


            {/* Token Validation Form */}

            <div className="mx-auto w-[95%] max-w-6xl rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:w-[90%] sm:p-5 lg:w-[80%]">


                {/* JWT Token Input Section */}

                <div className="flex flex-col gap-2">

                    <p className="text-sm font-medium text-slate-900">
                        JWT Access Token
                    </p>

                    <textarea
                        placeholder="Paste your token here..."
                        className="min-h-40 w-full resize-none rounded-lg border border-slate-300 bg-white p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={token}
                        onChange={(e) => {
                            setToken(e.target.value);
                            detectAlgorithm(e.target.value);
                        }}
                    />

                </div>


                {/* Token Character Counter */}

                <div className="mt-1 flex justify-between gap-2 text-xs text-slate-400">

                    <p>
                        {token.length} characters
                    </p>

                    <p>
                        {token.length}/10000
                    </p>

                </div>


                {/* Verification Key Section */}

                <div className="mt-5 flex flex-col gap-2">

                    <p className="text-sm font-medium text-slate-900">

                        {detectedAlgorithm.startsWith("HS")

                            ? "Verification Secret"

                            : detectedAlgorithm

                                ? "Verification Public Key"

                                : "Verification Secret / Public Key"}

                    </p>

                    <textarea
                        placeholder={
                            detectedAlgorithm.startsWith("HS")

                                ? "Enter your signing secret..."

                                : detectedAlgorithm

                                    ? "Paste your public key..."

                                    : "Enter secret or public key..."
                        }

                        className="min-h-32 w-full resize-none rounded-lg border border-slate-300 bg-white p-4 font-mono text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        value={verificationKey}

                        onChange={(e) =>
                            setVerificationKey(
                                e.target.value
                            )
                        }
                    />

                    <p className="text-xs leading-5 text-slate-400">
                        Use the signing secret for HMAC algorithms or the public key for RSA/ECDSA algorithms.
                    </p>

                </div>


                {/* Validate Token Button */}

                <div className="mt-5 flex justify-center">

                    <button
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
                        onClick={handleValidate}
                    >

                        <ShieldCheck size={20} />

                        Validate Token

                    </button>

                </div>


                {/* Error Message Display */}

                {errorMessage && (

                    <p className="mt-3 text-center text-sm text-red-500">

                        {errorMessage}

                    </p>

                )}


                {/* Validation Result Section */}

                {validationResult && (

                    <div
                        className={`mt-6 overflow-hidden rounded-xl border border-green-200 bg-green-50 shadow-sm ${
                            isExpired
                                ? "border-orange-200 bg-orange-50"
                                : isValid
                                    ? "border-green-50"
                                    : "border-red-200 bg-red-50"
                        }`}
                    >


                        {/* Validation Status */}

                        <div className="flex items-start gap-3 p-4 sm:p-5">

                            <div>

                                {isExpired ? (

                                    <CircleAlert
                                        className="mt-0.5 text-orange-600"
                                        size={24}
                                    />

                                ) : isValid ? (

                                    <CircleCheck
                                        className="mt-0.5 text-green-600"
                                        size={24}
                                    />

                                ) : (

                                    <CircleX
                                        className="mt-0.5 text-red-600"
                                        size={24}
                                    />

                                )}

                            </div>

                            <div className="min-w-0">

                                <p
                                    className={`font-semibold ${
                                        isExpired
                                            ? "text-orange-800"
                                            : isValid
                                                ? "text-green-800"
                                                : "text-red-800"
                                    }`}
                                >

                                    {isExpired
                                        ? "Token is Expired"
                                        : isValid
                                            ? "Token is Valid"
                                            : "Token is Invalid"}

                                </p>

                                <p
                                    className={`mt-1 text-sm ${
                                        isExpired
                                            ? "text-orange-700"
                                            : isValid
                                                ? "text-green-700"
                                                : "text-red-700"
                                    }`}
                                >

                                    {validationResult?.expired
                                        ? "The token has expired."
                                        : validationResult?.valid
                                            ? "The token is valid and has not expired."
                                            : "The token is invalid."}

                                </p>

                            </div>

                        </div>


                        {/* Token Information Details */}

                        <div className="grid grid-cols-1 border-t border-green-200 sm:grid-cols-2 lg:grid-cols-4">


                            {/* Algorithm */}

                            <div className="p-4 sm:p-5">

                                <p className="text-sm text-slate-500">
                                    Algorithm
                                </p>

                                <p className="mt-1 break-words font-semibold text-slate-900">
                                    {validationResult?.algorithm || "-"}
                                </p>

                            </div>


                            {/* Issuer */}

                            <div className="border-t border-slate-200 p-4 sm:border-l sm:p-5 sm:pl-8 lg:border-t-0">

                                <p className="text-sm text-slate-500">
                                    Issuer
                                </p>

                                <p className="mt-1 break-words font-semibold text-slate-900">
                                    {validationResult?.claims?.iss || "-"}
                                </p>

                            </div>


                            {/* Audience */}

                            <div className="border-t border-slate-200 p-4 sm:border-l sm:p-5 sm:pl-8 lg:border-t-0">

                                <p className="text-sm text-slate-500">
                                    Audience
                                </p>

                                <p className="mt-1 break-words font-semibold text-slate-900">
                                    {validationResult?.claims?.aud || "-"}
                                </p>

                            </div>


                            {/* Token Expiry */}

                            <div className="border-t border-slate-200 p-4 sm:border-l sm:p-5 sm:pl-8 lg:border-t-0">

                                <p className="text-sm text-slate-500">
                                    Expires At
                                </p>

                                <p className="mt-1 break-words font-semibold text-slate-900">

                                    {validationResult?.expiresAt

                                        ? new Date(
                                            validationResult.expiresAt
                                        ).toLocaleString()

                                        : "-"}

                                </p>

                                <p className="mt-1 text-xs text-green-600">

                                    {timeLeft
                                        ? `(${timeLeft})`
                                        : ""}

                                </p>

                            </div>

                        </div>

                    </div>

                )}

            </div>


            {/* Claims and Permissions Section */}

            <div className="mx-auto mb-8 mt-6 grid w-[95%] max-w-6xl grid-cols-1 gap-4 sm:w-[90%] lg:grid-cols-2 lg:w-[80%]">


                {/* Claims Section */}

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">

                    <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">

                        <p className="flex items-center gap-2 font-semibold text-slate-800">

                            <Braces
                                size={20}
                                className="text-blue-600"
                            />

                            Claims

                        </p>

                        <button
                            onClick={handleCopyClaims}
                            className="flex shrink-0 items-center gap-1 text-sm text-blue-600 transition hover:text-blue-700"
                        >

                            <Copy size={16} />

                            {claimsCopied
                                ? "Copied"
                                : "Copy"}

                        </button>

                    </div>

                    <div>

                        {validationResult?.claims && (

                            <div className="mx-3 mb-3 overflow-x-auto rounded-lg bg-slate-900 p-4 shadow-inner">

                                <pre className="min-w-max text-sm leading-6 text-slate-200">

                                    {JSON.stringify(
                                        validationResult?.claims,
                                        null,
                                        2
                                    )}

                                </pre>

                            </div>

                        )}

                    </div>

                </div>


                {/* Permissions Section */}

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md sm:p-5">

                    <div className="flex items-center justify-between gap-3">

                        <p className="flex items-center gap-2 font-semibold text-slate-800">

                            <Shield
                                size={20}
                                className="text-violet-600"
                            />

                            Permissions

                        </p>

                        <button
                            type="button"
                            onClick={handleCopyPermissions}
                            className="flex shrink-0 items-center gap-1 text-sm text-violet-600 transition hover:text-violet-700"
                        >

                            <Copy size={16} />

                            {permissionsCopied
                                ? "Copied"
                                : "Copy"}

                        </button>

                    </div>


                    {/* Permission List */}

                    <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">

                        {permissions.map((permission) => {

                            const Icon =
                                permissionIcons[
                                    permission.toLowerCase()
                                ] || Shield;

                            return (

                                <div
                                    key={permission}
                                    className="flex items-center gap-2 rounded-lg bg-violet-50 px-4 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-100 sm:px-5"
                                >

                                    <Icon size={16} />

                                    {permission}

                                </div>

                            );

                        })}

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Validator;