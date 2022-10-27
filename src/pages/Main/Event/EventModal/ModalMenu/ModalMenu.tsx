import "./style.css";
import logo from "assets/images/logoblack.svg";
import {useEffect, useState} from "react";
import ModalItem from "./ModalItem";
import AddEventModal from "./AddEventModal";
import {useElectionEventQuery} from "hooks/query/useElectionEventQuery";
import {createSearchParams, useLocation, useNavigate} from "react-router-dom";


const ModalMenu = () => {
    const [opened, setOpened] = useState(false);
    const electionEvent = useElectionEventQuery();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        navigate({
            pathname,
            search: createSearchParams({
                id: electionEvent?.data?.[0]?.id?.toString()
            }).toString()
        })
    }, [electionEvent.isSuccess])

    useEffect(() => {
        electionEvent.refetch()
    }, [opened]);


    return (
        <div className="modalmenu__wrapper">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
            <div className="event__modal-item">
                {electionEvent?.data?.map((item: any, index: number) => {
                    return <ModalItem item={item} key={index}/>;
                })}
            </div>
            <div className="event__modal-btn">
                <button onClick={() => setOpened(true)}>
                    <span>+</span> Add event
                </button>
            </div>
            <AddEventModal opened={opened} setOpened={setOpened}/>
        </div>
    );
};

export default ModalMenu;
