import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GiCrown } from "react-icons/gi";
import { motion } from "framer-motion";
import { slideIn } from "../../motion";
import BottomNavMobile from "./components/BottomNavMobile";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentGame, fetchProducts, submitCurrentGame } from "../../app/service/products.service";
import { toast } from "sonner";
import ErrorHandler from "../../app/ErrorHandler";
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess } from "../../app/slice/profile.slice";
import authService from "../../app/service/auth.service";
import LoadingSpinner from "./components/LoadingSpinner";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { formatCurrencyWithCode } from "../../utils/currency";

// Initialize SweetAlert2 with React Content
const MySwal = withReactContent(Swal);

// Responsive loading spinner component
const ResponsiveSpinner = ({ size = "default" }) => {
    const sizeClasses = {
        sm: "w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40",
        default: "w-32 h-32 md:w-80 md:h-80 lg:w-96 lg:h-96",
        lg: "w-48 h-48 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
    };

    return (
        <div className={`${sizeClasses[size]} relative`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width="100%"
                height="100%"
                style={{ shapeRendering: "auto", display: "block", background: "transparent" }}
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <g>
                    <path
                        style={{ transform: "scale(0.8)", transformOrigin: "50px 50px" }}
                        strokeLinecap="round"
                        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                        strokeDasharray="207.83703186035157 48.75189636230468"
                        strokeWidth="10"
                        stroke="#072C3B"
                        fill="none"
                    >
                        <animate
                            values="0;256.58892822265625"
                            keyTimes="0;1"
                            dur="1s"
                            repeatCount="indefinite"
                            attributeName="stroke-dashoffset"
                        ></animate>
                    </path>
                </g>
            </svg>
        </div>
    );
};

// const slideVariants = {
//     enter: (direction) => ({
//         x: direction < 0 ? 1000 : -1000,
//         opacity: 0,
//     }),
//     center: {
//         x: 0,
//         opacity: 1,
//     },
//     exit: (direction) => ({
//         x: direction > 0 ? 1000 : -1000,
//         opacity: 0,
//     }),
// };

const Starting = () => {
    const dispatch = useDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStar, setSelectedStar] = useState(5);
    const [comments, setComments] = useState("");


    const profile = useSelector((state) => state.profile.user);
    const isLoading = useSelector((state) => state.products.isLoading);
    const isLoading_current = useSelector((state) => state.products.isLoading_current);
    const products = useSelector((state) => state.products.products);
    const currentGame = useSelector((state) => state.products.currentGame);
    const error_msg = useSelector((state) => state.products.error_msg);

    // console.log("currentGame", currentGame)

    // eslint-disable-next-line no-unused-vars
    // const images = [
    //     "https://picsum.photos/id/101/150/150", // Random image 1
    //     "https://picsum.photos/id/102/150/150", // Random image 2
    //     "https://picsum.photos/id/103/150/150", // Random image 3
    //     "https://picsum.photos/id/104/150/150", // Random image 4
    //     "https://picsum.photos/id/105/150/150", // Random image 5
    //     "https://picsum.photos/id/106/150/150", // Random image 6
    //     "https://picsum.photos/id/107/150/150", // Random image 7
    //     "https://picsum.photos/id/108/150/150", // Random image 8
    //     "https://picsum.photos/id/109/150/150", // Random image 9
    //     "https://picsum.photos/id/110/150/150", // Random image 10
    //     "https://picsum.photos/id/111/150/150", // Random image 11
    //     "https://picsum.photos/id/112/150/150", // Random image 12
    //     "https://picsum.photos/id/113/150/150", // Random image 13
    //     "https://picsum.photos/id/114/150/150", // Random image 14
    //     "https://picsum.photos/id/115/150/150", // Random image 15
    //     "https://picsum.photos/id/116/150/150", // Random image 16
    //     "https://picsum.photos/id/117/150/150", // Random image 17
    //     "https://picsum.photos/id/118/150/150", // Random image 18
    //     "https://picsum.photos/id/119/150/150", // Random image 19
    //     "https://picsum.photos/id/120/150/150", // Random image 20
    // ];

    // Function to fetch user profile
        const fetchProfile = async () => {
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
        };

    useEffect(() => {
        if (!profile) {
        fetchProfile();
        }
    }, [dispatch, profile]);

    // useEffect(() => {
    //     const fetchCurrentGameData = async () => {
    //         if (!currentGame || Object.keys(currentGame).length === 0) {
    //             dispatch(fetchCurrentGame());
    //         }
    //     };

    //     fetchCurrentGameData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch]);

    useEffect(() => {
        const fetchProductsData = async () => {
            if (!products || products.length === 0) {
                dispatch(fetchProducts());
            }
        };

        fetchProductsData();
    }, [dispatch, products]);

    // New state for tracking loaded images
    const [loadedImages, setLoadedImages] = useState({});

    // Preload images when products change
    useEffect(() => {
        if (products && products.length > 0) {
            products.forEach((product) => {
                const img = new Image();
                img.src = product.image || "https://via.placeholder.com/150";
                img.onload = () => {
                    setLoadedImages((prev) => ({
                        ...prev,
                        [product.image]: true,
                    }));
                };
            });
        }
    }, [products]);

    // Utility to check if an image is loaded
    const isImageLoaded = (src) => loadedImages[src];

    const groupProducts = (products, groupSize) => {
        const grouped = [];
        for (let i = 0; i < products.length; i += groupSize) {
            grouped.push(products.slice(i, i + groupSize));
        }
        return grouped;
    };

    const groupedProducts = products?.length > 0 ? groupProducts(products, 7) : [[]];
    const totalSlides = groupedProducts.length;

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    useEffect(() => {
        if (currentSlide >= totalSlides) {
            setCurrentSlide(0);
        }
    }, [currentSlide, totalSlides]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();
        }, 3000); // Autoplay every 3 seconds

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlide]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleButtonClick = async () => {
        if (!currentGame || Object.keys(currentGame).length === 0) {
            const response = await dispatch(fetchCurrentGame());
            console.log("response", response)
            if (response.success) {
                const special_product = response?.data?.special_product
                if (special_product) {
                    // Fetch profile again to show updated balance (including negative balance)
                    await fetchProfile();
                    
                    // Show SweetAlert that covers the modal
                    await showSpecialAlbumAlert();
                }
            }
        }
        toggleModal(); // Call toggleModal after fetching game data
        if (currentGame && currentGame.special_product) {
            // Fetch profile again to show updated balance (including negative balance)
            await fetchProfile();
            
            // Show SweetAlert that covers the modal
            await showSpecialAlbumAlert();
        }
    };

    // Helper function to create SweetAlert with maximum z-index
    const showSpecialAlbumAlert = () => {
        // Find the highest z-index on the page and set SweetAlert above it
        const getAllElements = () => {
            const elements = [];
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_ELEMENT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                elements.push(node);
            }
            return elements;
        };
        
        const getHighestZIndex = () => {
            const elements = getAllElements();
            let highest = 0;
            
            elements.forEach(el => {
                const zIndex = parseInt(window.getComputedStyle(el).zIndex);
                if (!isNaN(zIndex) && zIndex > highest) {
                    highest = zIndex;
                }
            });
            
            return highest;
        };
        
        // Check for common modal/overlay selectors
        const checkForModals = () => {
            const modalSelectors = [
                '.modal', '.overlay', '.popup', '.dialog', '.drawer',
                '[role="dialog"]', '[role="modal"]', '.ant-modal',
                '.MuiModal-root', '.MuiDialog-root', '.el-dialog',
                '.van-popup', '.van-overlay', '.van-modal',
                '.chakra-modal', '.chakra-overlay', '.chakra-drawer',
                '.bootstrap-modal', '.bootstrap-overlay',
                '.semantic-modal', '.semantic-overlay',
                '.foundation-modal', '.foundation-overlay',
                '.bulma-modal', '.bulma-overlay'
            ];
            
            let modalZIndex = 0;
            modalSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    const zIndex = parseInt(window.getComputedStyle(el).zIndex);
                    if (!isNaN(zIndex) && zIndex > modalZIndex) {
                        modalZIndex = zIndex;
                    }
                });
            });
            
            return modalZIndex;
        };
        
        // Check for common CSS framework z-index values
        const getFrameworkZIndex = () => {
            const frameworkZIndexes = {
                'ant-design': 1000,
                'material-ui': 1300,
                'element-ui': 2000,
                'vant': 2000,
                'chakra-ui': 1400,
                'bootstrap': 1050,
                'semantic-ui': 1000,
                'foundation': 1000,
                'bulma': 1000
            };
            
            return Math.max(...Object.values(frameworkZIndexes));
        };
        
        // Check for inline styles and dynamically set z-index values
        const checkInlineZIndex = () => {
            const elements = document.querySelectorAll('*');
            let highestInline = 0;
            
            elements.forEach(el => {
                const inlineZIndex = el.style.zIndex;
                if (inlineZIndex) {
                    const zIndex = parseInt(inlineZIndex);
                    if (!isNaN(zIndex) && zIndex > highestInline) {
                        highestInline = zIndex;
                    }
                }
            });
            
            return highestInline;
        };
        
        // Check for CSS animations and transitions that might affect z-index
        const checkCSSAnimations = () => {
            const animatedElements = document.querySelectorAll('*');
            let highestAnimated = 0;
            
            animatedElements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const hasAnimation = computedStyle.animation !== 'none' || computedStyle.transition !== 'none';
                
                if (hasAnimation) {
                    const zIndex = parseInt(computedStyle.zIndex);
                    if (!isNaN(zIndex) && zIndex > highestAnimated) {
                        highestAnimated = zIndex;
                    }
                }
            });
            
            return highestAnimated;
        };
        
        // Check for CSS custom properties that might set z-index values
        const checkCSSVariables = () => {
            const root = document.documentElement;
            const computedStyle = window.getComputedStyle(root);
            let highestVariable = 0;
            
            // Check common CSS variable names for z-index
            const zIndexVariables = [
                '--z-index', '--zindex', '--z', '--layer',
                '--modal-z', '--overlay-z', '--popup-z',
                '--drawer-z', '--dialog-z', '--tooltip-z'
            ];
            
            zIndexVariables.forEach(varName => {
                const value = computedStyle.getPropertyValue(varName);
                if (value) {
                    const zIndex = parseInt(value);
                    if (!isNaN(zIndex) && zIndex > highestVariable) {
                        highestVariable = zIndex;
                    }
                }
            });
            
            return highestVariable;
        };
        
        // Check for CSS frameworks and libraries that might set high z-index values
        const checkCSSFrameworks = () => {
            const frameworkSelectors = [
                '.ant-', '.antd-', '.ant-design-',
                '.mui-', '.Mui', '.material-ui-',
                '.el-', '.element-', '.element-ui-',
                '.van-', '.vant-',
                '.chakra-', '.chakra-ui-',
                '.bs-', '.bootstrap-',
                '.ui-', '.semantic-', '.semantic-ui-',
                '.foundation-', '.bulma-'
            ];
            
            let highestFramework = 0;
            frameworkSelectors.forEach(selector => {
                const elements = document.querySelectorAll(`[class*="${selector}"]`);
                elements.forEach(el => {
                    const zIndex = parseInt(window.getComputedStyle(el).zIndex);
                    if (!isNaN(zIndex) && zIndex > highestFramework) {
                        highestFramework = zIndex;
                    }
                });
            });
            
            return highestFramework;
        };
        
        const highestZIndex = Math.max(
            getHighestZIndex(), 
            checkForModals(), 
            getFrameworkZIndex(),
            checkInlineZIndex(),
            checkCSSAnimations(),
            checkCSSVariables(),
            checkCSSFrameworks()
        );
        const sweetAlertZIndex = Math.max(highestZIndex + 1000, 999999);
        
        // Force SweetAlert to have maximum z-index
        const style = document.createElement('style');
        style.textContent = `
            .swal2-container {
                z-index: ${sweetAlertZIndex} !important;
            }
            .swal2-popup {
                z-index: ${sweetAlertZIndex} !important;
            }
            .swal2-backdrop {
                z-index: ${sweetAlertZIndex - 1} !important;
            }
            .swal2-shown {
                z-index: ${sweetAlertZIndex} !important;
            }
            .swal2-height-auto {
                z-index: ${sweetAlertZIndex} !important;
            }
        `;
        document.head.appendChild(style);
        
        return MySwal.fire({
            title: 'Congratulations!!! You Got A Special Album!!!',
            text: 'This submission contains a special album. Enjoy!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                popup: 'custom-swal-mobile-size',
                backdrop: 'swal2-backdrop-show'
            },
            backdrop: true, // This makes it cover the modal
            allowOutsideClick: false, // Prevents clicking outside to close
            allowEscapeKey: false, // Prevents escape key from closing
            heightAuto: false, // Prevents height auto adjustment
            zIndex: sweetAlertZIndex, // Dynamically calculated highest z-index
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            position: 'center', // Center the alert
            grow: false, // Prevent growing
            width: 'auto', // Auto width
            padding: '2rem' // Add padding
        }).then((result) => {
            // Force SweetAlert to be visible after it's shown
            setTimeout(() => {
                const swalContainer = document.querySelector('.swal2-container');
                const swalPopup = document.querySelector('.swal2-popup');
                if (swalContainer) {
                    swalContainer.style.zIndex = `${sweetAlertZIndex} !important`;
                }
                if (swalPopup) {
                    swalPopup.style.zIndex = `${sweetAlertZIndex} !important`;
                }
            }, 100);
            
            return result;
        }).finally(() => {
            // Clean up the style after SweetAlert is closed
            document.head.removeChild(style);
        });
    };

    // Set global SweetAlert z-index to be above everything
    useEffect(() => {
        // Override SweetAlert2 default z-index
        const style = document.createElement('style');
        style.textContent = `
            .swal2-container {
                z-index: 999999 !important;
            }
            .swal2-popup {
                z-index: 999999 !important;
            }
            .swal2-backdrop {
                z-index: 999998 !important;
            }
            .swal2-shown {
                z-index: 999999 !important;
            }
            .swal2-height-auto {
                z-index: 999999 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Also set SweetAlert2 global options
        if (window.Swal) {
            window.Swal.mixin({
                zIndex: 999999
            });
        }
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Modern Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mx-auto mt-4 md:mt-6 p-4 md:p-6"
            >
                {/* Profile and Greeting Card */}
                <motion.div
                    initial={slideIn("up", null).initial}
                    whileInView={slideIn("up", 1 * 2).animate}
                    className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                {profile?.profile_picture ? (
                                    <img
                                        src={profile.profile_picture}
                                        alt="Profile"
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white/20 shadow-lg"
                                    />
                                ) : (
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/20 shadow-lg">
                                        <BiUserCircle className="text-3xl md:text-4xl text-white" />
                                    </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold">Hi, {profile?.first_name} 👋</h1>
                                <p className="text-white/80 text-xs md:text-sm">Welcome back to your dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {profile?.wallet?.package?.icon ? (
                                <img
                                    src={profile.wallet.package.icon}
                                    alt="Package"
                                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                                />
                            ) : (
                                <GiCrown className="text-3xl md:text-4xl text-white" />
                            )}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Daily Progress</span>
                            <span className="text-sm font-bold">
                                {profile?.current_number_count || 0} / {profile?.total_number_can_play || 0}
                            </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ 
                                    width: `${Math.min(((profile?.current_number_count || 0) / (profile?.total_number_can_play || 1)) * 100, 100)}%` 
                                }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-white/60 to-white rounded-full shadow-lg"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Wallet Information Cards */}
                <motion.div
                    initial={slideIn("up", null).initial}
                    whileInView={slideIn("up", 2 * 2).animate}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        {
                            label: "Wallet Balance",
                            amount: formatCurrencyWithCode(profile?.wallet?.balance || 0),
                            description: "Available funds",
                            icon: "💰",
                            gradient: "from-primary/90 to-primary"
                        },
                        {
                            label: "Today's Profit",
                            amount: formatCurrencyWithCode(profile?.today_profit || 0),
                            description: "Earnings today",
                            icon: "📈",
                            gradient: "from-primary/80 to-primary/90"
                        },
                        {
                            label: "Frozen",
                            amount: formatCurrencyWithCode(profile?.wallet?.on_hold || 0),
                            description: "Frozen funds",
                            icon: "❄️",
                            gradient: "from-primary/70 to-primary/80"
                        },
                        {
                            label: "Salary",
                            amount: formatCurrencyWithCode(profile?.wallet?.salary || 0),
                            description: "Daily salary",
                            icon: "💼",
                            gradient: "from-primary/60 to-primary/70"
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg p-4 text-white relative overflow-hidden h-full`}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xl">{item.icon}</span>
                                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xs md:text-sm mb-1">{item.label}</h3>
                                    <p className="text-white/80 text-xs mb-2">{item.description}</p>
                                    <p className="font-bold text-base md:text-lg">{item.amount}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Start Optimization Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="w-full mt-6 md:mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 mx-4 md:mx-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Start Optimization</h2>
                        <p className="text-gray-600 text-sm md:text-base">Complete tasks to earn rewards</p>
                    </div>
                    <div className="bg-primary/10 rounded-xl px-2 py-1 md:px-4 md:py-2">
                        <p className="text-primary text-sm md:text-lg lg:text-xl font-bold">
                            {profile?.current_number_count || 0} / {profile?.total_number_can_play || 0}
                        </p>
                    </div>
                </div>

                <div className="relative flex justify-center items-center w-full min-h-[400px]">
                    {isLoading ? (
                        <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-4xl">
                            {[...Array(9)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-full w-full aspect-square bg-gray-100 rounded-lg animate-pulse"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full max-w-4xl">
                            {/* Top row */}
                            {groupedProducts[currentSlide]?.slice(0, 3).map((product, idx) => (
                                <div
                                    key={product.id || `top-${idx}`}
                                    className="flex justify-center items-center border rounded-lg bg-primary p-1 w-full aspect-square transform hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={product.image || "https://via.placeholder.com/150"}
                                        alt={product.name || `Product ${idx + 1}`}
                                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${loadedImages[product.image] ? "opacity-100" : "opacity-0"
                                            }`}
                                    />
                                </div>
                            ))}

                            {/* Middle row left */}
                            <div className="flex justify-center items-center border rounded-lg bg-primary p-1 w-full aspect-square transform hover:scale-105 transition-transform">
                                {groupedProducts[currentSlide]?.[3] && (
                                    <img
                                        src={groupedProducts[currentSlide][3].image || "https://via.placeholder.com/150"}
                                        alt={groupedProducts[currentSlide][3].name || "Product 4"}
                                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${loadedImages[groupedProducts[currentSlide][3].image]
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                )}
                            </div>

                            {/* Center button */}
                            <div className="flex justify-center items-center w-full h-full">
                                <motion.button
                                    onClick={handleButtonClick}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-primary text-white font-semibold rounded-full flex items-center justify-center shadow-lg text-sm sm:text-base md:text-lg lg:text-xl start-button"
                                >
                                    Start
                                </motion.button>
                            </div>

                            {/* Middle row right */}
                            <div className="flex justify-center items-center border rounded-lg bg-primary p-1 w-full aspect-square transform hover:scale-105 transition-transform">
                                {groupedProducts[currentSlide]?.[4] && (
                                    <img
                                        src={groupedProducts[currentSlide][4].image || "https://via.placeholder.com/150"}
                                        alt={groupedProducts[currentSlide][4].name || "Product 5"}
                                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${loadedImages[groupedProducts[currentSlide][4].image]
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
                                )}
                            </div>

                            {/* Bottom row */}
                            {Array.from({ length: 3 }).map((_, i) => {
                                const product =
                                    groupedProducts[currentSlide]?.[(5 + i) % groupedProducts[currentSlide]?.length] || {};
                                return (
                                    <div
                                        key={`bottom-${i}`}
                                        className="flex justify-center items-center border rounded-lg bg-primary p-1 aspect-square transform hover:scale-105 transition-transform"
                                    >
                                        <img
                                            src={product.image || "https://via.placeholder.com/150"}
                                            alt={product.name || `Product ${i + 6}`}
                                            className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${loadedImages[product.image] ? "opacity-100" : "opacity-0"
                                                }`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </motion.div>


            {/* Important Hint Section */}
            <div className="w-full md:mb-2 mb-52 mx-auto mt-4 bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-lg font-bold">Important Hint</h2>
                <ul className="list-disc ml-4 mt-2 text-gray-600">
                    <li>Working hours: {profile?.settings?.service_availability_start_time || "00:00"} - {profile?.settings?.service_availability_end_time || "23:00:00"}</li>
                    <li>For inquiries about applicants, please consult Customer Support Services</li>
                </ul>
            </div>

            {/* Current Game Loading */}
            {isLoading_current && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999]">
                    <ResponsiveSpinner size="lg" />
                </div>
            )}

            {/* Modal - Mobile Version (Dialog from bottom) */}
            {isModalOpen && currentGame && window.innerWidth < 768 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[999999]">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 300,
                            scale: 1
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: 300,
                            scale: 1
                        }}
                        className="bg-white p-4 sm:p-8 w-full max-w-2xl rounded-t-3xl shadow-lg relative overflow-y-auto"
                        style={{
                            maxHeight: "90vh"
                        }}
                    >
                        {/* Loading Overlay - Absolutely positioned over modal */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-[1000000] rounded-t-3xl">
                                <ResponsiveSpinner size="lg" />
                            </div>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-primary text-xl font-bold z-[1000001]"
                        >
                            ✕
                        </button>

                        {/* Modal Title */}
                        <h2 className="text-2xl font-bold text-center mb-4 sm:mb-6">Task Submission</h2>

                        {/* Product Images and Details */}
                        <div className="flex items-start sm:space-x-6 mb-4">
                            {/* Product Images */}
                            <div className="flex space-x-2 sm:space-x-4 overflow-x-auto w-full sm:w-auto">
                                {currentGame?.products?.slice(0, 3).map((product) => (
                                    <div key={product?.id} className="flex-shrink-0 w-[90px] md:w-[120px] h-auto">
                                        <img
                                            src={product?.image}
                                            alt={product?.name}
                                            className="w-full h-auto object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Product Details */}
                            <div className="text-right flex-grow md:w-1/4 w-auto">
                                {currentGame?.products?.slice(0, 3).map((product) => (
                                    <p key={product?.id} className="text-sm sm:text-lg font-semibold">
                                        {product?.name}
                                    </p>
                                ))}
                                <p className="text-sm sm:text-lg text-primary font-bold mt-1 sm:mt-2">
                                    USD {currentGame?.amount}
                                </p>

                                <>
                                    {/* Comments Section */}
                                    <textarea
                                        placeholder="Leave your comments here..."
                                        className="w-full mt-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    ></textarea>
                                </>
                            </div>
                        </div>

                        {/* Amount and Commission Section */}
                        <div className="flex justify-between border-t border-b py-2 sm:py-4 mb-4 text-center">
                            <div>
                                <p className="text-base sm:text-xl font-semibold text-gray-500">Total amount</p>
                                <p className="text-primary font-bold text-base sm:text-xl">USD {currentGame?.amount}</p>
                            </div>
                            <div>
                                <p className="text-base sm:text-xl font-semibold text-gray-500">Commission</p>
                                <p className="text-primary font-bold text-base sm:text-xl">USD {currentGame?.commission}</p>
                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    Profit: {currentGame?.commission_percentage || 0}%
                                </p>
                            </div>
                        </div>

                        {/* Creation Time and Rating Number */}
                        <div className="flex justify-between text-sm sm:text-lg text-gray-600 mb-2 sm:mb-4">
                            <p>Creation time</p>
                            <p>{new Date(currentGame?.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6">
                            <p>Rating No</p>
                            <p className="text-primary">{currentGame?.rating_no}</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={async () => {
                                try {
                                    const response = await dispatch(
                                        submitCurrentGame(selectedStar, comments)
                                    );
                                    console.log("response", response.message)
                                    if (response?.success) {
                                        toast.success("Submission successful!");
                                        setComments("");
                                        toggleModal();
                                    } else {
                                        ErrorHandler(response.message);
                                        toggleModal()
                                    }
                                } catch (error) {
                                    ErrorHandler(error);
                                    toggleModal()
                                }
                            }}
                            className="w-full bg-primary text-white font-semibold py-2 sm:py-3 rounded-full flex justify-center items-center"
                        >
                            {currentGame?.pending ? "Confirm Submission" : "Submit"}
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Modal - Desktop/Tablet Version (Centered) */}
            {isModalOpen && currentGame && window.innerWidth >= 768 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999]">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 50,
                            scale: 0.95
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: 50,
                            scale: 0.95
                        }}
                        className="bg-white p-4 sm:p-8 w-full max-w-2xl rounded-3xl shadow-lg relative overflow-y-auto"
                        style={{
                            maxHeight: "90vh"
                        }}
                    >
                        {/* Loading Overlay - Absolutely positioned over modal */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-[1000000] rounded-3xl">
                                <ResponsiveSpinner size="lg" />
                            </div>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-primary text-xl font-bold z-[1000001]"
                        >
                            ✕
                        </button>

                        {/* Modal Title */}
                        <h2 className="text-2xl font-bold text-center mb-4 sm:mb-6">Task Submission</h2>

                        {/* Product Images and Details */}
                        <div className="flex items-start sm:space-x-6 mb-4">
                            {/* Product Images */}
                            <div className="flex space-x-2 sm:space-x-4 overflow-x-auto w-full sm:w-auto">
                                {currentGame?.products?.slice(0, 3).map((product) => (
                                    <div key={product?.id} className="flex-shrink-0 w-[90px] md:w-[120px] h-auto">
                                        <img
                                            src={product?.image}
                                            alt={product?.name}
                                            className="w-full h-auto object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Product Details */}
                            <div className="text-right flex-grow md:w-1/4 w-auto">
                                {currentGame?.products?.slice(0, 3).map((product) => (
                                    <p key={product?.id} className="text-sm sm:text-lg font-semibold">
                                        {product?.name}
                                    </p>
                                ))}
                                <p className="text-sm sm:text-lg text-primary font-bold mt-1 sm:mt-2">
                                    USD {currentGame?.amount}
                                </p>

                                <>
                                    {/* Comments Section */}
                                    <textarea
                                        placeholder="Leave your comments here..."
                                        className="w-full mt-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    ></textarea>
                                </>
                            </div>
                        </div>

                        {/* Amount and Commission Section */}
                        <div className="flex justify-between border-t border-b py-2 sm:py-4 mb-4 text-center">
                            <div>
                                <p className="text-base sm:text-xl font-semibold text-gray-500">Total amount</p>
                                <p className="text-primary font-bold text-base sm:text-xl">USD {currentGame?.amount}</p>
                            </div>
                            <div>
                                <p className="text-base sm:text-xl font-semibold text-gray-500">Commission</p>
                                <p className="text-primary font-bold text-base sm:text-xl">USD {currentGame?.commission}</p>
                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    Profit: {currentGame?.commission_percentage || 0}%
                                </p>
                            </div>
                        </div>

                        {/* Creation Time and Rating Number */}
                        <div className="flex justify-between text-sm sm:text-lg text-gray-600 mb-2 sm:mb-4">
                            <p>Creation time</p>
                            <p>{new Date(currentGame?.created_at).toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6">
                            <p>Rating No</p>
                            <p className="text-primary">{currentGame?.rating_no}</p>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={async () => {
                                try {
                                    const response = await dispatch(
                                        submitCurrentGame(selectedStar, comments)
                                    );
                                    console.log("response", response.message)
                                    if (response?.success) {
                                        toast.success("Submission successful!");
                                        setComments("");
                                        toggleModal();
                                    } else {
                                        ErrorHandler(response.message);
                                        toggleModal()
                                    }
                                } catch (error) {
                                    ErrorHandler(error);
                                    toggleModal()
                                }
                            }}
                            className="w-full bg-primary text-white font-semibold py-2 sm:py-3 rounded-full flex justify-center items-center"
                        >
                            {currentGame?.pending ? "Confirm Submission" : "Submit"}
                        </button>
                    </motion.div>
                </div>
            )}
            <BottomNavMobile className="md:hidden" />

            {/* Custom CSS for Start button */}
            <style jsx>{`
                .start-button {
                    width: 80px;
                    height: 80px;
                    min-width: 80px;
                    min-height: 80px;
                }
                
                @media (min-width: 640px) {
                    .start-button {
                        width: 100px;
                        height: 100px;
                        min-width: 100px;
                        min-height: 100px;
                    }
                }
                
                @media (min-width: 768px) {
                    .start-button {
                        width: 120px;
                        height: 120px;
                        min-width: 120px;
                        min-height: 120px;
                    }
                }
                
                @media (min-width: 1024px) {
                    .start-button {
                        width: 150px;
                        height: 150px;
                        min-width: 150px;
                        min-height: 150px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Starting;