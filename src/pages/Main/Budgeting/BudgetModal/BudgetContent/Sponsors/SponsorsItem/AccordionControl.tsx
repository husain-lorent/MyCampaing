import { useForm } from "@mantine/form";
import { useState } from "react";
import AddContact from "../SponsorModal/AddContact/AddContact";
const AccordionControl = () => {
  const [opened, setOpened] = useState(false);

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
    <div>
      <div className="sponsoritem__acc-btns">
        {/* <button className="sponsoritem__acc-delete"> Delete </button> */}
        <button
          onClick={() => setOpened(true)}
          className="sponsoritem__acc-add"
        >
          Add
        </button>
      </div>

      <AddContact opened={opened} setOpened={setOpened} />
    </div>
  );
};

export default AccordionControl;
