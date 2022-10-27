import "./style.css";
import React, {useState} from "react";
import {useForm} from "@mantine/form";
import {Button, TextInput, Grid} from "@mantine/core";
import {useCreateVoterMutation} from "hooks/mutation";
import {useAddVoterContext} from "context/AddVoterContext";
import closeIcon from "assets/images/closeicon.svg";
import {useLocation} from "react-router-dom";
import {useElectionContext} from "context/ElectionContext";

type VoterSocMediaProps = {
    setOpenGrid: boolean | any;
};
const VoterSocMedia: React.FC<VoterSocMediaProps> = ({setOpenGrid}) => {
    const [statusState, setStatusState] = useState("vip");
    const useCreateVoter = useCreateVoterMutation();
    const {electionId} = useElectionContext();
    const formData = new FormData();
    const voterStatus = [
        {
            title: "Vip",
            params: "vip",
        },
        {
            title: "Gold",
            params: "gold",
        },
        {
            title: "Bronze",
            params: "bronze",
        },
        {
            title: "Silver",
            params: "silver",
        },
    ];
    const {image, first_name, last_name, organization, phone_number} = useAddVoterContext();

    const form = useForm({
        initialValues: {
            telegram: "",
            whatsapp: "",
            facebook: "",
            email: "",
            firstname: first_name,
            lastname: last_name,
            phone: phone_number,
            organization: organization,
        },
        validate: {
            phone: (value) =>
                value.length < 2 ? "Phone must have at least letters" : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        },
    });

    const createVoter = (e: any) => {
        formData.append("phone_number", phone_number)
        formData.append("telegram", e.telegram)
        formData.append("facebook", e.facebook)
        formData.append("whatsapp", e.whatsapp)
        formData.append("email", e.email)
        formData.append("first_name", first_name)
        formData.append("last_name", last_name)
        formData.append("organization", organization)
        formData.append("status", statusState)
        formData.append("election", electionId)
        formData.append("invite_people", "0")
        formData.append("image", image)

        const createVoter = useCreateVoter.mutateAsync(formData);
        createVoter
            .then((res) => {
                setOpenGrid("");
            })

            .catch((err) => {
                console.log(err, "err");
            });
    };

    return (
        <div className="votersoc__wrapper">
            <div className="votersoc__top">
                <h2>Add voter</h2>
                <img onClick={setOpenGrid} src={closeIcon} alt="Close"/>
            </div>
            <div className="votersoc__form">
                <p>Social media</p>
                <form onSubmit={form.onSubmit(createVoter)}>
                    <Grid gutter="sm">
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Telegram"
                                {...form.getInputProps("telegram")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Whatsapp"
                                {...form.getInputProps("whatsapp")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Facebook"
                                {...form.getInputProps("facebook")}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                type="email"
                                placeholder="Email adress"
                                {...form.getInputProps("email")}
                            />
                        </Grid.Col>
                    </Grid>
                    <div className="votersoc__choose-status">
                        <h3>Choose status</h3>
                        <div>
                            {voterStatus.map((status, index: number) => (
                                <button key={index}
                                        type="button"
                                        onClick={() => setStatusState(status.params)}
                                        className={`${
                                            status.params == statusState ? "active" : null
                                        }`}
                                >
                                    {status.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="votersoc__btn-Save">
                        <Button loading={useCreateVoter?.isLoading} type="submit">Save</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VoterSocMedia;
