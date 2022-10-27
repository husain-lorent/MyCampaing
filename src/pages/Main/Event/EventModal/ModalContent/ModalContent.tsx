import "./style.css";
import {useEffect, useState} from "react";
import ModaAddGuest from "./ModalAdd/ModaAddGuest";
import ModalContentItem from "./ModalContentItem/ModalContentItem";
import {useGetEventGuests, useGetTeamQuery} from "hooks/query";
import {useLocation, useSearchParams} from "react-router-dom";
import {useGetEventById} from "hooks/query/useGetEventById";
import qs from "qs"
// import Button from "components/Button/Button";


const ModalContent = () => {
    const [opened, setOpened] = useState(false);
    const {search} = useLocation();
    const {election_id} = qs.parse(search, {ignoreQueryPrefix: true});
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const eventById = useGetEventById(Number(id));
    const eventData = eventById?.data;
    const date = new Date(eventData?.time);
    const eventDate = eventData?.time?.split(" ")?.[0];
    const time = `${date.getHours()}:${date?.getMinutes()}`


    const guestsList = useGetEventGuests({page: 1, event: 1});
    const teamList = useGetTeamQuery({page: 1, election: 1});

    useEffect(() => {
        guestsList.refetch();
    }, [opened])

    return (
        <div className="modalcontent__wrapper">
            <div className="modalcontent__top">
                <h2>{eventData?.title}</h2>
                <div className="modalcontent__locdate">
                    <div className="modalcontent__date">
                        <p>
                            <span>{time}</span>
                        </p>
                        <p>{eventDate}</p>
                    </div>

                    <div className="modalcontent__adress">
                        <p>{eventData?.address}</p>
                    </div>
                </div>
            </div>
            {eventData?.text && <hr className="hr"/>}
            {eventData?.text && <div className="modalcontent__info">
                <p>{eventData?.text}</p>
            </div>}
            <div className="modalcontent__info-item">
                <ModalContentItem
                    item={guestsList}
                    title={"Guests List"}
                    opened={opened}
                    setOpened={setOpened}
                />
                <ModalContentItem
                    item={guestsList}
                    title={"Team List"}
                    opened={opened}
                    setOpened={setOpened}
                />
            </div>
            <ModaAddGuest opened={opened} setOpened={setOpened}/>
        </div>
    );
};

export default ModalContent;
