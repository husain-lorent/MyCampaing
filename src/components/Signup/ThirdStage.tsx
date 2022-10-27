import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import Button from "components/Button/Button";
import CustomInput from "components/Input/Input";

type ThirdStageProps = {
  errors?: any;
  handleSubmit?: any;
  register?: any;
  setStepper?: any;
  AppleIcon?: any;
  ChromeIcon?: any;
  stepper?: boolean | string;
};

function ThirdStage({
  errors,
  handleSubmit,
  register,
  setStepper,
}: ThirdStageProps) {
  const onSubmit = () => setStepper("fourth");
  return (
    <>
      <div className="signup__form">
        <h3>Welcome to MyCampaign</h3>
        <h4>First things first, tell us a bit about yourself</h4>

        <Dropzone
          style={{
            width: "85px",
            height: "85px",
            margin: "32px auto 20px auto",
            textAlign: "center",
          }}
          className="upload__file"
          onDrop={(files) => console.log("accepted files", files)}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          // accept={IMAGE_MIME_TYPE}
          // {...props}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 20, pointerEvents: "none" }}
          >
            <div>
              <Text size="sm" color="dimmed" inline mt={7}>
                Add <br /> a photo
              </Text>
            </div>
          </Group>
        </Dropzone>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input__field">
            <label>What should we call you?</label>
            <CustomInput
              name={"username"}
              type={"text"}
              register={register}
              placeholder="Enter your user name"
              invalid={errors.user_name?.type === "required" && true}
              required
            />
          </div>
          <div className="input__field">
            <label>Set a password</label>
            <CustomInput
              name={"password"}
              type={"password"}
              register={register}
              placeholder="Enter your password"
              invalid={errors.password?.type === "required" && true}
              required
            />
          </div>
          <div className="input__field">
            <label>Re-enter the password</label>
            <CustomInput
              name={"repassword"}
              type={"password"}
              register={register}
              placeholder="Enter your re-password"
              invalid={errors.password?.type === "required" && true}
              required
            />
          </div>

          <Button type={"submit"}>Continue</Button>
        </form>
      </div>
    </>
  );
}

export default ThirdStage;
