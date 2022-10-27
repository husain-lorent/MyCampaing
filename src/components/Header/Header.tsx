import "./style.css";
import Logo from "assets/images/logo.svg";
import {useGetElectionQuery} from "hooks/query";
import LogoBlack from "assets/images/logoblack.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import DropdonHeader from "./Dropdown/DropdonHeader";
import HokageDropdown from "./HokageDropdown/HokageDropdown";
import ProfileComponent from "components/Profile/ProfileComponent";
import {useUserContext} from "context/UserContext";
import {getCookie} from "utils/cookie";

function Header() {
    const [open, setOpen] = useState(false);
    const [hokageOpen, setHokageOpen] = useState(false);
    const isAuth = !!getCookie("token")
    const location = useLocation();
    const path = location.pathname === "/";
    const authLogin = location.pathname == "/hero";
    let menuRef: any = useRef();
    const {mainUser, electionMain} = useUserContext();
    const electionList = useGetElectionQuery({page: 1, enabled: isAuth});
    useEffect(() => {
        let handler = (e: any) => {
            if (!menuRef?.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            if (hokageOpen) {
                setHokageOpen(false);
            }
        };
    });
    useEffect(() => {
        let handlerkokage = (e: any) => {
            if (!menuRef.current.contains(e.target)) {
                setHokageOpen(false);
            }
        };

        document.addEventListener("mousedown", handlerkokage);
        return () => {
            document.removeEventListener("mousedown", handlerkokage);
            if (open) {
                setOpen(false);
            }
        };
    }, []);


    return (
        <>
            <div
                className="header"
                style={{backgroundColor: path ? "#F5F5F5" : "#313131"}}
            >
                <div className="header__wrapper">
                    <div className="logo">
                        <Link to={"/"}>
                            {path ? <img src={LogoBlack} alt="My Campaign"/> : <img src={Logo} alt="My Campaign"/>}
                        </Link>
                    </div>
                    {path || authLogin ? (
                        <>
                            <div className="right__menu" ref={menuRef}>
                                <div className="menu-trigger">
                                    <div
                                        className="div"
                                        onClick={() => {
                                            setHokageOpen(!hokageOpen);
                                        }}
                                    >
                                        <h3 style={{color: path ? "#313131" : "#fff"}}>
                                            {electionMain ? electionMain : "No Election"}
                                        </h3>
                                    </div>
                                    <div style={{color: path ? "#313131" : "#fff"}}>|</div>
                                    <p style={{color: path ? "#313131" : "#fff"}}>
                                        {mainUser?.first_name} <br/> {mainUser?.last_name}
                                    </p>
                                    <img
                                        onClick={() => {
                                            setOpen(!open);
                                        }}
                                        className="header__avatar"
                                        src={
                                            mainUser.image
                                                ? mainUser.image
                                                : `https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg`
                                        }
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
                                <DropdonHeader/>
                            </div>
                        </>
                    ) : null}

                    <div
                        className={`hokage__dropdown ${
                            hokageOpen ? "hokage__active" : "hokage__inactive"
                        }`}
                    >
                        <HokageDropdown list={electionList.data?.results}/>
                    </div>
                </div>
            </div>
            <ProfileComponent/>
        </>
    );
}

export default Header;
