import { FaRegCheckCircle, FaLock, FaTasks, FaUserShield, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../../motion";
import { GoArrowLeft } from "react-icons/go";

const Terms = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-2 md:p-12 font-sans text-gray-700">
            <div className="w-fit bg-gray-200 p-2 rounded-lg shadow-sm mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-lg text-primary"
                >
                    <GoArrowLeft />
                    <h2 className="text-xl font-bold text-gray-800 ml-4">Back</h2>
                </button>
            </div>

            <h1 className="text-3xl font-bold text-center mb-8 text-primary">Contract Rules</h1>
            <p className="text-center mb-8 text-gray-600">
                These Contract Rules apply to all users of the Platform. By registering and using the Platform, you agree to the following obligations:
            </p>

            {/* 1 */}
            <motion.section {...fadeIn("up", 1)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaRegCheckCircle className="text-primary text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">1. Task Reset</h2>
                </div>
                <p>To reset a task, you must complete the current task before you can reset it, and the account balance must be at least <span className="font-semibold text-primary">$100</span>.</p>
            </motion.section>

            {/* 2 */}
            <motion.section {...fadeIn("up", 2)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaTasks className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">2. Withdrawal Requirement</h2>
                </div>
                <p>Each user must complete all music album data submission tasks before they can meet the system withdrawal requirements.</p>
            </motion.section>

            {/* 3 */}
            <motion.section {...fadeIn("up", 3)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaLock className="text-indigo-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">3. Withdrawals</h2>
                </div>
                <p>To avoid capital loss, all withdrawals are automatically processed by the system, not manually.</p>
            </motion.section>

            {/* 4 */}
            <motion.section {...fadeIn("up", 4)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaUserShield className="text-green-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">4. Fund Safety</h2>
                </div>
                <p>The user's funds are completely safe on the platform, and the platform will be liable for any accidental losses.</p>
            </motion.section>

            {/* 5 */}
            <motion.section {...fadeIn("up", 5)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaLock className="text-yellow-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">5. Password Confidentiality</h2>
                </div>
                <p>Please do not disclose your account password and security code to others. The platform will not be responsible for any losses or damages caused by this.</p>
            </motion.section>

            {/* 6 */}
            <motion.section {...fadeIn("up", 6)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaUserShield className="text-purple-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">6. Account Security</h2>
                </div>
                <p>It is recommended that all users keep their accounts properly to avoid leakage. The platform is not responsible for any accidental leakage of any account.</p>
            </motion.section>

            {/* 7 */}
            <motion.section {...fadeIn("up", 7)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaTasks className="text-teal-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">7. Album Assignment</h2>
                </div>
                <p>Users can only get one three-in-one music album combination for each task. The system will randomly assign albums. In the combination album, users have a higher probability of getting 1–3 music albums.</p>
            </motion.section>

            {/* 8 */}
            <motion.section {...fadeIn("up", 8)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaLock className="text-indigo-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">8. Security Code</h2>
                </div>
                <p>Do not set simple passwords such as birthdays, ID numbers, or phone numbers. Use a more complex password. If forgotten, reset via online customer service and immediately change it yourself afterwards.</p>
            </motion.section>

            {/* 9 */}
            <motion.section {...fadeIn("up", 9)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaExclamationTriangle className="text-orange-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">9. Protection Mode</h2>
                </div>
                <p>If the account balance exceeds <span className="font-semibold text-primary">50,000 USD</span> and the wrong transaction password is entered 3 times, the account enters protection mode. A deposit of 30%–50% of the balance is required to release protection mode and reset the password.</p>
            </motion.section>

            {/* 10 */}
            <motion.section {...fadeIn("up", 10)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaTasks className="text-red-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">10. Random Task Assignment</h2>
                </div>
                <p>Music album data submission tasks are randomly assigned and cannot be changed, canceled, or skipped. All users receive random packages, and no one can alter this process.</p>
            </motion.section>

            {/* 11 */}
            <motion.section {...fadeIn("up", 11)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaExclamationTriangle className="text-pink-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">11. Legal Action</h2>
                </div>
                <p>Legal action will be taken if the account is misused.</p>
            </motion.section>

            {/* 12 */}
            <motion.section {...fadeIn("up", 12)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaRegCheckCircle className="text-green-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">12. Deposit Rules</h2>
                </div>
                <p>Each work comes from a different record company. Deposits must be made within 30 minutes and confirmed with customer service. The platform is not responsible for deposits sent to the wrong account.</p>
            </motion.section>

            {/* 13 */}
            <motion.section {...fadeIn("up", 13)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaTasks className="text-gray-600 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">13. Task Completion</h2>
                </div>
                <p>Users must complete and withdraw funds within 24 hours. Failure to complete tasks without notifying the record company will result in complaints and breach of contract. Long-term extensions reduce credit scores. If a score falls below 100, it must be repaired before withdrawals can be made.</p>
            </motion.section>

            {/* 14 */}
            <motion.section {...fadeIn("up", 14)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaExclamationTriangle className="text-red-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">14. Task Abandonment</h2>
                </div>
                <p>If you choose to give up or quit during the submission of the task music album, you will not be able to apply for a withdrawal or refund.</p>
            </motion.section>

            {/* 15 */}
            <motion.section {...fadeIn("up", 15)} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaLock className="text-orange-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">15. Excess Withdrawal</h2>
                </div>
                <p>If you withdraw excess funds, your account will be frozen and you will need to upgrade to the corresponding VIP level to unfreeze the account and withdraw all funds.</p>
            </motion.section>

            {/* 16 */}
            <motion.section {...fadeIn("up", 16)} className="md:mb-6 mb-52 p-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                    <FaUserShield className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">16. Tax Regulations</h2>
                </div>
                <p>According to the regulations of different regional governments on our platform, all users with personal funds exceeding 50,000 USDT/USDC are required to pay personal income tax of 20%-40% of the account funds before the withdrawal is processed, but the personal income tax will be refunded to your work account 2 hours after the withdrawal is completed.</p>
            </motion.section>
        </div>
    );
};

export default Terms;
