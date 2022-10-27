import "./styless.css";
import {FC} from "react";
import UsersItem from "./UsersItem";
import {Avatar} from "@mantine/core";
import {Accordion} from "@mantine/core";
import Logo from "assets/images/logoblack.svg";
import Logout from "../../../assets/images/log-out.svg";
import {useUserContext} from "context/UserContext";
import {removeCookie} from "../../../utils/cookie";

type ProfileSideBarProps = {
    setView?: any;
    setOnChangeMail: any;
    setUserId: any;
    electionList: any;
};

const ProfileSideBarComponent: FC<ProfileSideBarProps> = ({
                                                              setView,
                                                              setOnChangeMail,
                                                              setUserId,
                                                              electionList,
                                                          }) => {
    const {mainUsers} = useUserContext();

    const handleLogout = () => {
        removeCookie("token");
        removeCookie("user");
        window.location.reload();
    }

    return (
        <section className="sidebar__wrapper">
            <Accordion>
                <div className="Profile__sidebar-left">
                    <div className="logo">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <div className="scrdiv">
                        {mainUsers.map((mainUser: any, index: number) => (
                            <UsersItem
                                key={index}
                                setView={setView}
                                mainUser={mainUser}
                                setOnChangeMail={setOnChangeMail}
                                setUserId={setUserId}
                                electionList={electionList}
                            />
                        ))}
                    </div>
                    <div className="sidebar__lang">
                        <p>Language</p>
                        <p>Trash</p>
                    </div>
                    <div onClick={handleLogout} className="logout">
                        <img src={Logout} alt="logut"/>
                        logout
                    </div>
                </div>
            </Accordion>
        </section>
    );
};

export default ProfileSideBarComponent;
