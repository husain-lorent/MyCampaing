import { Button, FileButton, Grid, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import closeIcon from "../../../../../../../assets/images/closeicon.svg";
import "./style.css";

type UpdateSponsor = {
  setOpenUpdate: React.Dispatch<React.SetStateAction<string>>;
};

const UpdateSponsor: React.FC<UpdateSponsor> = ({ setOpenUpdate }) => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm({
    initialValues: {
      telegram: "",
      whatsapp: "",
      facebook: "",
      email: "",
      organization: "",
    },

    validate: {
      organization: (value) =>
        value.length < 2 ? "Email adress must have at least  letters" : null,
      telegram: (value) =>
        value.length < 2 ? "Telegram must have at least letters" : null,
      whatsapp: (value) =>
        value.length < 2 ? "WhatsApp must have at least  letters" : null,
      facebook: (value) =>
        value.length < 2 ? "Facebook must have at least letters" : null,
      email: (value) =>
        value.length < 2 ? "Email adress must have at least  letters" : null,
    },
  });

  return (
    <div className="updatespon__wrapper">
      <div className="updatespon__top">
        <div>
          <h2>The olives</h2>
          <div className="updatespon__photo">
            <p>Photo</p>
            <div className="updatespon__download-img">
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
        </div>
        <div className="updatespon__closeicon">
          <img
            onClick={() => setOpenUpdate("sponsoritem")}
            src={closeIcon}
            alt="closeIcon"
          />
        </div>
      </div>
      <div className="updatesponsoc__form">
        <form
          onSubmit={form.onSubmit(console.log)}
          className="updatesponsoc__form-control"
        >
          <p>Social media</p>
          <Grid gutter="sm">
            <Grid.Col span={6}>
              <TextInput
                placeholder="Telegram"
                {...form.getInputProps("telegram")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                placeholder="WhatsApp"
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
                placeholder="Your email"
                {...form.getInputProps("email")}
              />
            </Grid.Col>
          </Grid>

          <div className="updatespon__btn-Save">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSponsor;
