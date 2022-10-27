import Button from "components/Button/Button";
import CustomInput from "components/Input/Input";

type FirstStageProps = {
  errors?: any;
  handleSubmit?: any;
  register?: any;
  setStepper?: any;
  AppleIcon?: any;
  stepper?: any;
};

function FourthStage({
  errors,
  handleSubmit,
  register,
  setStepper,
  stepper,
}: FirstStageProps) {
  const onSubmit = () => setStepper("fifth");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="signup__form">
        <h3 style={{ marginBottom: "30px" }}>
          Tell about yourself <br />
          <span>this will be useful in future work</span>
        </h3>
        <div className="input__field">
          <label>First name</label>
          <CustomInput
            name={"first_name"}
            type={"text"}
            register={register}
            placeholder="Enter your first name"
            invalid={errors.first_name?.type === "required" && true}
            required
          />
        </div>
        <div className="input__field">
          <label>Last name</label>
          <CustomInput
            name={"last_name"}
            type={"text"}
            register={register}
            placeholder="Enter your last name"
            invalid={errors.last_name?.type === "required" && true}
            required
          />
        </div>

        <div className="input__field">
          <label>Organization</label>
          <CustomInput
            name={"organization"}
            type={"text"}
            register={register}
            placeholder="Enter your organization"
            invalid={errors.organization?.type === "required" && true}
            required
          />
        </div>

        <Button type={"submit"}>Continue</Button>
      </div>
    </form>
  );
}

export default FourthStage;
