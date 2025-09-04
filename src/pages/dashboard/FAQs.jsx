import { motion } from "framer-motion";
import { fadeIn } from "../../motion";
import {
    FaTasks,
    FaDollarSign,
    FaMoneyBillWave,
    FaBox,
    FaBoxes,
    FaMoneyCheckAlt,
    FaHandshake,
    FaUserFriends,
    FaClock,
} from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

const FAQs = () => {
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

            <h1 className="text-4xl font-bold text-center mb-10 text-primary">FAQ</h1>

            {/* 1. Start Music Album Data Submission Task */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 1 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaTasks className="text-primary text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        1. Start the music album data submission task
                    </h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>(1.1) You need to top up at least <span className="font-semibold text-primary">100 USDT</span> to reset your account and start a new task</li>
                    <li>(1.2) After all tasks are completed, users must apply for a full withdrawal and receive the withdrawal amount before they can apply to reset their account.</li>
                </ul>
            </motion.section>

            {/* 2. Withdrawals */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 2 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaDollarSign className="text-blue-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">2. Withdrawal</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>(2.1) If the user has completed the task for the day and needs to withdraw money, please contact our online customer service to withdraw money.</li>
                    <li>VIP Withdrawal Limits:</li>
                    <ul className="ml-8 list-disc list-inside">
                        <li>VIP1: Up to 1,000 USD</li>
                        <li>VIP2: Up to 10,000 USD</li>
                        <li>VIP3: Up to 15,000 USD</li>
                        <li>VIP4: Unlimited</li>
                    </ul>
                    <li>(2.2) After completing all album submissions, you can apply for a full withdrawal.</li>
                    <li>(2.3) If you choose to give up or quit during the submission of the task music album, you will not be able to apply for a withdrawal or refund.</li>
                    <li>(2.4) If you do not receive the user's withdrawal request, you will not be able to process the withdrawal.</li>
                    <li>(2.5) If you withdraw excess funds, your account will be frozen and you will need to upgrade to the corresponding VIP level to unfreeze the account and withdraw all funds.</li>
                </ul>
            </motion.section>

            {/* 3. Funds */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 3 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaMoneyBillWave className="text-green-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">3. Funds</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>(3.1) All funds will be safely stored in the user's account and can be fully withdrawn after submitting all music album data.</li>
                    <li>(3.2) To avoid fund loss, all data will be processed by the system.</li>
                    <li>(3.3) The platform will bear full responsibility for any unexpected fund loss.</li>
                    <li>(3.4) Depending on the VIP level, the maximum amount of funds that can be held in the account cannot exceed 15 times the level limit.</li>
                </ul>
            </motion.section>

            {/* 4. Ordinary Tasks */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 4 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaBox className="text-yellow-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">4. Ordinary music albums</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>(4.1) The platform commission is divided into ordinary commission and 12 times commission. Each user will have 1-6 opportunities to obtain 12-48 times optimization task commission every day. All users can usually obtain up to 1-3 combination product tasks per group.</li>
                    <li>(4.2) VIP 1 will receive 0.5% of the income for each ordinary music album completed.</li>
                    <li>(4.3) After each music album is submitted, the funds and income will be returned to the user account.</li>
                    <li>(4.4) Once the music album data is assigned to the user account, it cannot be cancelled or skipped.</li>
                    <li className="font-semibold text-red-500">(4.5) All users need to pay attention during work. When adding funds, you need to use your own safe and stable wallet account to add funds. If you use multiple encrypted accounts for deposits multiple times, it will easily lead to account risks (if the account has risk control, you need to pay 20% to 100% of the current balance of the account as the account risk deposit. After the cancellation, all usage rights of the account can be restored)</li>
                </ul>
            </motion.section>

            {/* 5. Combination Tasks */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 5 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaBoxes className="text-teal-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">5. Combination Music Albums</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>(5.1) Users will receive 12x~48x commission for each completed combination music album.</li>
                    <li>(5.2) When you receive the combination music album data, all funds will be used to submit the combination album transaction, and after you complete the data submission of each album in the combination album, the funds will be returned to your account balance.</li>
                    <li>(5.3) The system will randomly assign combination music albums based on the total balance of the user's account.</li>
                </ul>
            </motion.section>

            {/* 6. Deposits */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 6 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaMoneyCheckAlt className="text-indigo-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">6. Deposit</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>(6.1) The deposit amount is selected by the user. We cannot determine the user's deposit amount. It is recommended that users pay in advance according to their own ability.</li>
                    <li>(6.2) If the user needs to pay a deposit when receiving the combination music album, we recommend that the user pay the deposit based on the difference shown in the account.</li>
                    <li>(6.3) The user must confirm the address with the customer service before making a deposit. If the user transfers to the wrong address, the platform is not responsible.</li>
                </ul>
            </motion.section>

            {/* Sections 7–9 remain unchanged */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 7 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaHandshake className="text-pink-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">7. What are the merchant cooperation rules?</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>Merchants depend on users to complete tasks promptly.</li>
                    <li>If task data is not submitted for a long time, it will delay merchant operations.</li>
                    <li>Complete tasks and withdrawals quickly to avoid affecting merchants.</li>
                    <li>Deposit instructions are always provided by the merchant.</li>
                </ul>
            </motion.section>

            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 8 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-10 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaUserFriends className="text-orange-500 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">8. Can I invite other users?</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>Only VIP4 users are eligible to invite new users.</li>
                    <li>To qualify, you must work on the platform for 10 working days.</li>
                    <li>If your account still has unfinished submissions, you cannot invite others.</li>
                </ul>
            </motion.section>

            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 9 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-52 p-6 bg-white rounded-lg shadow-md"
            >
                <div className="flex items-center mb-4">
                    <FaClock className="text-gray-600 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">9. What are the business hours?</h2>
                </div>
                <ul className="ml-8 list-disc list-inside space-y-2">
                    <li>Platform operations: 10:00 – 22:59</li>
                    <li>Customer service: 10:00 – 22:59</li>
                    <li>Withdrawal requests: 10:00 – 22:59</li>
                </ul>
            </motion.section>
        </div>
    );
};

export default FAQs;
