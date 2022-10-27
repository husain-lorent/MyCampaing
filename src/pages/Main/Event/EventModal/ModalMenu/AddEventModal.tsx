import {Modal, TextInput, Button} from "@mantine/core";
import {useForm} from "@mantine/form";
import "./style.css";
import closeIcon from "assets/images/closeicon.svg";
import React from "react";
import {useElectionEventCreate} from "hooks/mutation/useElectionEventCreate";
import {DatePicker, TimeInput} from "@mantine/dates";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import {useElectionContext} from "context/ElectionContext";

type addEventProps = {
    opened: boolean;
    setOpened?: any;
};
const AddEventModal: React.FC<addEventProps> = ({opened, setOpened}) => {
    const form = useForm();
    const {electionId} = useElectionContext()

    const eventCreateMutation = useElectionEventCreate();
    const handleAddEvent = (values: any) => {
        const data = {
            time: `${dayjs(values.date).format('DD/MM/YY')} ${values?.time?.getHours()}:${values?.time?.getMinutes()}:${values?.time?.getSeconds()}`,
            election: electionId,
            address: values?.address,
            title: values?.title
        }
        const createEvent = eventCreateMutation.mutateAsync(data);
        createEvent.then((res) => {
            setOpened(false);
            toast.success("Event successfully created")
        }).catch((err) => {
            toast.error("Something went wrong!")
        })
    }


    return (
        <div className="addeventmodal">
            <Modal opened={opened} onClose={() => setOpened(false)}>
                <div className="addeventmodal__wrapper">
                    <div className="addeventmodal__top">
                        <h2>Add Event</h2>
                        <div>
                            <img src={closeIcon} onClick={() => setOpened(false)}/>
                        </div>
                    </div>
                    <form onSubmit={form.onSubmit(handleAddEvent)}>
                        <TextInput
                            variant="filled"
                            label="Event Name"
                            placeholder="Type your Event Name"
                            value={form?.values?.title}
                            {...form.getInputProps("title")}
                        />
                        <div className="d-flex justify-start">
                            <DatePicker
                                variant="filled"
                                placeholder="Pick date"
                                style={{marginRight: 10}}
                                label="Event date"
                                withAsterisk
                                value={form?.values?.date}
                                {...form.getInputProps("date")}
                            />
                            <TimeInput
                                // defaultValue={new Date()}
                                label="Event time"
                                withAsterisk
                                value={form?.values?.time}
                                {...form.getInputProps("time")}
                            />
                        </div>
                        <TextInput
                            variant="filled"
                            mt="sm"
                            label="Location"
                            placeholder="Type your Location"
                            value={form?.values?.address}
                            {...form.getInputProps("address")}
                        />

                        <div className="addeventmodal_btn">
                            <Button type="submit" mt="sm">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AddEventModal;
