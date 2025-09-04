import { MdOutlineHandshake } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { slideIn, fadeIn, zoomIn } from "../../motion";
import MusicIcon from '../../assets/music.svg';
import PeopleIcon from '../../assets/people.svg';
import MoneyIcon from '../../assets/money.svg';
import Logo from '../../assets/logo.svg';
import LogoInverted from '../../assets/logo-inverted.svg';
import DiscoImage from '../../assets/disco.svg';
import CardImage from '../../assets/card.svg';
import BoltIcon from '../../assets/bolt.svg';
import LaptopImage from '../../assets/laptop.webp';
import FootImage from '../../assets/foot.png';


const Landing = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const listItems = [
        "Musosoup lets you free up your inbox by moving all your submissions on to our music-first platform",
        "Streamline your workflow, save hours on admin, and spend your time discovering great new music.",
        "Our platform has been designed to let you easily view new music, engage with artists and make offers quickly and efficiently",
        "Musosoup gives you more time to do what you love – and be rewarded for doing it."
    ];

    const faqData = [
        { q: "Is it free for curators to use Musosoup?", a: "Yes, it’s free for curators to set up a Musosoup profile and use our platform." },
        { q: "Can I make money using Musosoup?", a: "Yes. There are two ways you can make money via Musosoup. The first is from artist contributions towards the cost of creating content and promoting it. The second is through our referral scheme, which pays you for each artist who signs up to Musosoup using your unique referral link." },
        { q: "What are marketing contributions?", a: "Curators may request marketing contributions from artists, which help to cover the cost of promoting the content created using social media ads. Curators are only allowed to retain a maximum of 20% of this to cover their ad management time and asset creation." },
        { q: "Can I just provide coverage for free?", a: "Absolutely. It’s completely up to you whether you add an additional cost offer to artists. There are plenty of curators who provide free coverage on our platform." },
        { q: "Are there deadlines on submissions?", a: "We understand how busy it can get as a curator, so all tracks submitted via Musosoup will stay on the platform for three weeks from their date of release. However, you do have the option of saving tracks, which keeps them available after an artist’s three-week campaign has ended." },
        { q: "What kind of coverage can I offer?", a: "It’s important to note that there are strict rules about what can be offered in exchange for a contribution and what must always be offered for free. Radio plays, playlist spots and copy-and-pasted written coverage DO NOT QUALIFY and must always be offered for free. Only high-quality, original, bespoke coverage is allowed via Musosoup. Beyond coverage promoting an artist’s submission, this could also include graphic design, video editing, translations, social sharing bundles/stories, and influencer sharing." },
        { q: "Does Musosoup review each offer I make?", a: "Yes. Every offer made on our platform is reviewed and approved by Musosoup to maintain quality, value and fairness." },
        { q: "Does Musosoup review the coverage created by curators?", a: "Yes. We review all final content to make sure curators have held up their end of the deal and provided genuine value to the artist. Any funds due to the curator are not released until the content submitted has been approved by Musosoup." },
        { q: "How does the Marketplace work?", a: "The Marketplace flips our core Offers system, which lets you view artists’ submissions before choosing who to work with. The Marketplace lets you post specific promotions that artists can request directly. You can accept or decline requests and easily manage your workflow on our platform. Listing a promotion on the Marketplace is a great way for new curators to get started on Musosoup." },
        { q: "How else is Musosoup different from other platforms?", a: "In recent years, a number of music submission platforms have been established, on which the artists pays for a “guaranteed listen” and “feedback”. These platforms have made big steps in making curation more sustainable, but still have a long way to go in also being fair for the artist. The system has been abused by curators churning out stock feedback in order to receive their fee. There’s also no vetting process when artists submit to these platforms, so a lot of artists are submitting music that isn’t ready, and most likely submitting to the wrong curators too. With Musosoup, all artists’ submissions are quality-checked, and curators approach artists they like and want to promote, providing a considerably better service all round." },
    ];

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const handleFaqToggle = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const features = [
        {
            icon: MusicIcon,
            title: "Access the best new music",
            content: "Musosoup is completely free for curators. Once your account is approved, you'll get access to a curated stream of high-quality new music and the opportunity to connect with artists actively looking to promote their releases."
        },
        {
            icon: PeopleIcon,
            title: "Build genuine relationships",
            content: "Artist campaigns run for a minimum of three weeks, giving you plenty of time to browse submissions, save the ones you like, and make offers for coverage. Engage with artists directly to discuss the best options for their music."
        },
        {
            icon: MoneyIcon,
            title: "Earn money from your work",
            content: "We've built Musosoup to ensure curators are paid fairly—without compromising integrity—for the time, effort, and investment you put into supporting grassroots music."
        }
    ];

    // Add sustainability data
    const sustainabilityData = [
        {
            icon: MoneyIcon,
            title: "Contribution Requests",
            content: "Musosoup allows curators to request contributions to help cover their time and running costs. This model supports sustainable grassroots music journalism and creates a fairer way for artists and curators to support each other."
        },
        {
            icon: MusicIcon,
            title: "Free Alternatives",
            content: "If a curator requests a contribution, they must also offer a free alternative—such as a playlist placement or social media mention. We believe curators should share music they genuinely love, regardless of payment."
        },
        {
            icon: PeopleIcon,
            title: "Our Curator Network",
            content: "We collaborate with music blog owners, Spotify curators, magazines, radio stations and individuals open to music submissions. Join us to expand our network, supporting independent songwriters and artists."
        }
    ];

    return (
        <div className="text-gray-80">
            {/* HEADER */}
            <header className={`transition-all duration-300 md:px-24 px-1 sticky top-0 z-50 
                ${isScrolled ? 'bg-gray-50' : 'bg-[#0B1126]'}`}>
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-4">
                    <motion.div
                        variants={slideIn("down", 0.5)}
                        initial="initial"
                        animate="animate"
                    >
                        <Link to="/">
                            <img
                                src={isScrolled ? Logo : LogoInverted}
                                alt="logo"
                                loading="lazy"
                                width="145"
                                height="20"
                                className="transition-all duration-300"
                            />
                        </Link>
                    </motion.div>
                    <motion.nav
                        variants={zoomIn(0.5)}
                        initial="initial"
                        whileInView="animate"
                        className="flex"
                    >
                        <Link
                            to={"/loader"}
                            className={`card py-2 md:px-3 px-1 font-medium transition-all duration-300 flex items-center gap-2 ${isScrolled ? 'bg-[#072C3B] text-white hover:opacity-90' : 'bg-gray-200 text-[#0B1126 hover:bg-blue-200/80'}`}
                        >
                            <MdOutlineHandshake />
                            Become a Curator
                        </Link>
                    </motion.nav>
                </div>
            </header>

            {/* HERO */}
            <section className="bg-[#0a0f24] text-white text-center py-20 md:px-24 px-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 items-center max-w-screen-2xl mx-auto">
                    <div className="md:mt-0 -mt-16">
                        <h3 className="text-[#FECC81] font-bold text-left text-[14px] leading-[20px]">FOR CURATORS</h3>
                        <h1 className="md:text-[56px] md:leading-[70px] text-[40px] leading-[50px] font-bold mb-4 text-left">
                            Be rewarded for your passion
                        </h1>
                        <p className="mx-auto text-[16px] leading-[28px] text-[#D6D7E1] text-left">
                            We understand the challenges of being a music curator. Our platform streamlines workflow,
                            cuts admin time, and rewards your efforts in promoting grassroots music.
                        </p>
                    </div>
                    <div className="md:ml-48 ml-12 relative">
                        {/* Glow background */}
                        <div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                background: 'rgba(70, 121, 143, 0.35)',
                                filter: 'blur(130px)',
                                borderRadius: '12px'
                            }}
                        />
                        {/* Image */}
                        <motion.img
                            variants={slideIn("left", 0.5)}
                            initial="initial"
                            whileInView="animate"
                            src={DiscoImage}
                            alt="Workflow"
                            className="w-full h-full max-w-[90%] min-[600px]:max-w-[250px] lg:max-w-[400px] z-10 relative"
                        />
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 md:px-24 px-1 mx-auto bg-[#eef4f6] relative overflow-hidden">
                <div className="max-w-screen-2xl px-4 mx-auto">
                    {/* Gradient background (hide on mobile to reduce GPU cost) */}
                    <div
                        className="hidden md:block absolute rounded-full top-[5%] left-1/2 -translate-x-1/2 opacity-60"
                        style={{
                            background: 'rgba(255, 222, 173, 0.50)',
                            width: '420px',
                            height: '420px',
                            filter: 'blur(130px)'
                        }}
                    />
                    <div className="relative z-10">
                        <h1 className="md:text-[48px] md:leading-[60px] text-[32px] leading-[44px] tracking-[-1px] md:mt-16 
                        font-bold text-center mb-10 text-[#072C3B]">Become a Musosoup curator</h1>
                        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 md:gap-8 pr-8 scroll-smooth">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeIn("down", index)}
                                    initial="initial"
                                    whileInView="animate"
                                    viewport={{ once: true, amount: 0.25 }}
                                    style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                                    className="w-[75%] md:w-full flex-shrink-0 p-6 bg-[#0B1126] text-left rounded-xl hover:shadow-lg transition"
                                >
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="text-white w-12 h-12 mb-4"
                                    />
                                    <h3 className="text-[18px] leading-8 lg:text-[24px] lg:font-bold lg:leading-9 font-semibold mb-2 text-white">{feature.title}</h3>
                                    <p className="text-[#D6D7E1] md:text-[16px] md:leading-[28px] text-base font-normal leading-6">{feature.content}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.nav
                            variants={zoomIn(0.5)}
                            initial="initial"
                            whileInView="animate"
                            className="flex mt-16 justify-center"                >
                            <Link
                                to={"/loader"}
                                className="card py-2 px-3 font-medium transition-all duration-300 flex items-center text-white 
                            gap-2 bg-[#072C3B] hover:bg-[#072C3B]/80"
                            >
                                Apply to be a Musosoup curator
                            </Link>
                        </motion.nav>
                    </div>
                </div>
            </section>

            {/* WORKFLOW */}
            <section className="bg-gray-50 md:px-24 px-1 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 text items-center md:mb-16 max-w-screen-2xl mx-auto">
                    {/* Image Container - Order 2 on mobile */}
                    <div className="relative md:ml-0 md:order-none order-2">
                        {/* Background blur */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[462px] md:h-[402px] 
                            w-[327px] h-[204px] rounded-xl"
                            style={{
                                background: '#F4ECDE',
                                filter: 'blur(120px)',
                                zIndex: -0
                            }}
                        />
                        {/* Image */}
                        <div className="w-[327px] h-[284px] md:w-[462px] md:h-[402px] md:ml-0 ml-auto" style={{ transform: 'scaleX(-1)' }}>
                            <motion.img
                                variants={slideIn("left", 0.5)}
                                initial="initial"
                                whileInView="animate"
                                src={CardImage}
                                alt="Workflow"
                                className="rounded-xl w-full h-full mx-auto"
                                style={{
                                    imageRendering: 'crisp-edges',
                                    filter: 'none',
                                }}
                            />
                        </div>
                    </div>

                    {/* Text Container - Order 1 on mobile */}
                    <div className="max-w-4xl mx-auto text-left  md:order-none order-1">
                        <h2 className="md:text-[48px] md:leading-[60px] text-[32px] leading-[44px] tracking-[-1px] text-primary font-bold mb-4">Say goodbye to your inbox</h2>
                        <p className="mb-6 text-[16px] leading-[28px] text-[#373843]">
                            Overloaded with emails and submission deadlines? Struggling to keep track of
                            who you’ve contacted and what jobs need completing? Need more oversight on
                            your acceptance rates and earnings? Sounds like Musosoup is the music curation
                            platform for you...
                        </p>
                        <ul className="space-y-4 mt-6">
                            {listItems.map((item, index) => (
                                <li key={index} className="flex items-center text-[16px] leading-[28px] text-[#373843]">
                                    <span className="mr-3 text-xl shrink-0">
                                        <img
                                            src={BoltIcon}
                                            className="w-12 h-12"
                                            alt="Bolt icon"
                                        />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* SUSTAINABILITY */}
            <section className="md:px-24 px-1 md:py-28 py-16 mx-auto bg-[#0a0f24]">
                <h1 className="font-poppins text-[32px] font-bold leading-[44px] tracking-[-1px] lg:text-[48px] lg:font-bold 
                lg:leading-[60px] lg:tracking-[-1px] text-white text-center px-2 mb-4">A sustainable approach to music journalism</h1>
                <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 overflow-y-hidden md:gap-8 px-4 max-w-screen-2xl mx-auto">
                    {sustainabilityData.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn("up", index)}
                            initial="initial"
                            whileInView="animate"
                            className="w-5/6 flex-shrink-0 md:w-auto p-6 rounded-xl shadow hover:shadow-lg transition"
                            style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))' }}
                        >
                            <img
                                src={item.icon}
                                alt={item.title}
                                className="w-12 h-12 mb-4"
                            />
                            <h3 className="md:text-[24px] md:leading-[36px] text-[18px] leading-8 text-white font-bold mb-2">{item.title}</h3>
                            <p className="text-[#D6D7E1] text-left text-[16px] leading-[28px]">{item.content}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.nav
                    variants={zoomIn(0.5)}
                    initial="initial"
                    whileInView="animate"
                    className="flex mt-16 justify-center"                >
                    <Link
                        to={"/loader"}
                        className="card py-2 px-3 text-[16px] leading-[24px] font-medium transition-all duration-300 flex items-center text-[#1D4A5D] 
                        gap-2 bg-white hover:bg-blue-200/80"
                    >
                        Apply to be a Musosoup curator
                    </Link>
                </motion.nav>
            </section>

            {/* MARKETPLACE */}
            <section className="bg-gray-50 md:px-24 px-1 md:py-28 py-16 text-center overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-screen-2xl mx-auto">
                    <div className="md:ml-4">
                        <h2 className="md:text-[48px] md:leading-[60px] text-[32px] leading-[44px] tracking-[-1px] md:px-0 px-4 font-bold mb-4 
                        text-left text-[#072C3B]">Introducing the Musosoup Marketplace</h2>
                        <p className="text-left mx-auto px-4 md:px-0 text-[16px] leading-[28px] text-[#373843]">
                            To complement our unique Offers system, artists can now apply for promotions
                            from curators in the Marketplace. It’s quick and easy to add a listing, review
                            applications and manage workflow, so join us now, create your first Marketplace
                            promotion, and start discovering and connecting with artists.
                        </p>
                    </div>
                    <div className="relative md:h-[592px] h-[264px]">
                        <motion.img
                            loading="lazy"
                            variants={slideIn("left", 0.5)}
                            initial="initial"
                            whileInView="animate"
                            src={LaptopImage}
                            alt="Workflow"
                            className="w-[464px] h-[264px] md:w-[980px] md:h-[592px] lg:absolute max-w-none"
                            style={{ color: 'transparent' }}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="md:px-24 px-1 md:py-16 mx-auto bg-blue-50 relative overflow-hidden">
                <div className="max-w-screen-2xl mx-auto">
                    <div
                        className="absolute top-0 left-0 w-[462px] h-[402px] rounded-full"
                        style={{
                            background: '#F4ECDE',
                            filter: 'blur(120px)',
                        }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:pb-0 pb-16 mt-16 relative z-10">

                        <div className="md:pr-20">
                            <h1 className="md:text-[48px] md:leading-[60px] text-[32px] font-bold leading-[44px] tracking-[-1px]
                            mb-8 text-left text-[#072C3B]">Curators’ FAQs</h1>
                            <h2 className="text-[#373843] text-[16px] leading-[28px]">Can&apos;t find an answer to your question? Feel free to contact us, we&apos;ll help you asap.</h2>
                        </div>
                        <div className="space-y-4">
                            {faqData.map((item, index) => {
                                const isOpen = openFaqIndex === index;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={fadeIn("up", index / 2)}
                                        initial="initial"
                                        whileInView="animate"
                                        className={`bg-white text-[#1D4A5D] text-[16px] leading-[28px] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border ${isOpen ? 'border-orange-400' : 'border-transparent'}`}
                                        onClick={() => handleFaqToggle(index)}
                                    >
                                        <div className="p-4 flex justify-between items-center cursor-pointer">
                                            <span className="font-bold pr-4">{item.q}</span>
                                            <span className={`text-lg ${isOpen ? 'text-orange-400' : 'text-[#1D4A5D]'}`}>
                                                {isOpen ? <FaMinus /> : <FaPlus />}
                                            </span>
                                        </div>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-4 pb-4"
                                            >
                                                <p className="text-gray-600">{item.a}</p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative text-white text-center md:py-32 py-12 md:px-24 px-1 overflow-hidden">
                <img
                    src={FootImage}
                    alt="cta-background"
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                    loading="lazy"
                />
                <div className="relative z-10 max-w-screen-2xl mx-auto">
                    <h2 className="md:text-[40px] md:leading-[52px] text-[32px] leading-[44px] tracking-[-1px]
                     font-bold mb-6">
                        Join the hundreds of curators on Musosoup sustainably promoting grassroots music.
                    </h2>
                    <motion.nav
                        variants={zoomIn(0.5)}
                        initial="initial"
                        whileInView="animate"
                        className="flex mt-16 justify-center"
                    >
                        <Link
                            to={"/loader"}
                            className="card py-2 px-5 font-medium text-xl transition-all duration-300 flex items-center
                             text-[#1D4A5D] gap-2 bg-white md:text-[16px] leading-[24px] hover:bg-blue-100"
                        >
                            Join Us
                        </Link>
                    </motion.nav>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-50 text-[#072C3B] text-center py-6 text-sm max-w-screen-2xl mx-auto">
                © {new Date().getFullYear()} Musosoup. All Rights Reserved.
            </footer>
        </div>
    );
};

export default Landing;
