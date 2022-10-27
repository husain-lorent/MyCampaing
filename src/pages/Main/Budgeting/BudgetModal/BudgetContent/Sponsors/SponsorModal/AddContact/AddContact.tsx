import { FileButton, Grid, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import { useState } from "react";
import closeIcon from "../../../../../../../../assets/images/closeicon.svg";

type AddContactProps = {
  opened: boolean;
  setOpened: any| React.Dispatch<React.SetStateAction<boolean>>;
};

const AddContact: React.FC<AddContactProps> = ({ opened, setOpened }) => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm({
    initialValues: {
      telegram: "",
      whatsapp: "",
      facebook: "",
      email: "",
      organization: "",
      phonenumber: "",
    },

    validate: {
      organization: (value) =>
        value.length < 2 ? "Email adress must have at 2" : null,
      telegram: (value) =>
        value.length < 2 ? "Telegram must have at 2" : null,
      whatsapp: (value) =>
        value.length < 2 ? "WhatsApp must have at 2" : null,
      facebook: (value) =>
        value.length < 2 ? "Facebook must have at 2" : null,
      email: (value) =>
        value.length < 2 ? "Email adress must have at 2 " : null,
      phonenumber: (value) =>
        value.length < 2 ? "phonenumber  must have at 2" : null,
    },
  });
  return (
    <div>
      <>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Introduce yourself!"
        >
          <div onClick={() => setOpened(false)} className="addclient__modal">
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
                  onSubmit={form.onSubmit(console.log)}
                  className="addclientsoc__form-control"
                >
                  <div className="organization">
                    <TextInput
                      label="Name Surname"
                      placeholder="Organization"
                      {...form.getInputProps("organization")}
                    />
                  </div>
                  <div className="phonenumber">
                    <TextInput
                      type="number"
                      placeholder="Your phone"
                      label="Phone"
                      {...form.getInputProps("phonenumber")}
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
          </div>
        </Modal>
      </>
    </div>
  );
};

export default AddContact;
