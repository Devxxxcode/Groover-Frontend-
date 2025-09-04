import { BiMusic } from "react-icons/bi";
import { GiPowerLightning } from "react-icons/gi";
import { motion } from "framer-motion";
import { fadeIn } from "../../motion";
import { FaPeopleCarry, FaLightbulb, FaHandshake } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

const AboutUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-sans text-gray-700">
            {/* Back Button */}
            <div className="w-fit bg-gray-200 p-3 rounded-lg shadow-sm mb-8 hover:bg-gray-300 transition-colors">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-lg text-primary"
                >
                    <GoArrowLeft className="text-xl" />
                    <h2 className="text-xl font-bold text-gray-800 ml-3">Back</h2>
                </button>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">About Us</h1>

            {/* Our Story Section */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 1 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-12 p-6 md:p-8 bg-white rounded-xl shadow-lg"
            >
                <div className="flex items-center mb-6">
                    <FaPeopleCarry className="text-primary text-3xl md:text-4xl mr-4 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Our Story</h2>
                </div>
                <div className="ml-0 md:ml-12 space-y-4">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        Musosoup started with a friendship and grew to be a successful business that still retains its core values: putting great emphasis on
                        teamwork, transparency, commitment, consistency, quality, and always being ready to support and help both clients and colleagues.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        Founded in 2013 by professional affiliate marketers and webmasters with over 20 years of experience, Musosoup has developed into a
                        trusted name in the industry. What started as a shared vision has now blossomed into a platform that blends technology and human
                        intelligence to deliver excellence.
                    </p>
                </div>
            </motion.section>

            {/* Vision Section */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 2 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-12 p-6 md:p-8 bg-white rounded-xl shadow-lg"
            >
                <div className="flex items-center mb-6">
                    <FaLightbulb className="text-yellow-500 text-3xl md:text-4xl mr-4 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Our Vision</h2>
                </div>
                <div className="ml-0 md:ml-12 space-y-4">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg italic">
                        "We were friends at school and university, brought together by our shared interest in technology and marketing, as well as the desire to
                        find the best way to attain self-realization and success. While striving to grow financially, we didn't want to get tangled up in the
                        complex corporate culture."
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        Musosoup's founders wanted to create something new, both for themselves and for the market. The result is a company with a professional
                        IT department, experienced account managers, and a team of dedicated employees who strive to provide outstanding support and solutions
                        for advertisers and publishers.
                    </p>
                </div>
            </motion.section>

            {/* Our Mission Section */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 3 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-12 p-6 md:p-8 bg-white rounded-xl shadow-lg"
            >
                <div className="flex items-center mb-6">
                    <FaLightbulb className="text-green-500 text-3xl md:text-4xl mr-4 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Our Mission</h2>
                </div>
                <div className="ml-0 md:ml-12 space-y-4">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        We connect advertisers and publishers of all sizes globally, helping them grow their capital, develop their skills, and improve as
                        professionals to ensure a successful present and future.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        By setting high traffic and service quality standards, we contribute to the development of the adtech market. Through our innovative
                        products, we aim to foster growth, share knowledge, and collaborate with the community to build a brighter future for all.
                    </p>
                </div>
            </motion.section>

            {/* Recognition Section */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 4 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-12 p-6 md:p-8 bg-white rounded-xl shadow-lg"
            >
                <div className="flex items-center mb-6">
                    <FaHandshake className="text-blue-500 text-3xl md:text-4xl mr-4 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Industry Recognition</h2>
                </div>
                <div className="ml-0 md:ml-12 space-y-4">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        Today, Musosoup is a well-known brand with a strong reputation and has been recognized by numerous bloggers and affiliates as one of the
                        top adtech platforms. Our blend of innovative technology and human intelligence makes us a trusted partner in the industry.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        We believe that our dedication to excellence and support for both advertisers and publishers is what sets us apart and drives our
                        success.
                    </p>
                </div>
            </motion.section>

            {/* Empowering Artists Section */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 5 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-12 p-6 md:p-8 bg-white rounded-xl shadow-lg"
            >
                <div className="flex items-center mb-6">
                    <GiPowerLightning className="text-red-500 text-3xl md:text-4xl mr-4 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Empowering Artists Everywhere</h2>
                </div>
                <div className="ml-0 md:ml-12 space-y-4">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        Musosoup exists to give every artist a fair shot at being heard. Whether you're just starting out or already a platinum-selling musician, our platform connects your music with a global network of bloggers, reviewers, playlisters, radio hosts, and industry tastemakers.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        With curators from over 100 countries, we've already helped generate more than 1.4 million pieces of coverage for artists worldwide.
                    </p>
                </div>
            </motion.section>

            {/* Built by Music People Section */}
            <motion.section
                initial={fadeIn("up", null).initial}
                whileInView={fadeIn("up", 6 * 2).animate}
                viewport={{ once: false, amount: 0.2 }}
                className="mb-16 p-6 md:p-8 bg-white rounded-xl shadow-lg"
            >
                <div className="flex items-center mb-6">
                    <BiMusic className="text-purple-500 text-3xl md:text-4xl mr-4 flex-shrink-0" />
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Built by Music People, For Music People</h2>
                </div>
                <div className="ml-0 md:ml-12 space-y-4">
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        We're industry professionals who believe music promotion should be fair, affordable, and accessible. Every submission is listened to and vetted, ensuring that if your track makes it onto our platform, it gets genuine coverage—from reviews and interviews to playlists, radio plays, features, and influencer shoutouts.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        Musosoup isn't just a service—it's a mission: to democratize music promotion and make sure grassroots and independent artists thrive. Because great music deserves to be discovered.
                    </p>
                </div>
            </motion.section>
        </div>
    );
};

export default AboutUs;
