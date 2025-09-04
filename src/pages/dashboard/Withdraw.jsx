import { useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GiCrown } from "react-icons/gi";
import { motion } from "framer-motion";
import { slideIn } from "../../motion";
import BottomNavMobile from "./components/BottomNavMobile";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess } from "../../app/slice/profile.slice";
import authService from "../../app/service/auth.service";
import { toast } from "sonner";
import ErrorHandler from "../../app/ErrorHandler";
import { formatCurrencyFullAmount } from "../../utils/currency";
import { fetchWithdrawalHistory, makeWithdrawal } from "../../app/service/withdraw.service";
import { fetchWithdrawalsStart } from "../../app/slice/withdraw.slice";
import Loader from "./components/loader";
import Load from "./components/Load";
import { GoArrowLeft } from "react-icons/go";

import { fadeIn } from "../../motion";
const Withdraw = () => {
    const dispatch = useDispatch();
    const { history, isLoading } = useSelector((state) => state.withdrawals);
    const profile = useSelector((state) => state.profile.user);
    const isProfileLoading = useSelector((state) => state.profile.isLoading);

    // State for inputs
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState("withdraw");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch withdrawal history initially if the state is empty
    useEffect(() => {
        const fetchWithdrawalsIfEmpty = async () => {
            if (!history || history.length === 0) {
                dispatch(fetchWithdrawalsStart());
                try {
                    await dispatch(fetchWithdrawalHistory());
                    console.log(history)
                } catch (error) {
                    console.error("Error fetching withdrawals:", error);
                }
            }
        };

        fetchWithdrawalsIfEmpty();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // Fetch Profile if not yet fetched
    useEffect(() => {
        const fetchProfileIfNeeded = async () => {
            if (!profile) {
                try {
                    dispatch(fetchProfileStart());
                    const response = await authService.fetchProfile();
                    if (response.success) {
                        dispatch(fetchProfileSuccess(response.data));
                    } else {
                        dispatch(fetchProfileFailure(response.message || "Failed to load profile."));
                        toast.error(response.message || "Failed to load profile.");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    dispatch(fetchProfileFailure("An error occurred while fetching your profile."));
                    toast.error("An error occurred while fetching your profile.");
                }
            }
        };

        fetchProfileIfNeeded();
    }, [dispatch, profile]);

    // Handle Submit
    const handleSubmit = async () => {
        // Frontend validation
        if (!amount || !password) {
            toast.error("Both amount and password are required.");
            return;
        }

        if (isNaN(amount) || Number(amount) <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        // Show loader on button
        setIsSubmitting(true);

        try {
            const payload = { amount: Number(amount), password };
            const response = await dispatch(makeWithdrawal(payload));

            if (response.success) {
                toast.success(response.message || "Withdrawal request successful.");
                setAmount("");
                setPassword("");
            } else {
                // Extract error message
                ErrorHandler(response.message);
            }
        } catch (error) {
            // Log and display unexpected errors
            // console.error("Unexpected error:", error);
            // toast.error("An unexpected error occurred. Please try again.");
            ErrorHandler(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTabChange = (tab) => setActiveTab(tab);

    return (
        <motion.div
            initial={fadeIn("right", null).initial}
            whileInView={fadeIn("right", 1 * 2).animate}
            className="max-w-full mx-auto md:mt-8 md:mb-2 mb-52 md:p-6 p-2 bg-white rounded-lg"
        >
            {/* Back Button */}
            <div className="w-fit transition-transform hover:scale-105 transform bg-gray-200 p-2 rounded-lg shadow-sm mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-lg text-primary"
                >
                    <GoArrowLeft />
                    <h2 className="text-xl font-bold text-gray-800 ml-4">Back</h2>
                </button>
            </div>

            {/* Page Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Withdraw</h1>

            {/* Show loading state if profile is being fetched */}
            {isProfileLoading && (
                <div className="flex justify-center items-center py-8">
                    <Load />
                </div>
            )}

            {/* Show error state if profile failed to load */}
            {!isProfileLoading && !profile && (
                <div className="flex justify-center items-center py-8">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Failed to load profile data</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Only show content when profile is loaded */}
            {!isProfileLoading && profile && (
                <>
                    {/* Tabs */}
                    <div className="flex space-x-4 mb-10 border-b">
                        <button
                            onClick={() => handleTabChange("withdraw")}
                            className={`pb-2 border-b-2 ${activeTab === "withdraw" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
                                } focus:outline-none`}
                        >
                            Withdraw Now
                        </button>
                        <button
                            onClick={() => handleTabChange("history")}
                            className={`pb-2 border-b-2 ${activeTab === "history" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
                                } focus:outline-none`}
                        >
                            Withdraw History
                        </button>
                    </div>

                    {/* Withdraw Now */}
                    {activeTab === "withdraw" && (
                        <motion.div
                            key="withdraw"
                            initial={slideIn("right", null).initial}
                            animate={slideIn("right", 1 * 2).animate}
                        >
                            <div className="bg-primary text-white p-4 rounded-lg mb-10">
                                <p className="font-semibold text-sm">Total Balance</p>
                                <p className="text-3xl font-bold">{formatCurrencyFullAmount(profile?.wallet?.balance || 0)}</p>
                            </div>

                            <div className="mb-10">
                                <label className="block text-sm font-medium text-gray-700">
                                    Withdrawal Amount
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div className="mb-10">
                                <label className="block text-sm font-medium text-gray-700">
                                    Withdrawal Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/80 transition duration-200 flex items-center justify-center"
                            >
                                {isSubmitting ? <Loader /> : "Submit"}
                            </button>
                        </motion.div>
                    )}

                    {/* Withdraw History */}
                    {activeTab === "history" && (
                        <motion.div
                            key="history"
                            initial={slideIn("left", null).initial}
                            animate={slideIn("left", 1 * 2).animate}
                            exit={{ opacity: 0, x: 50 }}
                            className="space-y-4"
                        >
                            {isLoading ? (
                                <Loader />
                            ) : Array.isArray(history) ? (
                                history.length > 0 ? (
                                    history.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-gray-200"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-700">Withdrawal</p>
                                                <p className="text-sm text-gray-500">{item.transaction_id}</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span
                                                    className={`${item.status === "Completed"
                                                        ? "bg-green-500"
                                                        : "bg-primary"
                                                        } text-white text-sm font-semibold px-3 py-1 rounded-full mb-1`}
                                                >
                                                    {item.status}
                                                </span>
                                                <p className="text-gray-700 font-bold">
                                                    {item.amount} USD
                                                </p>
                                                <p className="text-gray-700 font-bold">
                                                    {new Date(item.created_at).toLocaleDateString('en-US', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })} at {new Date(item.created_at).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">
                                        No withdrawal history available.
                                    </p>
                                )
                            ) : (
                                <p className="text-center text-gray-500">
                                    Failed to load withdrawal history.
                                </p>
                            )}
                        </motion.div>
                    )}
                </>
            )}
            <BottomNavMobile className="md:hidden" />
        </motion.div>
    );
};

export default Withdraw;
