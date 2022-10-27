import React from 'react'
import "./style.css";
import closeIcon from "../../../../../assets/images/closeicon.svg";
import { useForm } from "@mantine/form";
import { Button, TextInput, Grid } from "@mantine/core";

type EditSocmediaProps = {
  setOpenGrid : boolean | any
}

const EditSocmedia:React.FC<EditSocmediaProps> = ({setOpenGrid}) => {
  const form = useForm({
    initialValues: { telegram: "", whatsapp: "", facebook: "", email: "" },
    // functions will be used to validate values at corresponding key
    validate: {
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
    <div className="votereditsoc__wrapper">
      <div className="votereditsoc__top">
        <h2>Myra Foster</h2>
        <img onClick={setOpenGrid} src={closeIcon} alt="Close" />
      </div>
      <div className="votereditsoc__form">
        <p>Social media</p>
        <form onSubmit={form.onSubmit(console.log)}>
          <Grid gutter="sm">
            <Grid.Col span={6}>
              <TextInput
                placeholder="First name"
                {...form.getInputProps("telegram")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Last name"
                {...form.getInputProps("whatsapp")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                placeholder="Email"
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
          <div className="votereditsoc__choose-status">
            <span>Vip</span>
            <span>Gold</span>
            <span>Bronze</span>
            <span>Silver</span>
          </div>
          <div className="votereditsoc__btn-Save">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSocmedia;
