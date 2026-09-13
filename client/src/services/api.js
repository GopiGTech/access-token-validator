const API_URI = "http://localhost:5000/api/token";

export const validateToken = async (token, verificationKey) => {
    const response = await fetch(`${API_URI}/validate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token.trim(), verificationKey: verificationKey.trim() })
    });

    const data = await response.json();

    if (!response.ok) {
        if (data.message?.expired === true) {
            return data.message;
        }
        if (data.valid === false) {
            return data
        }
        throw new Error(data.error || data.message || "Validation failed")
    }

    return data;
}

export const getValidations = async (page = 1, limit = 10, status = "all") => {
    const response = await fetch(`${API_URI}/validations?page=${page}&limit=${limit}&status=${status}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || data.message || "Failed to fetch validations"
        );
    }

    return data;
};

export const deleteValidation = async (id) => {
    const response = await fetch(`${API_URI}/validations/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to delete validation");
    }
    return data;

}

export const deleteAllValidations = async () => {
    const response = await fetch(
        `${API_URI}/validations`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || data.message || "Failed to delete all validations"
        );
    }

    return data;
};