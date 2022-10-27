import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "components/Button/Button";
import CustomInput from "components/Input/Input";
import { ReactComponent as AppleIcon } from "assets/images/apple.svg";
import { ReactComponent as ChromeIcon } from "assets/images/chrome.svg";

import FirstStage from "components/Signup/FirstStage";
import SecondStage from "components/Signup/SecondStage";
import ThirdStage from "components/Signup/ThirdStage";
import FourthStage from "components/Signup/FourthStage";
import FifthStage from "components/Signup/FifthStage";

function SignupPage() {
  const [stepper, setStepper] = useState<boolean | string>("first");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <div className="signup">
      {stepper == "first" ? (
        <FirstStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          setStepper={setStepper}
          AppleIcon={AppleIcon}
          ChromeIcon={ChromeIcon}
        />
      ) : stepper == "second" ? (
        <SecondStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          getValues={getValues}
          setStepper={setStepper}
          AppleIcon={AppleIcon}
          ChromeIcon={ChromeIcon}
        />
      ) : stepper == "third" ? (
        <ThirdStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          setStepper={setStepper}
        />
      ) : stepper == "fourth" ? (
        <FourthStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          stepper={stepper}
          setStepper={setStepper}
        />
      ) : stepper == "fifth" ? (
        <FifthStage
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
}

export default SignupPage;
