import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../../motion";
import { updateProfile, changePassword, changeTransactionPassword } from "../../app/service/profile.service";
import {
    fetchProfileStart,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfileSuccess,
    setImagePreview,
} from "../../app/slice/profile.slice";
import authService from "../../app/service/auth.service";
import Loader from "./components/Load";
import ButtonLoader from "./components/loader";
import ErrorHandler from "../../app/ErrorHandler";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaLock, FaShieldAlt } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";

const PersonalInfo = () => {
    const dispatch = useDispatch();
    const { user: formData = {}, isLoading, profilePicture, imagePreview } = useSelector(
        (state) => state.profile
    );

    // Password fields
    const [passwordData, setPasswordData] = useState({
        current_password: "",
        new_password: "",
        confirm_new_password: "",
    });

    const [transactionPasswordData, setTransactionPasswordData] = useState({
        current_password: "",
        new_password: "",
        confirm_new_password: "",
    });

    const [isLoginPasswordModalOpen, setIsLoginPasswordModalOpen] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [isTransactionPasswordModalOpen, setIsTransactionPasswordModalOpen] = useState(false);
    const [isTransactionPasswordSaving, setIsTransactionPasswordSaving] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    // Toggle Modals
    const toggleLoginPasswordModal = () => {
        setIsLoginPasswordModalOpen(!isLoginPasswordModalOpen);
        // Clear state when opening modal
        if (!isLoginPasswordModalOpen) {
            setPasswordData({
                current_password: "",
                new_password: "",
                confirm_new_password: "",
            });
        }
    };

    // Toggle Transaction Password Modal
    const toggleTransactionPasswordModal = () => {
        setIsTransactionPasswordModalOpen(!isTransactionPasswordModalOpen);
        // Clear state when opening modal
        if (!isTransactionPasswordModalOpen) {
            setTransactionPasswordData({
                current_password: "",
                new_password: "",
                confirm_new_password: "",
            });
        }
    };

    // Handle click outside modal to close
    const handleModalBackdropClick = (e, modalType) => {
        if (e.target === e.currentTarget) {
            if (modalType === 'login') {
                toggleLoginPasswordModal();
            } else if (modalType === 'transaction') {
                toggleTransactionPasswordModal();
            }
        }
    };

    // Fetch Profile Data
    useEffect(() => {
        const fetchProfile = async () => {
            dispatch(fetchProfileStart());
            try {
                const response = await authService.fetchProfile();
                if (response.success) {
                    dispatch(fetchProfileSuccess(response.data));
                } else {
                    dispatch(fetchProfileFailure(response.message || "Failed to load profile."));
                    ErrorHandler(response.message)
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                dispatch(fetchProfileFailure("An error occurred while fetching your profile."));
                toast.error("An error occurred while fetching your profile.");
            }
        };

        if (!formData) {
            fetchProfile();
        }
    }, [dispatch, formData]);

    // Handle Profile Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateProfileSuccess({ ...formData, [name]: value })); // Update Redux state
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setImagePreview(reader.result)); // Set preview in Redux
                dispatch(updateProfileSuccess({ ...formData, profile_picture: file })); // Update Redux state
            };
            reader.readAsDataURL(file);
        }
    };

    // Update Profile
    const handleUpdateProfile = async () => {
        // Validate required fields
        if (!formData.username || !formData.email || !formData.phone_number) {
            toast.error("Username, email, and phone number are required.");
            return;
        }

        // Prepare payload with only changed fields
        const updatedData = {};
        Object.keys(formData).forEach((key) => {
            if (key === "profile_picture") {
                if (typeof profilePicture !== "string" || !profilePicture.startsWith("http")) {
                    updatedData.profile_picture = profilePicture; // Include if it's a file
                }
            } else if (formData[key] !== updatedData[key]) {
                updatedData[key] = formData[key]; // Include other changed fields
            }
        });

        // If no changes detected, show a toast and exit
        if (Object.keys(updatedData).length === 0) {
            toast.error("No changes detected.");
            return;
        }

        setIsUpdatingProfile(true);

        try {
            const result = await dispatch(updateProfile(updatedData));
            if (result.success) {
                console.log("dwfwefwe", result)
                toast.success(result.message);
                dispatch(updateProfileSuccess(result.data)); // Update Redux state with new profile
            } else {
                // Check for error object or array
                const errorMessage = result.message;
                ErrorHandler(errorMessage)
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            // Handle unexpected error format
            ErrorHandler(error);
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    // Show Loader when the page is loading
    if (isLoading || !formData) {
        return <Loader />;
    }

    // Handle Password Changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangePassword = async () => {
        // Validate required fields
        if (!passwordData.current_password || !passwordData.new_password || !passwordData.confirm_new_password) {
            toast.error("All password fields are required.");
            return;
        }

        // Ensure new passwords match
        if (passwordData.new_password !== passwordData.confirm_new_password) {
            toast.error("New passwords do not match.");
            return;
        }

        // Ensure current and new passwords are not the same
        if (passwordData.current_password === passwordData.new_password) {
            toast.error("New password cannot be the same as the current password.");
            return;
        }

        // Prepare data for API
        const payload = {
            current_password: passwordData.current_password,
            new_password: passwordData.new_password,
        };

        // Show loader on button
        setIsSavingPassword(true);

        try {
            // Dispatch change password action
            const result = await dispatch(changePassword(payload));
            if (result.success) {
                toast.success(result.message || "Password updated successfully.");
                toggleLoginPasswordModal(); // Close modal
                setPasswordData({
                    current_password: "",
                    new_password: "",
                    confirm_new_password: "",
                }); // Reset fields
            } else {
                ErrorHandler(result.message);
            }
        } catch (error) {
            ErrorHandler(error);
        } finally {
            // Hide loader after update
            setIsSavingPassword(false);
        }
    };

    // Handle Transaction Password Input Changes
    const handleTransactionPasswordChange = (e) => {
        const { name, value } = e.target;
        setTransactionPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle Transaction Password Save
    const handleTransactionPasswordSave = async () => {
        const { current_password, new_password, confirm_new_password } = transactionPasswordData;

        // Frontend validation
        if (!current_password || !new_password || !confirm_new_password) {
            toast.error("All fields are required.");
            return;
        }
        if (new_password !== confirm_new_password) {
            toast.error("New password and confirm password must match.");
            return;
        }
        if (current_password === new_password) {
            toast.error("New transaction password cannot be the same as the current password.");
            return;
        }
        if (new_password.length !== 4 || isNaN(new_password)) {
            toast.error("Transaction password must be exactly 4 numeric characters.");
            return;
        }

        // Show loader
        setIsTransactionPasswordSaving(true);

        try {
            const payload = { current_password, new_password }; // Backend only needs current and new password
            const result = await dispatch(changeTransactionPassword(payload));
            if (result.success) {
                toast.success(result.message || "Transaction password updated successfully.");
                toggleTransactionPasswordModal(); // Close modal
                setTransactionPasswordData({
                    current_password: "",
                    new_password: "",
                    confirm_new_password: "",
                }); // Reset fields
            } else {
                ErrorHandler(result.message);
            }
        } catch (error) {
            ErrorHandler(error);
        } finally {
            setIsTransactionPasswordSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Back Button */}
            <motion.div
                initial={fadeIn("left", null).initial}
                whileInView={fadeIn("left", 1 * 2).animate}
                className="w-fit bg-white p-3 rounded-xl shadow-sm mb-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.history.back()}
            >
                <div className="flex items-center text-lg text-primary">
                    <GoArrowLeft className="text-xl" />
                    <h2 className="text-xl font-bold text-gray-800 ml-3">Back</h2>
                </div>
            </motion.div>

            {/* Page Title */}
            <motion.div
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 1 * 2).animate}
                className="text-center mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Personal Information</h1>
                <p className="text-gray-600">Manage your account details and security settings</p>
            </motion.div>

            {/* Profile Picture Section */}
            <motion.div
                initial={slideIn("up", null).initial}
                whileInView={slideIn("up", 1 * 2).animate}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                            {(imagePreview || profilePicture) ? (
                                <img
                                    src={imagePreview || profilePicture}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <FaUser className="text-3xl text-gray-400" />
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/80 transition-colors shadow-lg">
                            <MdOutlinePhotoCamera className="text-lg" />
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <p className="text-sm text-gray-600">Click the camera icon to update your profile picture</p>
                </div>
            </motion.div>

            {/* Personal Information Form */}
            <motion.div
                initial={slideIn("up", null).initial}
                whileInView={slideIn("up", 2 * 2).animate}
                className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaIdCard className="text-primary mr-3" />
                    Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold flex items-center">
                            <FaUser className="text-primary mr-2 text-sm" />
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold flex items-center">
                            <FaEnvelope className="text-primary mr-2 text-sm" />
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold flex items-center">
                            <FaPhone className="text-primary mr-2 text-sm" />
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold">Gender</label>
                        <div className="flex space-x-6 mt-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="M"
                                    checked={formData.gender === "M"}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <span className="text-gray-700">Male</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="F"
                                    checked={formData.gender === "F"}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <span className="text-gray-700">Female</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-700 font-semibold">Referral Code</label>
                        <input
                            type="text"
                            name="referral_code"
                            value={formData.referral_code || ""}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={slideIn("up", null).initial}
                whileInView={slideIn("up", 3 * 2).animate}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20"
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile}
                    className="bg-primary text-white font-semibold py-4 px-6 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUpdatingProfile ? (
                        <ButtonLoader />
                    ) : (
                        <>
                            <FaUser className="text-lg" />
                            <span>Update Profile</span>
                        </>
                    )}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleLoginPasswordModal}
                    className="bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                    <FaLock className="text-lg" />
                    <span>Change Login Password</span>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleTransactionPasswordModal}
                    className="bg-amber-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                    <FaShieldAlt className="text-lg" />
                    <span>Change Transaction Password</span>
                </motion.button>
            </motion.div>

            {/* Login Password Modal */}
            {isLoginPasswordModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={(e) => handleModalBackdropClick(e, 'login')}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
                    >
                        <button
                            onClick={toggleLoginPasswordModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ✕
                        </button>
                        <div className="text-center mb-6">
                            <FaLock className="text-4xl text-blue-600 mx-auto mb-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Change Login Password</h2>
                            <p className="text-gray-600 mt-2">Enter your current and new password</p>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="text-gray-700 font-semibold">Current Password</label>
                                <input
                                    type="password"
                                    name="current_password"
                                    value={passwordData.current_password}
                                    onChange={handlePasswordChange}
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold">New Password</label>
                                <input
                                    type="password"
                                    name="new_password"
                                    value={passwordData.new_password}
                                    onChange={handlePasswordChange}
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirm_new_password"
                                    value={passwordData.confirm_new_password}
                                    onChange={handlePasswordChange}
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handleChangePassword}
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 mt-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSavingPassword}
                            >
                                {isSavingPassword ? (
                                    <ButtonLoader />
                                ) : (
                                    <>
                                        <FaLock className="text-lg" />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Transaction Password Modal */}
            {isTransactionPasswordModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={(e) => handleModalBackdropClick(e, 'transaction')}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
                    >
                        <button
                            onClick={toggleTransactionPasswordModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ✕
                        </button>
                        <div className="text-center mb-6">
                            <FaShieldAlt className="text-4xl text-amber-600 mx-auto mb-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Change Transaction Password</h2>
                            <p className="text-gray-600 mt-2">Enter your 4-digit transaction password</p>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="text-gray-700 font-semibold">Current Password</label>
                                <input
                                    type="password"
                                    name="current_password"
                                    value={transactionPasswordData.current_password}
                                    onChange={handleTransactionPasswordChange}
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                                    placeholder="Enter current password"
                                    maxLength="4"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold">New Password</label>
                                <input
                                    type="password"
                                    name="new_password"
                                    value={transactionPasswordData.new_password}
                                    onChange={handleTransactionPasswordChange}
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                                    placeholder="Enter new 4-digit password"
                                    maxLength="4"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-semibold">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirm_new_password"
                                    value={transactionPasswordData.confirm_new_password}
                                    onChange={handleTransactionPasswordChange}
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
                                    placeholder="Confirm new password"
                                    maxLength="4"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={handleTransactionPasswordSave}
                                className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 transition-all duration-200 mt-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isTransactionPasswordSaving}
                            >
                                {isTransactionPasswordSaving ? (
                                    <ButtonLoader />
                                ) : (
                                    <>
                                        <FaShieldAlt className="text-lg" />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default PersonalInfo;
