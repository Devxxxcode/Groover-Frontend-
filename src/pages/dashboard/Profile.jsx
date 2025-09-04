import { useEffect, useState } from "react";
import {
    BiUserCircle,
    BiUser,
    BiCopy,
    BiChevronRight,
    BiCreditCard,
    BiLogOutCircle,
} from "react-icons/bi";
import { GiCrown } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../../motion";
import { toast } from "sonner";
import BottomNavMobile from "./components/BottomNavMobile";
import authService from "../../app/service/auth.service";
import { logout } from "../../app/slice/auth.slice";
import { login } from "../../constants/app.routes";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Load";
import { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } from "../../app/slice/profile.slice";
import ErrorHandler from "../../app/ErrorHandler";
import { formatCurrencyWithCode } from "../../utils/currency";


const Profile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.user);
    const isLoading = useSelector((state) => state.profile.isLoading);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!profile) {
                dispatch(fetchProfileStart());
                try {
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

        fetchProfile();
    }, [dispatch, profile]);

    const copyReferralCode = () => {
        if (profile?.referral_code) {
            navigator.clipboard.writeText(profile.referral_code);
            toast.success("Referral code copied!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleLogout = () => {
        authService.logout();
        dispatch(logout());
        navigate(login);
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="bg-white md:overflow-hidden">
            {/* Profile Card */}
            <motion.div
                initial={slideIn("down", null).initial}
                whileInView={slideIn("down", 1 * 2).animate}
                className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl md:mx-4 md:my-6 mx-2 md:p-8 p-4 mt-2 text-white shadow-xl">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        {profile?.profile_picture ? (
                            <img
                                src={profile.profile_picture}
                                alt="Profile"
                                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 md:mr-6 mr-3 rounded-full object-cover border-4 border-white/20"
                            />
                        ) : (
                            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 md:mr-6 mr-3 rounded-full bg-white/20 flex items-center justify-center">
                                <BiUserCircle className="text-2xl md:text-3xl lg:text-4xl" />
                            </div>
                        )}
                        <div>
                            <p className="text-lg md:text-xl font-bold">
                                {profile?.username || "N/A"}
                            </p>
                            <div className="text-sm md:text-base">
                                Referral code:
                                <div className="flex flex-wrap items-center mt-1">
                                    <span className="font-bold">
                                        {profile?.referral_code || "N/A"}
                                    </span>
                                    <BiCopy
                                        onClick={copyReferralCode}
                                        className="ml-2 cursor-pointer hover:scale-110 transition-transform"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        {profile?.wallet?.package?.icon ? (
                            <img
                                src={profile.wallet.package.icon}
                                alt={profile.wallet.package.name || "Package Icon"}
                                className="w-10 h-10 md:w-12 md:h-12 object-contain mx-auto"
                            />
                        ) : (
                            <GiCrown className="text-2xl md:text-3xl mx-auto" />
                        )}
                        <p className="font-bold text-sm md:text-base mt-1">
                            {profile?.wallet?.package?.name || "N/A"}
                        </p>
                    </div>
                </div>

                {/* Credit Score Progress Bar */}
                <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Credit Score</span>
                        <span className="text-sm font-bold">
                            {profile?.wallet?.credit_score || 0}%
                        </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 md:h-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${profile?.wallet?.credit_score || 0}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-white/60 to-white rounded-full shadow-lg"
                        />
                    </div>
                </div>

                {/* desktop */}
                <div className="border-t border-white/30 mt-4 md:mt-6 gap-3 md:gap-6 sm:flex sm:justify-between text-sm md:text-base hidden md:flex">
                    <div className="text-center">
                        <p>Wallet Balance</p>
                        <p className="font-bold text-base md:text-lg">
                            {formatCurrencyWithCode(profile?.wallet?.balance || "0.00")}
                        </p>
                    </div>
                    <div className="text-center">
                        <p>Frozen Amount</p>
                        <p className="text-white font-bold text-base md:text-lg">
                            {formatCurrencyWithCode(profile?.wallet?.on_hold || "0.00")}
                        </p>
                    </div>
                    <div className="text-center">
                        <p>Commission</p>
                        <p className="font-bold text-base md:text-lg">
                            {formatCurrencyWithCode(profile?.today_profit || "0.00")}
                        </p>
                    </div>
                    <div className="text-center">
                        <p>Salary</p>
                        <p className="font-bold text-base md:text-lg">
                            {formatCurrencyWithCode(profile?.wallet?.salary || "N/A")}
                        </p>
                    </div>
                </div>

                {/* mobile */}
                <div className="border-t md:hidden border-white/30 mt-4 md:mt-6 pt-4 grid gap-2 text-sm md:text-base">
                    {/* First Row */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                            <p>Wallet Balance</p>
                            <p className="font-bold text-base md:text-lg">
                                {formatCurrencyWithCode(profile?.wallet?.balance || "0.00")}
                            </p>
                        </div>
                        <div className="text-center">
                            <p>Frozen Amount</p>
                            <p className="text-white font-bold text-base md:text-lg">
                                {formatCurrencyWithCode(profile?.wallet?.on_hold || "0.00")}
                            </p>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                            <p>Commission</p>
                            <p className="font-bold text-base md:text-lg">
                                {formatCurrencyWithCode(profile?.today_profit || "0.00")}
                            </p>
                        </div>
                        <div className="text-center">
                            <p>Salary</p>
                            <p className="font-bold text-base md:text-lg">
                                {formatCurrencyWithCode(profile?.wallet?.salary || "N/A")}
                            </p>
                        </div>
                    </div>
                </div>

            </motion.div>

            {/* Profile Options */}
            <div className="space-y-4 md:mx-6 mx-2 md:mb-4 mb-52">
                {/* Financial Section */}
                <div className="bg-white rounded-lg shadow">
                    <motion.div
                        initial={fadeIn("right", null).initial}
                        whileInView={fadeIn("right", 1 * 2).animate}
                        onClick={() => navigate("/home/deposit")}
                        className="flex items-center cursor-pointer justify-between p-4 border-b">
                        <div className="flex items-center space-x-4 transition-transform hover:scale-105 transform">
                            <BiCreditCard className="text-primary" />
                            <p className="text-gray-700 font-semibold">Deposit</p>
                        </div>
                        <BiChevronRight className="text-gray-400" />
                    </motion.div>
                    <motion.div
                        initial={fadeIn("right", null).initial}
                        whileInView={fadeIn("right", 2 * 2).animate}
                        onClick={() => navigate("/home/withdraw")}
                        className="flex items-center cursor-pointer justify-between p-4">
                        <div className="flex items-center space-x-4 transition-transform hover:scale-105 transform">
                            <BiCreditCard className="text-primary" />
                            <p className="text-gray-700 font-semibold">Withdraw</p>
                        </div>
                        <BiChevronRight className="text-gray-400" />
                    </motion.div>
                </div>

                {/* Details Section */}
                <div className="bg-white rounded-lg shadow">
                    <motion.div
                        initial={fadeIn("right", null).initial}
                        whileInView={fadeIn("right", 3 * 2).animate}
                        onClick={() => navigate("/home/personal")}
                        className="flex items-center cursor-pointer justify-between p-4 border-b">
                        <div className="flex items-center space-x-4 transition-transform hover:scale-105 transform">
                            <BiUser className="text-primary" />
                            <p className="text-gray-700 font-semibold">Personal Information</p>
                        </div>
                        <BiChevronRight className="text-gray-400" />
                    </motion.div>
                    <motion.div
                        initial={fadeIn("right", null).initial}
                        whileInView={fadeIn("right", 4 * 2).animate}
                        onClick={() => navigate("/home/payment")}
                        className="flex items-center cursor-pointer justify-between p-4">
                        <div className="flex items-center space-x-4 transition-transform hover:scale-105 transform">
                            <BiCreditCard className="text-primary" />
                            <p className="text-gray-700 font-semibold">Payment Methods</p>
                        </div>
                        <BiChevronRight className="text-gray-400" />
                    </motion.div>
                </div>

                {/* Other Section */}
                <div className="bg-white rounded-lg shadow">
                    <motion.div
                        initial={fadeIn("right", null).initial}
                        whileInView={fadeIn("right", 5 * 2).animate}
                        onClick={() => navigate("/home/contact")}
                        className="flex items-center cursor-pointer justify-between p-4 border-b">
                        <div className="flex items-center space-x-4 transition-transform hover:scale-105 transform">
                            <BiUser className="text-primary" />
                            <p className="text-gray-700 font-semibold">Contact Us</p>
                        </div>
                        <BiChevronRight className="text-gray-400" />
                    </motion.div>
                    <motion.div
                        initial={fadeIn("right", null).initial}
                        whileInView={fadeIn("right", 6 * 2).animate}
                        onClick={() => navigate("/home/notifications")}
                        className="flex items-center cursor-pointer justify-between p-4">
                        <div className="flex items-center space-x-4 transition-transform hover:scale-105 transform">
                            <BiUser className="text-primary" />
                            <p className="text-gray-700 font-semibold">Notifications</p>
                        </div>
                        <BiChevronRight className="text-gray-400" />
                    </motion.div>
                </div>

                {/* Logout Button */}
                <motion.button
                    initial={fadeIn("right", null).initial}
                    whileInView={fadeIn("right", 7 * 2).animate}
                    onClick={handleLogout}
                    className="w-full bg-white text-red-500 hover:bg-red-200 md:mb-2 mb-52 border shadow font-semibold py-3 rounded-full flex items-center justify-center">
                    <BiLogOutCircle className="mr-2" /> Logout
                </motion.button>
            </div>
            <BottomNavMobile className="md:hidden" />
        </div>
    );
};

export default Profile;
