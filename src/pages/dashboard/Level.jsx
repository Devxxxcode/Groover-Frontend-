import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { home, deposit } from "../../constants/app.routes";
import authService from "../../app/service/auth.service";
import { fetchProfileSuccess } from "../../app/slice/profile.slice";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { GoArrowLeft } from "react-icons/go";
import { fetchActivePacks } from "../../app/service/packs.service"; // Import fetch action
import BottomNavMobile from "./components/BottomNavMobile";
import { setPacks } from "../../app/slice/packs.slice";
import Loader from "./components/Load";
import { formatCurrencyWithCode } from "../../utils/currency";

const Level = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile.user);

    // Access the packs state
    const { packs, isLoading, error } = useSelector((state) => state.packs);

    // Safely access the packs data
    const packItems = packs?.data || [];

    // Make sure we know the user's current level (page may be opened directly)
    useEffect(() => {
        if (!profile) {
            authService.fetchProfile().then((res) => {
                if (res.success) dispatch(fetchProfileSuccess(res.data));
            });
        }
    }, [dispatch, profile]);

    // Fetch packs if state is empty
    useEffect(() => {
        const fetchPacks = async () => {
            if (!packs || !packs.data || packs.data.length === 0) {
                try {
                    const packData = await dispatch(fetchActivePacks()).unwrap(); // Fetch data
                    dispatch(setPacks(packData)); // Update state
                } catch (error) {
                    console.error("Error fetching packs:", error);
                }
            }
        };
        fetchPacks();
    }, [dispatch, packs]);

    if (isLoading) {
        return <><Loader /></>
    }

    const currentPackId = profile?.wallet?.package?.id;
    const currentPackName = profile?.wallet?.package?.name;

    return (
        <div className="min-h-screen bg-white p-2 md:p-8">
            {/* Back Button */}
            <div className="w-fit mb-4 transition-opacity hover:opacity-80">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-lg text-primary"
                >
                    <GoArrowLeft />
                    <h2 className="text-base font-semibold text-primary ml-2">Back</h2>
                </button>
            </div>

            {/* Page Title */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800">VIP Levels</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Upgrade to unlock more daily submissions and a higher commission rate.
                </p>
            </div>

            {/* Cards Section */}
            <div className="mb-52 grid grid-cols-1 gap-6 md:mb-1 md:grid-cols-2 lg:grid-cols-3">
                {error ? (
                    <p className="text-primary text-center">{error}</p>
                ) : (
                    packItems.map((pack, idx) => {
                        const isCurrent = pack.id === currentPackId || pack.name === currentPackName;
                        return (
                            <motion.div
                                key={pack.id || idx}
                                whileHover={{ y: -4 }}
                                className={`relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-md transition-shadow hover:shadow-xl ${
                                    isCurrent ? "border-2 border-primary" : "border border-gray-100"
                                }`}
                            >
                                {isCurrent && (
                                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                                        Your level
                                    </span>
                                )}

                                <img src={pack.icon} alt={`${pack.name} icon`} className="mb-3 h-16 w-16 object-contain" />

                                <h3 className="text-lg font-bold text-gray-800">{pack.name}</h3>
                                <p className="mb-4 font-bold text-primary">{formatCurrencyWithCode(pack.usd_value)}</p>

                                <div className="flex-1 space-y-1">
                                    {(pack.description || pack.short_description || "")
                                        .split(/\r?\n/)
                                        .filter((line) => line.trim())
                                        .map((sentence, i) => (
                                            <p key={i} className="text-sm text-gray-600">{sentence.trim()}</p>
                                        ))}
                                </div>

                                {!isCurrent && (
                                    <button
                                        onClick={() => navigate(`${home}/${deposit}`)}
                                        className="mt-5 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-[#d9583b]"
                                    >
                                        Deposit to upgrade
                                    </button>
                                )}
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Bottom Navigation for Mobile */}
            <BottomNavMobile className="md:hidden" />
        </div>
    );
};

export default Level;
