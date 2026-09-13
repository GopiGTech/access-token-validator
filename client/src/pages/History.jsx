import {Search,CheckCircle,AlertTriangle,XCircle,Eye,ChevronLeft,ChevronRight,Clock} from "lucide-react";

import { useEffect, useState } from "react";
import {getValidations,deleteValidation,deleteAllValidations} from "../services/api";

const History = () => {

    const [validations, setValidations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Search and filter
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Selected validation
    const [selectedValidation, setSelectedValidation] = useState(null);


    // Fetch validation history
    useEffect(() => {

        const fetchHistory = async () => {

            try {
                setLoading(true);
                setError("");

                const data = await getValidations(
                    page,
                    10,
                    statusFilter
                );

                setValidations(data.tokenData);
                setTotalPages(data.totalPages);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        fetchHistory();

    }, [page, statusFilter]);


    // Search filtering
    const filteredValidations = validations.filter((validation) => {

        const searchText = search.toLowerCase();

        const id = validation._id?.toLowerCase() || "";
        const issuer = validation.issuer?.toLowerCase() || "unknown";
        const audience = validation.audience?.toLowerCase() || "unknown";
        const algorithm = validation.algorithm?.toLowerCase() || "";

        return (
            id.includes(searchText) ||
            issuer.includes(searchText) ||
            audience.includes(searchText) ||
            algorithm.includes(searchText)
        );
    });


    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this validation?"
        );

        if (!confirmed) return;

        try {
            await deleteValidation(id);

            if (validations.length === 1 && page > 1) {
                setPage(page - 1);
                return;
            }

            setValidations((currentValidations) =>
                currentValidations.filter(
                    (validation) => validation._id !== id
                )
            );

        } catch (error) {
            setError(error.message);
        }
    };


    const handleDeleteAll = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete all validation history?"
        );

        if (!confirmed) return;

        try {
            await deleteAllValidations();

            setValidations([]);
            setSelectedValidation(null);
            setPage(1);

        } catch (error) {
            setError(error.message);
        }
    };


    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setPage(1);
    };


    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

            {/* Page Header */}
            <div className="mb-6 sm:mb-8">

                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Validation History
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    View and audit all previously validated access tokens.
                </p>

            </div>


            {/* Search & Filters */}
            <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between">

                {/* Search */}
                <div className="relative w-full lg:w-[420px]">

                    <Search
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search by issuer, audience, algorithm, or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />

                </div>


                {/* Status Filters */}
                <div className="flex flex-wrap items-center gap-2">

                    <span className="mr-1 text-sm text-slate-500 sm:mr-2">
                        Status:
                    </span>


                    {/* All */}
                    <button
                        onClick={() => handleStatusFilter("all")}
                        className={
                            statusFilter === "all"
                                ? "rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white sm:px-4"
                                : "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 sm:px-4"
                        }
                    >
                        All
                    </button>


                    {/* Valid */}
                    <button
                        onClick={() => handleStatusFilter("valid")}
                        className={
                            statusFilter === "valid"
                                ? "flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white sm:px-4"
                                : "flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-100 sm:px-4"
                        }
                    >
                        <CheckCircle size={15} />
                        Valid
                    </button>


                    {/* Expired */}
                    <button
                        onClick={() => handleStatusFilter("expired")}
                        className={
                            statusFilter === "expired"
                                ? "flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white sm:px-4"
                                : "flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-100 sm:px-4"
                        }
                    >
                        <AlertTriangle size={15} />
                        Expired
                    </button>


                    {/* Invalid */}
                    <button
                        onClick={() => handleStatusFilter("invalid")}
                        className={
                            statusFilter === "invalid"
                                ? "flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white sm:px-4"
                                : "flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 sm:px-4"
                        }
                    >
                        <XCircle size={15} />
                        Invalid
                    </button>


                    {/* Clear */}
                    <button
                        onClick={() => {
                            setSearch("");
                            handleStatusFilter("all");
                        }}
                        className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-700 sm:ml-3"
                    >
                        Clear
                    </button>

                    <button
                        onClick={handleDeleteAll}
                        className="ml-1 flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 sm:ml-3 sm:px-4"
                    >
                        Clear All
                    </button>

                </div>

            </div>


            {/* Loading */}
            {loading && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

                    <p className="text-sm text-slate-500 sm:text-base">
                        Loading validation history...
                    </p>

                </div>
            )}


            {/* Error */}
            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center sm:p-6">

                    <p className="text-sm text-red-600 sm:text-base">
                        {error}
                    </p>

                </div>
            )}


            {/* Empty */}
            {!loading && !error && filteredValidations.length === 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

                    <p className="text-sm text-slate-500 sm:text-base">
                        No validation history found.
                    </p>

                </div>
            )}


            {/* Table */}
            {!loading && !error && filteredValidations.length > 0 && (

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                    <div className="w-full overflow-x-auto">

                        <table className="w-full min-w-[1000px] border-collapse">

                            <thead>

                                <tr className="border-b border-slate-200 bg-slate-50">

                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                                        #
                                    </th>

                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                                        Status
                                    </th>

                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                                        Algorithm
                                    </th>

                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                                        Issuer
                                    </th>

                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                                        Audience
                                    </th>

                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                                        Validated At
                                    </th>

                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-5">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredValidations.map((validation, index) => {

                                    const isExpired = validation.expired;
                                    const isValid = validation.valid;

                                    return (

                                        <tr
                                            key={validation._id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                        >

                                            <td className="px-4 py-5 text-sm text-slate-500 sm:px-5">
                                                {index + 1}
                                            </td>


                                            <td className="px-4 py-5 sm:px-5">

                                                {isValid ? (

                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-600">

                                                        <CheckCircle size={14} />

                                                        Valid

                                                    </span>

                                                ) : isExpired ? (

                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">

                                                        <AlertTriangle size={14} />

                                                        Expired

                                                    </span>

                                                ) : (

                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600">

                                                        <XCircle size={14} />

                                                        Invalid

                                                    </span>

                                                )}

                                            </td>


                                            <td className="px-4 py-5 sm:px-5">

                                                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">

                                                    {validation.algorithm || "-"}

                                                </span>

                                            </td>


                                            <td className="max-w-[220px] px-4 py-5 text-sm text-slate-700 sm:px-5">

                                                <div className="truncate">
                                                    {validation.issuer || "Unknown"}
                                                </div>

                                            </td>


                                            <td className="max-w-[220px] px-4 py-5 text-sm text-slate-700 sm:px-5">

                                                <div className="truncate">
                                                    {validation.audience || "Unknown"}
                                                </div>

                                            </td>


                                            <td className="px-4 py-5 text-sm text-slate-500 sm:px-5">

                                                <div className="flex items-center gap-2 whitespace-nowrap">

                                                    <Clock size={15} />

                                                    {validation.validatedAt
                                                        ? new Date(
                                                            validation.validatedAt
                                                        ).toLocaleString()
                                                        : "-"}

                                                </div>

                                            </td>


                                            <td className="px-4 py-5 sm:px-5">

                                                <div className="flex items-center gap-2">

                                                    <button
                                                        onClick={() => setSelectedValidation(validation)}
                                                        className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 sm:px-4"
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </button>


                                                    <button
                                                        onClick={() => handleDelete(validation._id)}
                                                        className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 sm:px-4"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>


                    {/* Pagination Footer */}
                    <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                        <p className="text-sm text-slate-500">
                            Showing {filteredValidations.length} results
                        </p>


                        <div className="flex items-center gap-2">

                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50 sm:px-4"
                            >

                                <ChevronLeft size={16} />

                                Previous

                            </button>


                            <span className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white sm:px-4">
                                {page}
                            </span>


                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50 sm:px-4"
                            >

                                Next

                                <ChevronRight size={16} />

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* Validation Details Modal */}
            {selectedValidation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 px-4 py-6">

                    <div className="my-auto w-full max-w-2xl rounded-xl bg-white shadow-xl">

                        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-5 sm:px-6">

                            <div className="min-w-0">

                                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                                    Validation Details
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Details of the selected token validation.
                                </p>

                            </div>

                        </div>


                        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">

                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Status
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                    {selectedValidation.valid
                                        ? "Valid"
                                        : selectedValidation.expired
                                            ? "Expired"
                                            : "Invalid"}
                                </p>
                            </div>


                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Algorithm
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                    {selectedValidation.algorithm || "-"}
                                </p>
                            </div>


                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Issuer
                                </p>

                                <p className="mt-1 break-all font-semibold text-slate-800">
                                    {selectedValidation.issuer || "Unknown"}
                                </p>
                            </div>


                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Audience
                                </p>

                                <p className="mt-1 break-all font-semibold text-slate-800">
                                    {selectedValidation.audience || "Unknown"}
                                </p>
                            </div>


                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Validated At
                                </p>

                                <p className="mt-1 break-words font-semibold text-slate-800">
                                    {selectedValidation.validatedAt
                                        ? new Date(
                                            selectedValidation.validatedAt
                                        ).toLocaleString()
                                        : "-"}
                                </p>
                            </div>


                            <div className="rounded-lg bg-slate-50 p-4">
                                <p className="text-sm text-slate-500">
                                    Validation ID
                                </p>

                                <p className="mt-1 break-all font-semibold text-slate-800">
                                    {selectedValidation._id}
                                </p>
                            </div>

                        </div>


                        <div className="flex justify-end border-t border-slate-200 px-4 py-4 sm:px-6">

                            <button
                                onClick={() => setSelectedValidation(null)}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default History;