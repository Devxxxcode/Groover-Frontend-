import { GoArrowLeft } from "react-icons/go";
import certImage from "../../assets/cert.jpg";

const Certificate = () => {
    return (
        <div className="w-full md:2 mb-52 h-screen flex flex-col">
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

            {/* Certificate Image */}
            <div className="flex-grow flex justify-center items-center">
                <img
                    src={certImage}
                    alt="Certificate of Incorporation"
                    className="w-full h-[full] object-contain"
                />
            </div>
        </div>
    );
};

export default Certificate;
