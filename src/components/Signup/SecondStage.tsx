import Button from "components/Button/Button";
import CustomInput from "components/Input/Input";
import { FC, ReactNode } from "react";
import { useVerifyEmailMutation } from "../../hooks/mutation";
import { setCookie } from "../../utils/cookie";
import { BsFillCheckCircleFill } from "react-icons/bs";

type SecondStageProps = {
  errors?: any;
  handleSubmit?: any;
  register?: any;
  setStepper?: any;
  AppleIcon?: any;
  ChromeIcon?: any;
  stepper?: boolean | string;
  getValues: (payload?: string | string[]) => { email: string; code: string };
};

const SecondStage: FC<SecondStageProps> = ({
  errors,
  handleSubmit,
  register,
  setStepper,
  AppleIcon,
  ChromeIcon,
  getValues,
  stepper,
}) => {
  const useVerifyEmail = useVerifyEmailMutation();
  const formValues = getValues();

  const onSubmit = (data: { code: string }, event: Event) => {
    event.preventDefault();
    const verifyWithEmail = useVerifyEmail.mutateAsync({
      email: formValues?.email,
      code: data?.code,
    });
    verifyWithEmail
      .then((res) => {
        setCookie("token", res?.data?.access);
        setCookie("refresh_token", res?.data?.refresh);
        setStepper("third");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <>
      <div className="signup__form">
        <h2>Sign up</h2>
        <div className="signup__buttons">
          <Button>
            <ChromeIcon />
            Continue with Google
          </Button>
          <Button>
            <AppleIcon />
            Continue with Apple
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input__field">
            <label>Email</label>
            <CustomInput
              name={"email"}
              type={"email"}
              register={register}
              placeholder="Enter your email address"
              invalid={errors?.email?.type === "required" && true}
              required
            />
            <p>
              We just sent you a temporary sign up code. Please check your inbox
              and paste the sign up code below.
            </p>
          </div>

          <div className="input__field">
            <label>Code</label>
            <CustomInput
              name={"code"}
              type={"text"}
              register={register}
              placeholder="Enter your code"
              invalid={errors.code?.type === "required" && true}
              required
            />
          </div>

          <Button type={"submit"}>Continue</Button>
        </form>
      </div>
    </>
  );
};

export default SecondStage;
