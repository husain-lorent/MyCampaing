import "./style.css";
import React, {useState} from "react";
import {useForm} from "@mantine/form";
import closeIcon from "assets/images/closeicon.svg";
import {FileButton, Button, TextInput} from "@mantine/core";
import {useAddVoterContext} from "context/AddVoterContext";
import {getBase64File} from "utils/general";

type VoterAddProps = {
    setOpenGrid: boolean | any;
};

const VoterAdd: React.FC<VoterAddProps> = ({setOpenGrid}) => {
    const [file, setFile] = useState<string>("");
    const [formImg, setFormImg] = useState<any>();
    const {
        setFirst_name,
        setLast_name,
        setOrganization,
        setPhone_number,
        setImage,
    } = useAddVoterContext();

    const onFileChange = (file: any) => {
        setFormImg(file)
        getBase64File(file).then((res) => {
            setFile(res)
        })
    }

    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            firstname: "",
            lastname: "",
            phone: "",
            organization: "",
        },

        validate: {
            firstname: (value) =>
                value.length < 2 ? "First name must have at least 2 letters" : null,
            lastname: (value) =>
                value.length < 2 ? "Last name must have at least 2 letters" : null,
            organization: (value) =>
                value.length < 2 ? "Last name must have at least 2 letter" : null,
            phone: (value) =>
                value.length < 2 ? "Phone must have at least 2 letters" : null,
        },
    });

    const nextStep = (e: any) => {
        setImage(formImg);
        setFirst_name(e.firstname);
        setLast_name(e.lastname);
        setOrganization(e.organization);
        setPhone_number(e.phone);
        setOpenGrid("addvoter-socmedia");
    };

    return (
        <div className="votteradd__wrapper">
            <div className="voteradd__top">
                <h2>Add voter</h2>
                <img onClick={setOpenGrid} src={closeIcon} alt="Close"/>
            </div>
            <div className="voteradd__info">
                <div className="voteradd__photo">
                    <p>Photo</p>
                    <div className="voteradd__download-img">
                        <FileButton onChange={onFileChange} accept="">
                            {(props) => <Button {...props}>Choose photo</Button>}
                        </FileButton>
                        {/* /* props src={file}* / */}
                        {file &&
                            <img
                                src={file}
                                alt="voter-photo"
                            />
                        }
                    </div>
                </div>
                <div className="voteradd__form">
                    <form onSubmit={form.onSubmit(nextStep)}>
                        <TextInput
                            label="First name"
                            placeholder="First name"
                            {...form.getInputProps("firstname")}
                        />
                        <TextInput
                            label="Last name"
                            placeholder="Last name"
                            {...form.getInputProps("lastname")}
                        />
                        <TextInput
                            label="Phone number"
                            placeholder="+998900028833"
                            {...form.getInputProps("phone")}
                        />
                        <TextInput
                            placeholder="Organization"
                            label="Organization"
                            {...form.getInputProps("organization")}
                        />
                        <div className="voteradd__btn-next">
                            <Button type="submit">Next</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VoterAdd;
