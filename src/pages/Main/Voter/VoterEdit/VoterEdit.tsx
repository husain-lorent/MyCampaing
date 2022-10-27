import "./style.css";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { useEditVoterMutation } from "hooks/mutation";
import { FileButton, Button, TextInput } from "@mantine/core";
import closeIcon from "../../../../assets/images/closeicon.svg";

type VoterEditProps = {
  setOpenGrid: boolean | any;
};
const VoterEdit: React.FC<VoterEditProps> = ({ setOpenGrid }) => {
  const [file, setFile] = useState<File | null>(null);
  const useEditVoter = useEditVoterMutation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { firstname: "", lastname: "", organization: "", phone: "" },
    validate: {
      firstname: (value) =>
        value.length < 2 ? "First name must have at least 2 letters" : null,
      lastname: (value) =>
        value.length < 2 ? "Last name must have at least 2 letters" : null,

      organization: (value) =>
        value.length < 2 ? " have at least 2 letters" : null,
      phone: (value) =>
        value.length < 2 ? "Phone must have at least 2 letters" : null,
    },
  });

  const sendEditVoter = (e: any) => {
    const editVoter = useEditVoter.mutateAsync(e);
    editVoter
      .then((res) => {
        setOpenGrid("");
      })

      .catch((err) => {
        console.log(err, "err");
      });

    setOpenGrid("addvoter-socmedia");
  };

  return (
    <div className="votteredit__wrapper">
      <div className="voteredit__top">
        <h2> Myra Foster</h2>
        <img onClick={setOpenGrid} src={closeIcon} alt="Close" />
      </div>
      <div className="voteredit__info">
        <div className="voteradd__photo">
          <p>Photo</p>
          <div className="voteredit__download-img">
            <FileButton onChange={setFile} accept="">
              {(props) => <Button {...props}>Choose photo</Button>}
            </FileButton>
            {/* /* props src={file}* / */}
            <img
              src="https://media.wired.com/photos/593332c2d80dd005b42b15d7/master/w_2560%2Cc_limit/42-21094770.jpg"
              alt="voter-photo"
            />
          </div>
        </div>
        <div className="voteredit__form">
          <form onSubmit={form.onSubmit(sendEditVoter)}>
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
              type="number"
              placeholder="Your phone"
              label="Phone"
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Organization"
              placeholder="Organization"
              {...form.getInputProps("organization")}
            />
            <div className="voteredit__btn-next">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoterEdit;
