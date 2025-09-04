import { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../motion";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameRecords, submitCurrentGame } from "../../app/service/products.service";
import { toast } from "sonner";
import ErrorHandler from "../../app/ErrorHandler";
import Loader from "./components/Load";
import { formatCurrencyWithCode } from "../../utils/currency";
import { IoDocumentText, IoCheckmarkCircle } from "react-icons/io5";
import BottomNavMobile from "./components/BottomNavMobile";

const statusColors = {
    Completed: "bg-green-100 text-green-600",
    Pending: "bg-yellow-100 text-yellow-600",
    Freeze: "bg-blue-100 text-blue-600",
};

// Function to derive status
const getStatus = (record) => {
    if (record.pending) return "Pending";
    if (!record.pending && record.rating_score === 0) return "Freeze";
    return "Completed";
};

const Records = () => {
    const dispatch = useDispatch();
    const records = useSelector((state) => state.products.gameRecords); // Access game records from the state
    const isLoading = useSelector((state) => state.products.isLoading);

    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPagination, setShowPagination] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const recordsPerPage = 20;

    // Filter Records Based on Active Tab
    const filteredRecords =
        activeTab === "All" ? records : records.filter((record) => getStatus(record) === activeTab);

    // Paginate Records
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
    const paginatedRecords = filteredRecords.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    // Fetch Game Records
    useEffect(() => {

        dispatch(fetchGameRecords());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // Handle Submit Button for Pending Products
    const handleSubmit = async () => {
        try {
            const response = await dispatch(submitCurrentGame(4, ''));
            if (response.success) {
                toast.success("Submission successful!");
                dispatch(fetchGameRecords()); // Refresh the game records
            } else {
                ErrorHandler(response.message)
            }
        } catch (error) {
            ErrorHandler(error)
        }
    };

    // Handle Page Change
    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Handle scroll to show/hide pagination
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        // Scrolling down and not at top - hide pagination
                        setShowPagination(false);
                    } else if (currentScrollY < lastScrollY) {
                        // Scrolling up - show pagination
                        setShowPagination(true);
                    }
                    
                    setLastScrollY(currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 pb-24 md:pb-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    {/* Back Button */}
                    <motion.button
                        onClick={() => window.history.back()}
                        className="flex items-center text-primary hover:text-primary/80 transition-colors mb-6 group"
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <GoArrowLeft className="text-xl mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-lg font-semibold">Back</span>
                    </motion.button>

                    {/* Page Title */}
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="bg-primary/10 p-3 rounded-xl">
                            <IoDocumentText className="text-2xl text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Game Records</h1>
                            <p className="text-gray-600 text-sm md:text-base">
                                {filteredRecords.length} record{filteredRecords.length !== 1 ? "s" : ""} found
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={fadeIn("right", null).initial}
                    animate={fadeIn("right", 1 * 2).animate}
                    className="flex justify-center space-x-4 md:space-x-8 mb-6"
                >
                    {["All", "Completed", "Pending", "Freeze"].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setCurrentPage(1); // Reset to page 1 when switching tabs
                            }}
                            className={`px-4 py-2 text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${
                                activeTab === tab
                                    ? "text-primary bg-primary/10 border-2 border-primary/20"
                                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tab}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Records List */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader />
                    </div>
                ) : paginatedRecords.length > 0 ? (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 mb-20"
                    >
                        {paginatedRecords.map((record, index) => {
                            const status = getStatus(record); // Derive status
                            return (
                                <motion.div
                                    key={record.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200"
                                >
                                    <div className="p-4 md:p-6">
                                        <div className="flex items-start space-x-4 md:space-x-6">
                                            {/* Product Images */}
                                            <div className="flex flex-wrap gap-3 flex-shrink-0">
                                                {record.products.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="w-20 h-24 md:w-24 md:h-28 flex flex-col items-center"
                                                    >
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                                                        />
                                                        <p className="text-center text-xs md:text-sm mt-1 text-gray-600 break-words w-full">
                                                            {product.name}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-grow min-w-0">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1 min-w-0 pr-4">
                                                        <p className="text-gray-500 text-xs md:text-sm mb-1">
                                                            {new Date(record.updated_at).toLocaleString()}
                                                        </p>
                                                        <p className="text-sm md:text-lg font-bold text-gray-800 break-words">
                                                            {record.products[0]?.name}
                                                        </p>
                                                    </div>
                                                    
                                                    {/* Status Badge and Submit Button */}
                                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                                                            {status}
                                                        </div>
                                                        {/* Submit Button for Pending Status - Keeping it small */}
                                                        {status === "Pending" && (
                                                            <motion.button
                                                                onClick={() => handleSubmit(record.id)}
                                                                className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors flex items-center space-x-1"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <IoCheckmarkCircle className="text-xs" />
                                                                <span>Submit</span>
                                                            </motion.button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Amounts */}
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-gray-500 text-xs md:text-sm">Total Amount</p>
                                                        <p className="text-sm md:text-lg font-bold text-gray-800">
                                                            {formatCurrencyWithCode(record.amount)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 text-xs md:text-sm">Commission</p>
                                                        <p className="text-sm md:text-lg font-bold text-primary">
                                                            USD {record.commission}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 mb-20"
                    >
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IoDocumentText className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No {activeTab} records</h3>
                        <p className="text-gray-500">No records found for this filter</p>
                    </motion.div>
                )}

                {/* Pagination */}
                <AnimatePresence>
                    {filteredRecords.length > recordsPerPage && showPagination && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            className="fixed bottom-16 left-0 right-0 z-50 flex justify-between items-center p-3 bg-white rounded-t-xl shadow-lg border border-gray-100 mx-4 md:mx-6 md:left-[280px] lg:left-[368px] md:right-4"
                        >
                            <motion.button
                                onClick={() => handlePageChange("prev")}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Previous
                            </motion.button>
                            
                            <span className="text-gray-600 font-medium text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            
                            <motion.button
                                onClick={() => handlePageChange("next")}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <BottomNavMobile />
        </div>
    );
};

export default Records;
