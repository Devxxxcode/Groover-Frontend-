import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const NotFound = () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <img src={logo} alt="Groover" className="mb-8 h-10 w-auto" />
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-3 text-2xl font-bold text-gray-800">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-gray-500">
            The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex gap-3">
            <Link to="/" className="rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
                Home
            </Link>
            <Link to="/app" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                Go to dashboard
            </Link>
        </div>
    </div>
);

export default NotFound;
