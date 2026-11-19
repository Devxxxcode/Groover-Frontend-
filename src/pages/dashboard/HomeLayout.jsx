import { Outlet } from "react-router-dom";
import SideBarWeb from "./components/SideBarWeb";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { landing, home, profile as profileRoute } from "../../constants/app.routes";
import profilep from "../../assets/profile-pic.jpg"
import { useSelector, useDispatch } from "react-redux";
import BonusPrompt from "./components/BonusPrompt";
import { fetchProfileSuccess } from "../../app/slice/profile.slice";
import authService from "../../app/service/auth.service";
import { useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";

const HomeLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.user);

    // Pages opened directly (refresh, shared link) have no profile yet:
    // load it here so the header shows the user's name on every page.
    useEffect(() => {
        if (!profile) {
            authService.fetchProfile().then((res) => {
                if (res.success) dispatch(fetchProfileSuccess(res.data));
            });
        }
    }, [dispatch, profile]);

    return (
        <div className="flex bg-white h-screen">
            <BonusPrompt onProfileRefresh={(data) => dispatch(fetchProfileSuccess(data))} />
            <SideBarWeb />
            <div className="flex flex-col w-full h-full">
                <div className="nav-bar flex items-center md:hidden justify-between h-16 bg-white shadow px-4 md:mx-4">
                    <div className="flex items-center">
                        <img
                            src={logo}
                            onClick={() => navigate(landing)}
                            alt="Logo"
                            className="w-24 h-auto block md:hidden"
                        />
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-primary">
                        <a href={`${home}/${profileRoute}`} className="flex">
                            <span className="text-lg font-medium">{profile?.first_name || ""}</span>
                            {profile?.profile_picture ? (<img
                                src={profile?.profile_picture || profilep}
                                alt="Profile"
                                className="w-6 h-6 ml-2 rounded-full object-cover"
                            />) :
                                (<BiUserCircle className="text-3xl md:mr-6 mr-2" />
                                )}
                        </a>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto -webkit-overflow-scrolling: touch md:p-4 ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
