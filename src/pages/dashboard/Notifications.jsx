import { GoArrowLeft } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../app/service/notifications.service";
import { formatDistanceToNow } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { IoNotifications, IoCheckmarkCircle } from "react-icons/io5";
import BottomNavMobile from "./components/BottomNavMobile";
// import Loader from "./components/Load";

const Notification = () => {
    const dispatch = useDispatch();
    const { notifications, isLoading } = useSelector((state) => state.notifications);

    const [currentPage, setCurrentPage] = useState(1);
    const [showPagination, setShowPagination] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const itemsPerPage = 20;

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNotifications = notifications.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(notifications.length / itemsPerPage);

    // Fetch notifications on mount and set up polling
    useEffect(() => {
        const fetchNotificationsInterval = () => {
            dispatch(fetchNotifications());
        };

        fetchNotificationsInterval();

        const interval = setInterval(fetchNotificationsInterval, 120000);

        return () => clearInterval(interval);
    }, [dispatch]);

    // Mark all notifications as read
    const handleMarkAllRead = () => {
        dispatch(markAllNotificationsAsRead());
    };

    // Mark a single notification as read
    const handleMarkAsRead = (id) => {
        dispatch(markNotificationAsRead(id));
    };

    // Navigate to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Navigate to the next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
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
            <div className="max-w-4xl mx-auto">
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary/10 p-3 rounded-xl">
                                <IoNotifications className="text-2xl text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Notifications</h1>
                                <p className="text-gray-600 text-sm md:text-base">
                                    {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>
                        
                        <motion.button
                            onClick={handleMarkAllRead}
                            disabled={isLoading || notifications.every((notif) => notif.is_read)}
                            className="bg-primary text-white px-3 py-2 rounded-lg font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors flex items-center space-x-2 self-start sm:self-auto"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <IoCheckmarkCircle className="text-base" />
                            <span>Mark all read</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Notifications List */}
                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3 mb-20"
                    >
                        {paginatedNotifications.map((notif, index) => (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-200 ${
                                    !notif.is_read ? "ring-2 ring-primary/20 bg-primary/5" : ""
                                }`}
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            {/* Message */}
                                            <p className="text-gray-800 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                                {notif.message}
                                            </p>
                                            
                                            {/* Timestamp */}
                                            <p className="text-gray-500 text-xs md:text-sm mt-2 flex items-center">
                                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                                {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                        
                                        {/* Mark as Read Button */}
                                        {!notif.is_read && (
                                            <motion.button
                                                onClick={() => handleMarkAsRead(notif.id)}
                                                className="ml-4 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors flex items-center space-x-1 flex-shrink-0"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <IoCheckmarkCircle className="text-sm" />
                                                <span>Read</span>
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!isLoading && notifications.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IoNotifications className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
                        <p className="text-gray-500">You're all caught up!</p>
                    </motion.div>
                )}

                {/* Pagination */}
                <AnimatePresence>
                    {totalPages > 1 && showPagination && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                            className="fixed bottom-16 left-0 right-0 z-50 flex justify-between items-center p-3 bg-white rounded-t-xl shadow-lg border border-gray-100 mx-4 md:mx-6 md:left-[280px] lg:left-[368px] md:right-4"
                        >
                            <motion.button
                                onClick={handlePreviousPage}
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
                                onClick={handleNextPage}
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

export default Notification;
