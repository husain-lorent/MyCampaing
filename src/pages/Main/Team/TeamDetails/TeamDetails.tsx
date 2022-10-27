import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";

import "./style.css";
import backIcon from "assets/images/backicon.svg";
import phone from "assets/images/phone.svg";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import { useAccountPopup } from "context/AccountPopupContext";

interface TeamDetailsI {
  setOpenGrid: React.Dispatch<React.SetStateAction<string>>;
}

const TeamDetails: React.FC<TeamDetailsI> = ({ setOpenGrid }) => {
 

  const form = useForm({
    initialValues: { position: "", responsibilities: "" },

    validate: {
      position: (value) =>
        value.length < 1 ? "Position have at least 1 letters" : null,
      responsibilities: (value) =>
        value.length < 1 ? "Responsibilities have at least 1 letters" : null,
    },
  });

  return (
    <div className="teamdetails">
      <div className="teamdetails__top">
        <img src={backIcon} alt="close" onClick={() => setOpenGrid("")} />
        <button>Edit</button>
      </div>
      <div className="teamdetails__soc-info">
        <div className="teamdetails__info">
          <h3>Sweden</h3>
          <p>ooo “Organization” Project manager</p>
          <div className="teamdetails__socicons">
            <img src={phone} alt="icons" />
            <img src={facebook} alt="icons" />
            <img src={telegram} alt="icons" />
            <img src={instagram} alt="icons" />
          </div>
        </div>
        <div className="teamdetails__img">
          <img
            src="https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg"
            alt="Image"
          />
        </div>
      </div>
      <div className="teamdetails__form">
        <form onSubmit={form.onSubmit(console.log)}>
          <TextInput
            label="Position"
            placeholder="Position"
            {...form.getInputProps("position")}
          />
          <TextInput
            label="Responsibilities"
            placeholder="Responsibilities"
            {...form.getInputProps("responsibilities")}
          />
        </form>
      </div>
    </div>
  );
};

export default TeamDetails;
