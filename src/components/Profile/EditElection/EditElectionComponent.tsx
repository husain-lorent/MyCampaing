import "./styless.css";
import { Input } from "@mantine/core";
import Button from "components/Button/Button";
import { useForm } from "@mantine/form";

const EditElectionComponent = () => {
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      goal: "",
      organize: "",
      predictions: "",
      starting_day: null,
      voting_day: null,
    },

    validate: {
      goal: (value) => (value.length < 1 ? "true" : null),
      organize: (value) => (value.length < 1 ? "true" : null),
      starting_day: (value) => (value ? null : true),
      voting_day: (value) => (value ? null : true),
    },
  });
  return (
    <div className="Edit__wrapper">
      <div className="edit__info">
        <h2>Vice president</h2>
        <hr className="hr" />
      </div>
      <div className="yougoal">
        <p>You goal</p>
        <Input
          variant="filled"
          placeholder="Vice president"
          radius="md"
          size="md"
        />
      </div>
      <div className="organize">
        <p>Organize</p>
        <Input
          variant="filled"
          placeholder="ooo “Organization” Project managere"
          radius="md"
          size="md"
        />
      </div>
      <div className="predictions">
        <p>Predictions</p>
        <Input variant="filled" placeholder="700 000" radius="md" size="md" />
      </div>
      <div className="sidebar__btn-save">
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default EditElectionComponent;
