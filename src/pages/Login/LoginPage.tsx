import "./style.css";
import {useState} from "react";
import {setCookie} from "utils/cookie";
import {useForm} from "react-hook-form";
import CustomInput from "components/Input";
import Button from "components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
// import { BsFillCheckCircleFill } from "react-icons/bs";
import {useVerifyEmailMutation} from "hooks/mutation";
// import { showNotification } from "@mantine/notifications";
import {getStorage, setStorage} from "utils/helpers/local-storage";
import {ReactComponent as AppleIcon} from "assets/images/apple.svg";
import {ReactComponent as ChromeIcon} from "assets/images/chrome.svg";

function LoginPage() {
    const [stepper, setStepper] = useState(false);
    const navigate = useNavigate();
    const useVerifyEmail = useVerifyEmailMutation();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const nextStep = () => {
        setStepper(true);
    };


    const onSubmit = (data: any) => {
        const verifyWithEmail = useVerifyEmail.mutateAsync(data);
        verifyWithEmail
            .then((res) => {
                setCookie("token", res?.data?.access);
                setCookie("refresh_token", res?.data?.refresh);

                let oldAccounts = getStorage("accounts")
                    ? JSON.parse(getStorage("accounts") || "[]")
                    : [];

                const result = oldAccounts.filter(
                    (word: any) => word.id != res.data?.user.id
                );

                setStorage("election", res.data?.user.goal);
                setStorage("user", JSON.stringify(res.data?.user));
                setStorage("accounts", JSON.stringify([...result, res.data?.user]));

                setStepper(true);
                // showNotification({
                //   title: "Successfully authenticated !",
                //   message: "",
                //   style: { color: "green" },
                //   color: "green",
                //   icon: <BsFillCheckCircleFill />,
                //   loading: useVerifyEmail.isLoading,
                // });
                // window.location.reload();
                navigate("/hero", {replace: true});
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    return (
        <div className="login">
            <div className="login__form">
                <h2>Log in</h2>
                <div className="login__buttons">
                    <Button>
                        <ChromeIcon/>
                        Continue with Google
                    </Button>
                    <Button cursor={"pointer"}>
                        <AppleIcon/>
                        Continue with Apple
                    </Button>
                </div>
                {stepper ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input__field">
                            <label>Email</label>
                            <CustomInput
                                name={"email"}
                                type={"email"}
                                register={register}
                                placeholder="Enter your email address"
                                invalid={errors.email?.type === "required" && true}
                                required
                            />
                        </div>
                        <div className="input__field" style={{marginTop: "23px"}}>
                            <label className="input__password">Password</label>
                            <CustomInput
                                name={"code"}
                                type={"text"}
                                register={register}
                                placeholder="Enter your password"
                                invalid={errors.code?.type === "required" && true}
                                required
                            />
                        </div>
                        <Button cursor={"pointer"} type={"submit"}>
                            Continue with email
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(nextStep)}>
                        <div className="input__field">
                            <label>Email</label>
                            <CustomInput
                                name={"email"}
                                type={"email"}
                                register={register}
                                placeholder="Enter your email address"
                                invalid={errors.email?.type === "required" && true}
                                required
                            />
                        </div>
                        <Button cursor={"pointer"} type={"submit"}>
                            Continue with email
                        </Button>
                    </form>
                )}

                <div className="login__new-register">
                    <h5>Haven't signed up yet?</h5>
                    <Link to="/signup">
                        <Button cursor={"pointer"}>Sign up here</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
