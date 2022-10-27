import {Input, Modal} from "@mantine/core";
import React, {FormEvent, useState} from "react";
import {ReactComponent as SearchIcon} from "assets/images/search.svg";
import closeIcon from "assets/images/closeicon.svg";
import "./style.css";
import ModalAddItem from "./ModalAddItem";
import Button from "components/Button";
import {useVotersQuery} from "hooks/query";
import {useElectionGuestCreate} from "hooks/mutation/useElectionGuestCreate";
import {useLocation} from "react-router-dom";
import toast from "react-hot-toast";

type ModaladdGProps = {
    item?: any;
    opened: boolean;
    setOpened?: any;
};

const ModaAddGuest: React.FC<ModaladdGProps> = ({opened, setOpened}) => {
    const votersList = useVotersQuery({});
    const {state} = useLocation();
    const [guests, setGuests] = useState([]);
    const useElectionGuests = useElectionGuestCreate();

    const handleAddEventGuest = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            event_id: state.event_id,
            guests
        }

        const electionGuests = useElectionGuests.mutateAsync(data);
        electionGuests.then((res) => {
            toast.success("Guest successfully added");
            setOpened(false);
        }).catch((err) => {
            toast.error("Please check fields");
        })
    }

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)}>
                <div className="modaladd__wrapper">
                    <div className="modaladd__top">
                        <h2>Add Guest</h2>
                        <div>
                            <img src={closeIcon} onClick={() => setOpened(false)}/>
                        </div>
                    </div>
                    <div className="modaladd__form">
                        <div className="modaladd_form-input">
                            <Input
                                icon={<SearchIcon/>}
                                variant="filled"
                                placeholder="Search"
                                radius="lg"
                            />
                        </div>
                        <Button className="modaladd_btn-add" onClick={handleAddEventGuest}>Add</Button>
                    </div>
                    <div className="modaladd__users">
                        {votersList?.data?.results?.map((item: any, index: number) => {
                            return <ModalAddItem setGuests={setGuests} guests={guests}
                                                 item={item} key={index}/>;
                        })}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModaAddGuest;
