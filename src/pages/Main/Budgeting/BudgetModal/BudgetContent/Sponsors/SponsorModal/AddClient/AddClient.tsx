import "./style.css";
import { useState } from "react";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import { useCreateSponsorMutation } from "hooks/mutation";
import { FileButton, Grid, Modal, TextInput } from "@mantine/core";
import closeIcon from "../../../../../../../../assets/images/closeicon.svg";

type AddClientProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddClient: React.FC<AddClientProps> = ({ opened, setOpened }) => {
  const [file, setFile] = useState<File | null>(null);
  const useCreateSponsor = useCreateSponsorMutation();

  const form = useForm({
    initialValues: {
      telegram: "",
      whatsapp: "",
      facebook: "",
      email: "",
      organization: "",
      name: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Email adress must have at least  letters" : null,
      organization: (value) =>
        value.length < 2 ? "Email adress must have at least  letters" : null,
      email: (value) =>
        value.length < 2 ? "Email adress must have at least  letters" : null,
    },
  });

  const createNewSponsor = (e: any) => {
    let data = {
      social_media: {
        phone_number: "",
        telegram: e.telegram,
        facebook: e.facebook,
        whatsapp: e.whatsapp,
        email: e.email,
      },
      name: e.name,
      election: 1,
    };
    const createsponsor = useCreateSponsor.mutateAsync(data);
    createsponsor
      .then((res) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      className="addclient__modal"
    >
      <div className="addclient__wrapper">
        <div className="addclient__top">
          <h2>Add new sponsor</h2>
          <img
            onClick={() => setOpened(false)}
            src={closeIcon}
            alt="closeIcon"
          />
        </div>
        <div className="addclient__photo">
          <p>Photo</p>
          <div className="addclient__download-img">
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
        <div className="addclientsoc__form">
          <form
            onSubmit={form.onSubmit(createNewSponsor)}
            className="addclientsoc__form-control"
          >
            <div className="organization">
              <p>Name Surname</p>
              <TextInput placeholder="Name" {...form.getInputProps("name")} />
            </div>
            <div className="organization">
              <p>Organization</p>
              <TextInput
                placeholder="Organization"
                {...form.getInputProps("organization")}
              />
            </div>
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

            <div className="addclient__btn-Save">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddClient;
