import { BsArrowRightShort } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { BsCalendar2Event } from "react-icons/bs";
import { BiBook } from "react-icons/bi";
import { FaCcMastercard } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { MdRestartAlt } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import videoSource from "../../assets/home_video.mp4";
import { CiCreditCard1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { about, certificate, deposit, events, faq, starting, terms, withdraw } from "../../constants/app.routes";
import BottomNavMobile from "./components/BottomNavMobile";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivePacks } from "../../app/service/packs.service"; // Import the service
import { setPacks } from "../../app/slice/packs.slice";
import Loader from "./components/Load";
import { toast } from "sonner";
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess, setWelcomeState, toggleWelcomeState } from "../../app/slice/profile.slice";
import authService from "../../app/service/auth.service";
import ErrorHandler from "../../app/ErrorHandler";
import { fetchNotifications } from "../../app/service/notifications.service";
import carouselImage1 from "../../assets/carousel/1.jpeg";
import carouselImage2 from "../../assets/carousel/2.jpeg";
import carouselImage3 from "../../assets/carousel/3.jpeg";
import carouselImage4 from "../../assets/carousel/18.jpeg";
import carouselImage5 from "../../assets/carousel/5.jpeg";
import carouselImage6 from "../../assets/carousel/6.jpeg";
import carouselImage7 from "../../assets/carousel/7.jpeg";
import carouselImage8 from "../../assets/carousel/8.jpeg";
import carouselImage9 from "../../assets/carousel/9.jpeg";
import carouselImage10 from "../../assets/carousel/10.jpeg";
import carouselImage11 from "../../assets/carousel/11.jpeg";
import carouselImage12 from "../../assets/carousel/12.jpeg";
import carouselImage13 from "../../assets/carousel/13.jpeg";
import carouselImage14 from "../../assets/carousel/14.jpeg";
import carouselImage15 from "../../assets/carousel/15.jpeg";
import carouselImage16 from "../../assets/carousel/16.jpeg";
import carouselImage17 from "../../assets/carousel/17.jpeg";
import carouselImage18 from "../../assets/carousel/18.jpeg";
import carouselImage19 from "../../assets/carousel/19.jpeg";
import carouselImage20 from "../../assets/carousel/20.jpeg";
import carouselImage21 from "../../assets/carousel/21.jpeg";
import carouselImage22 from "../../assets/carousel/22.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { formatCurrencyWithCode } from "../../utils/currency";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isVideoLoading, setVideoLoading] = useState(true);
    const [isCarouselPaused, setIsCarouselPaused] = useState(false);
    const carouselRef = useRef(null);

    const showWelcome = useSelector((state) => state.profile.showWelcome); // Use Redux state for showWelcome
    // eslint-disable-next-line no-unused-vars

    const profile = useSelector((state) => state.profile.user);
    const { notifications } = useSelector((state) => state.notifications);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Single carousel images array - no duplicates
    const carouselImages = [
        carouselImage1, carouselImage2, carouselImage3, carouselImage4, carouselImage5, 
        carouselImage6, carouselImage7, carouselImage8, carouselImage9, carouselImage10, 
        carouselImage11, carouselImage12, carouselImage13, carouselImage14, carouselImage15,
        carouselImage16, carouselImage17, carouselImage18, carouselImage19, carouselImage20, 
        carouselImage21, carouselImage22
    ];

    // Unread notifications count
    const unreadNotifications = notifications.filter(notification => !notification.is_read).length;

    // Fetch packs data from Redux state
    const { packs, isLoading, error } = useSelector((state) => state.packs);

    // Adjust the packs mapping logic
    const packItems = packs?.data || []; // Access the data array safely

    useEffect(() => {
        const fetchPacks = async () => {
            if (!packs || !packs.data || packs.data.length === 0) {
                try {
                    // Dispatch the action and await the promise
                    const response = dispatch(fetchActivePacks());

                    // Check if the action returned the expected data
                    if (response.payload?.success) {
                        dispatch(setPacks(response.payload.data)); // Update state with fetched packs
                    } else {
                        return
                    }
                } catch (error) {
                    console.error("Error fetching packs:", error);
                    ErrorHandler(error); // Handle the error
                }
            }
        };
        fetchPacks();
    }, [dispatch, packs]);

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

    useEffect(() => {
        const fetchNotificationsInterval = () => {
            dispatch(fetchNotifications());
        };

        fetchNotificationsInterval();

        const interval = setInterval(fetchNotificationsInterval, 120000);

        return () => clearInterval(interval);
    }, [dispatch]);

    // Automatically hide the welcome message after 5 seconds
    useEffect(() => {
        if (showWelcome) {
            const timer = setTimeout(() => {
                dispatch(setWelcomeState(false)); // Hide welcome message using Redux
            }, 5000); // 5000ms = 5 seconds

            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [showWelcome, dispatch]);

    const toggleWelcome = () => {
        dispatch(toggleWelcomeState()); // Use Redux action to toggle welcome message
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="min-h-screen bg-white flex flex-col relative">
            {/* Sliding Notification Bar */}
            <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="bg-white w-full text-black py-2 z-30 flex items-center justify-center"
                // style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.5 }}
            >
                <div className="md:hidden relative flex items-center">
                    <IoMdNotificationsOutline
                        onClick={() => navigate("/home/notifications")}
                        className={`text-lg cursor-pointer ml-2 ${unreadNotifications > 0 ? "shake" : ""}`}
                    />
                    {unreadNotifications > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                            {unreadNotifications}
                        </span>
                    )}
                </div>
                <marquee direction="">
                    Welcome to Musosoup! We collaborate with you to drive better exposure and
                    create proven value with Musosoup platform strategy and product solutions.
                </marquee>
            </motion.div>

            {/* Video Section */}
            <div className="relative w-full md:h-[31rem] h-[15rem] overflow-hidden">
                {isVideoLoading && (
                    <div className="animate-pulse bg-gray-100 w-full h-full rounded-lg" />
                )}
                <video
                    className="w-full h-full object-fill"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setVideoLoading(false)}
                    onError={(e) => {
                        console.error("Video failed to load:", e);
                        setVideoLoading(false);
                        e.target.src = videoSource; // Fallback to default video
                    }}
                >
                    <source
                        src={profile?.settings?.video || videoSource}
                        type="video/mp4"
                    />
                    Your browser does not support HTML5 video.
                </video>
            </div>

            {/* Fixed Marquee Carousel Section */}
            <div 
                ref={carouselRef}
                className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-8 overflow-hidden relative"
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
            >
                <div 
                    className={`absolute top-0 left-0 h-full flex items-center ${isCarouselPaused ? 'animate-pause' : 'animate-marquee-smooth'} infinite`}
                    style={{ 
                        animationPlayState: isCarouselPaused ? 'paused' : 'running'
                    }}
                >
                    <div className="flex space-x-8 pr-8">
                        {carouselImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.15, y: -10 }}
                                className="flex-shrink-0"
                            >
                                <img
                                    src={img}
                                    alt={`Partner logo ${idx + 1}`}
                                    className="md:h-[100px] h-[80px] w-auto object-contain transition-all duration-300 opacity-90 hover:opacity-100"
                                    style={{ 
                                        maxWidth: '160px',
                                        minWidth: '120px'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add custom animation in CSS */}
            <style jsx>{`
                @keyframes marquee-smooth {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee-smooth {
                    animation: marquee-smooth 60s linear infinite;
                    white-space: nowrap;
                }
                .animate-pause {
                    animation: marquee-smooth 60s linear infinite;
                    white-space: nowrap;
                    animation-play-state: paused;
                }
            `}</style>

            {/* Links Section */}
            <div className="bg-primary md:py-12 py-6">
                <div className="container mx-auto grid grid-cols-4 md:flex justify-around md:flex-wrap md:gap-4 gap-2 px-4">
                    {[
                        { label: "Starting", icon: MdRestartAlt, route: (starting) },
                        { label: "Cert", icon: TbCertificate, route: (certificate) },
                        { label: "Withdraw", icon: FaCcMastercard, route: (withdraw) },
                        { label: "Deposit", icon: CiCreditCard1, route: (deposit) },
                        { label: "T & C", icon: BiBook, route: (terms) },
                        { label: "Events", icon: BsCalendar2Event, route: (events) },
                        { label: "FAQ", icon: RiQuestionAnswerLine, route: (faq) },
                        { label: "About Us", icon: FiUsers, route: (about) },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => item.route && navigate(item.route)}
                            className="bg-secondary cursor-pointer rounded-lg shadow-lg p-3 w-auto h-auto md:w-[120px] md:h-[80px] text-center flex flex-col items-center justify-center"
                        >
                            <item.icon className="text-2xl text-primary mb-1" />
                            <p className="md:text-xs text-sm font-semibold text-gray-700">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {showWelcome && (
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-24 left-4 md:left-80 bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center cursor-pointer z-10 md:bottom-4"
                    onClick={toggleWelcome}
                    style={{
                        width: showWelcome ? "auto" : "10px",
                        padding: showWelcome ? "12px" : "8px",
                        height: showWelcome ? "auto" : "70px",
                    }}
                >
                    {showWelcome ? (
                        <>
                            <FaUserCircle className="mr-2" />
                            <div>
                                <p className="text-lg font-bold">Hi, {profile?.first_name} 👋</p>
                                <p>Welcome Back</p>
                            </div>
                            <MdChevronLeft className="ml-2 text-2xl" />
                        </>
                    ) : (
                        <MdChevronRight className="text-2xl" />
                    )}
                </motion.div>
            )}

            {/* Packs Section */}
            <div className="container mx-auto pt-4 px-2 md:pb-2 pb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">VIP Levels</h2>
                    <button
                        onClick={() => navigate("/home/level")}
                        className="font-semibold rounded-full border border-primary p-2 flex items-center transition-transform hover:scale-105 transform">
                        View More
                        <BsArrowRightShort className="text-2xl text-primary" />
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {isLoading ? (
                        <p>Loading packs...</p>
                    ) : error ? (
                        toast.error
                    ) : packItems.length > 0 ? (
                        // Show only first 4 items (one line)
                        packItems.slice(0, 4).map((pack, idx) => (
                            <motion.div
                                key={idx}
                                onClick={() => navigate("/home/level")}
                                className="p-5 rounded-lg cursor-pointer bg-secondary border-primary border flex flex-col justify-center items-center h-auto relative min-w-0"
                            >
                                <div className="flex justify-between w-full items-center mb-2">
                                    {/* Use <img> to render the image */}
                                    <img
                                        src={pack.icon}
                                        alt={pack.name}
                                        className="w-10 h-10 object-contain" // Adjust size as needed
                                    />
                                    <span className="text-white rounded-lg px-2 py-1 border text-center bg-primary min-w-[80px] text-[10px] sm:text-xs flex items-center justify-center">
                                        {formatCurrencyWithCode(pack.usd_value)}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-800 text-lg text-center mb-4">
                                    {pack.name}
                                </h3>
                                <p className="text-gray-600 text-sm text-center">
                                    {pack.short_description || "No description available."}
                                </p>
                            </motion.div>
                        ))
                    ) : (
                        <p>No packs available.</p>
                    )}
                </div>
                
                {/* Show "View More" hint if there are more than 4 packs */}
                {packItems.length > 4 && (
                    <div className="text-center mt-6">
                        <p className="text-gray-600 text-sm">
                            +{packItems.length - 4} more VIP levels available
                        </p>
                    </div>
                )}
            </div>
            <div className="md:pb-0 pb-28 md:px-0 px-2">
                <iframe
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/playlist/52ryhemOPZrgqWE98Sr3kl?utm_source=generator"
                    width="100%"
                    height="512"
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
            </div>
            <BottomNavMobile className="md:hidden" />
        </div>

    );
};

export default Home;
