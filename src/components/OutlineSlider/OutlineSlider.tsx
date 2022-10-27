import "./styless.css";
import Demo from "./Slider";
import {useElectionEventQuery} from "hooks/query";
import {useGetElectionById} from "hooks/query/useGetElectionById";
import {useLocation} from "react-router-dom";
import {useElectionContext} from "context/ElectionContext";

const OutlineSlider = () => {
    const {state} = useLocation();
    const {electionId} = useElectionContext();
    const getElectionByID = useGetElectionById(electionId, !!electionId);
    const startDay = new Date(getElectionByID?.data?.starting_day).getTime();
    const votingDay = new Date(getElectionByID?.data?.voting_day).getTime();
    const today = Math.round((new Date().getTime() - startDay) * 100 / (votingDay - startDay))
    const getElectionEvents = useElectionEventQuery();

    const eventData = getElectionEvents?.data?.map(({
                                                        title,
                                                        time,
                                                        is_deleted
                                                    }: { time: string, title: string, is_deleted: boolean }) => {
        let timeInTimeStamp = new Date(time?.split(" ")?.[0]).getTime();
        if (!is_deleted) {
            return {
                label: title,
                value: Math.round((timeInTimeStamp - startDay) * 100 / (votingDay - startDay))
            }
        }
        return null;
    })

    const eventDateList = [
        {
            label: "Start",
            value: 0,
        },
        {
            label: "Today",
            value: today
        },
        {
            label: "Voting day",
            value: 100
        }
    ]


    return (
        <div className="outline__wrapper">
            <div className="outline__disable"></div>
            {/*<ul className="outline__top-ul">*/}
            {/*    <h3 className="outline__start">Start</h3>*/}
            {/*    <li>Meeting with thr President of Nourth Korea</li>*/}
            {/*    <li>Meeting with thr President of Nourth Korea</li>*/}
            {/*    <li className="outline__today">Today</li>*/}
            {/*    <li>Meeting with thr President of Nourth Korea</li>*/}
            {/*    <li className="outline__voting">Voting Day</li>*/}
            {/*</ul>*/}
            {eventData &&
                <Demo data={eventDateList.concat(eventData?.filter((item: any) => item !== null))} today={today}/>}
            {/*<ul className="outline__bottom-ul">*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*    <li>19.03.2022</li>*/}
            {/*</ul>*/}
        </div>
    );
};

export default OutlineSlider;
