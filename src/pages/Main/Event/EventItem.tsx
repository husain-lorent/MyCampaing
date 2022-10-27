import React, {SetStateAction, useState} from "react";

import "./style.css";
import {FC} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDeleteEventMutation} from "../../../hooks/mutation/useDeleteEventMutation";
import toast from "react-hot-toast";

type EventItemProps = {
    item?: any;
    opened?: boolean | number;
    setOpened?: any;
    lastResultElementRef?: any;
    setRefetch: SetStateAction<any>
    setPageNumber: SetStateAction<any>
};

const EventItem: FC<EventItemProps> = ({item, opened, setOpened, setRefetch, setPageNumber, lastResultElementRef}) => {
    const {pathname, state} = useLocation();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(item?.is_deleted);
    const EventDeleteMutation = useDeleteEventMutation();

    const handleClickEvent = (data: any) => {
        setOpened(data?.id)
        navigate(pathname, {
            state: {...state, event_id: data?.id}
        })
    }

    const handleChange = (e: any, id: number) => {
        const deleteEvent = EventDeleteMutation.mutateAsync({id: [id]})
        deleteEvent.then(() => {
            toast.success("Event deleted successfully");
            setRefetch((prevState: boolean) => !prevState);
            setPageNumber((prevState: number) => prevState === 1 ? prevState : prevState - 1)
        }).catch((err) => {
            toast.error(err?.message)
        })
        if (!checked) {
            return setChecked(e?.target?.checked);
        }
        setChecked(!checked);
    };

    return (
        <div className="item__wrapper" ref={lastResultElementRef}>
            <div className="list__item">
                <div className="item__checkbox-title">
                    <input
                        onChange={(e) => handleChange(e, item?.id)}
                        type="checkbox"
                        checked={item?.is_deleted}
                        // value={checked}
                        className="event__checkbox"
                    />

                    <h3
                        onClick={() => handleClickEvent(item)}
                        className={`${checked ? "line" : ""}`}
                    >
                        {item?.title}
                    </h3>
                </div>
                <p className={`${checked ? "line" : ""}`}>{item?.time?.split(" ")[0]}</p>
            </div>
        </div>
    );
};

export default EventItem;
