import { NavLink } from "react-router-dom";
import { ShieldCheck, KeyRound, History, CircleHelp } from "lucide-react";

const Header = () => {
    return (
        <header className="border-b border-slate-700 bg-slate-800">
            <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                {/* Logo and Title */}
                <div className="flex items-center gap-2">
                    <ShieldCheck className="shrink-0 text-white" size={30} />

                    <h1 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                        Access Token Validator
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex gap-5 overflow-x-auto sm:gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-1 text-sm font-medium sm:text-base ${
                                isActive
                                    ? "text-white underline underline-offset-[12px] sm:underline-offset-[15px]"
                                    : "text-gray-300 hover:text-white"
                            }`
                        }
                    >
                        <KeyRound size={18} />
                        Validator
                    </NavLink>

                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-1 text-sm font-medium sm:text-base ${
                                isActive
                                    ? "text-white underline underline-offset-[12px] sm:underline-offset-[15px]"
                                    : "text-gray-300 hover:text-white"
                            }`
                        }
                    >
                        <History size={18} />
                        History
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-1 text-sm font-medium sm:text-base ${
                                isActive
                                    ? "text-white underline underline-offset-[12px] sm:underline-offset-[15px]"
                                    : "text-gray-300 hover:text-white"
                            }`
                        }
                    >
                        <CircleHelp size={18} />
                        About
                    </NavLink>
                </nav>

            </div>
        </header>
    );
};

export default Header;