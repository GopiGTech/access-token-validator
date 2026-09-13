import {
    ShieldCheck,
    LockKeyhole,
    Braces,
    Clock,
    History,
    CheckCircle,
    KeyRound,
    BookOpen
} from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    About Access Token Validator
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-normal">
                    A utility for validating JWT access tokens, checking their
                    security information, and viewing claims, permissions,
                    expiration, and validation history.
                </p>
            </div>

            {/* What This Validator Does */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <ShieldCheck size={22} />
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        What This Validator Does
                    </h2>
                </div>

                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    Access Token Validator allows you to submit a JWT access
                    token and validate it using the backend. The validator
                    verifies the token signature, checks its expiration, and
                    displays useful information from the token.
                </p>

            </div>

            {/* JWT Anatomy */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <Braces size={22} />
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        JWT Anatomy
                    </h2>
                </div>

                <p className="mb-5 text-sm leading-6 text-slate-500">
                    A JSON Web Token consists of three parts separated by
                    periods.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {/* Header */}
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 sm:p-5">

                        <div className="mb-3 flex items-center gap-2">
                            <KeyRound
                                size={19}
                                className="text-red-600"
                            />

                            <h3 className="font-semibold text-slate-800">
                                Header
                            </h3>
                        </div>

                        <p className="text-sm leading-6 text-slate-600">
                            Contains information such as the signing algorithm
                            and token type.
                        </p>

                    </div>

                    {/* Payload */}
                    <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 sm:p-5">

                        <div className="mb-3 flex items-center gap-2">
                            <Braces
                                size={19}
                                className="text-violet-600"
                            />

                            <h3 className="font-semibold text-slate-800">
                                Payload
                            </h3>
                        </div>

                        <p className="text-sm leading-6 text-slate-600">
                            Contains claims and other information associated
                            with the token.
                        </p>

                    </div>

                    {/* Signature */}
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 sm:p-5">

                        <div className="mb-3 flex items-center gap-2">
                            <LockKeyhole
                                size={19}
                                className="text-blue-600"
                            />

                            <h3 className="font-semibold text-slate-800">
                                Signature
                            </h3>
                        </div>

                        <p className="text-sm leading-6 text-slate-600">
                            Used to verify that the token was signed correctly
                            and has not been modified.
                        </p>

                    </div>

                </div>

            </div>

            {/* Validation Checks */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-lg bg-green-50 p-2 text-green-600">
                        <CheckCircle size={22} />
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        Validation Checks
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {/* Signature Verification */}
                    <div className="rounded-lg bg-slate-50 p-4 sm:p-5">

                        <ShieldCheck
                            size={21}
                            className="mb-3 text-blue-600"
                        />

                        <h3 className="font-semibold text-slate-800">
                            Signature Verification
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Verifies the JWT signature using the configured
                            verification secret or public key.
                        </p>

                    </div>

                    {/* Expiration */}
                    <div className="rounded-lg bg-slate-50 p-4 sm:p-5">

                        <Clock
                            size={21}
                            className="mb-3 text-orange-500"
                        />

                        <h3 className="font-semibold text-slate-800">
                            Expiration Check
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Checks the expiration time and identifies whether
                            the token is still valid or has expired.
                        </p>

                    </div>

                    {/* Claims */}
                    <div className="rounded-lg bg-slate-50 p-4 sm:p-5">

                        <Braces
                            size={21}
                            className="mb-3 text-violet-600"
                        />

                        <h3 className="font-semibold text-slate-800">
                            Claims & Permissions
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Displays available claims and permissions contained
                            in the validated token.
                        </p>

                    </div>

                </div>

            </div>

            {/* Supported Signing Algorithms */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <KeyRound size={22} />
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        Supported Signing Algorithms
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

                    {/* HMAC */}
                    <div className="rounded-lg bg-slate-50 p-4 sm:p-5">
                        <h3 className="font-semibold text-slate-800">
                            HMAC
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            HS256, HS384, HS512
                        </p>
                    </div>

                    {/* RSA */}
                    <div className="rounded-lg bg-slate-50 p-4 sm:p-5">
                        <h3 className="font-semibold text-slate-800">
                            RSA
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            RS256, RS384, RS512
                        </p>
                    </div>

                    {/* RSA-PSS */}
                    <div className="rounded-lg bg-slate-50 p-4 sm:p-5">
                        <h3 className="font-semibold text-slate-800">
                            RSA-PSS
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            PS256, PS384, PS512
                        </p>
                    </div>

                    {/* ECDSA */}
                    <div className="rounded-lg bg-slate-50 p-4 sm:p-5">
                        <h3 className="font-semibold text-slate-800">
                            ECDSA
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            ES256, ES384, ES512
                        </p>
                    </div>

                </div>

            </div>

            {/* Standard Registered Claims */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-lg bg-violet-50 p-2 text-violet-600">
                        <BookOpen size={22} />
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        Standard Registered Claims
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-lg bg-slate-50 p-4">
                        <h3 className="font-semibold text-slate-800">
                            iss
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Issuer of the token.
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <h3 className="font-semibold text-slate-800">
                            sub
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Subject of the token.
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <h3 className="font-semibold text-slate-800">
                            aud
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Intended audience.
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <h3 className="font-semibold text-slate-800">
                            exp
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Token expiration time.
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <h3 className="font-semibold text-slate-800">
                            iat
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Time when the token was issued.
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                        <h3 className="font-semibold text-slate-800">
                            jti
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Unique identifier for the token.
                        </p>
                    </div>

                </div>

            </div>

            {/* Validation History */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                        <History size={22} />
                    </div>

                    <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                        Validation History
                    </h2>
                </div>

                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    Each validation attempt is recorded in the validation
                    history. You can review the validation status, algorithm,
                    issuer, audience, validation time, and other available
                    information for previously validated tokens.
                </p>

                <div className="mt-5 flex items-start gap-2 rounded-lg bg-slate-50 p-3 sm:items-center sm:p-4">

                    <LockKeyhole
                        size={18}
                        className="mt-0.5 shrink-0 text-slate-500 sm:mt-0"
                    />

                    <p className="text-sm text-slate-500">
                        Validation history is stored by the backend for
                        auditing and review.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default About;