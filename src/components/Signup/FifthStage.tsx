import Button from "components/Button/Button";
import {useNavigate} from "react-router-dom";
import CustomInput from "components/Input/Input";
import {useEditAccountMutation} from "hooks/mutation";
import {getStorage, setStorage} from "utils/helpers/local-storage";

type FirstStageProps = {
    errors?: any;
    handleSubmit?: any;
    register?: any;
    AppleIcon?: any;
};

function FifthStage({errors, handleSubmit, register}: FirstStageProps) {
    const useEditAccount = useEditAccountMutation();
    const navigate = useNavigate();

    const onSubmit = (e: any) => {
        let dataSend = {
            email: e.email,
            username: e.username,
            first_name: e.first_name,
            last_name: e.last_name,
            organization: e.organization,
            goal: e.goal,
            password: e.password,
        };

        const editAccount = useEditAccount.mutateAsync(dataSend);
        editAccount
            .then((res) => {
                let oldAccounts = getStorage("accounts")
                    ? JSON.parse(getStorage("accounts") || "[]")
                    : [];
                // setStorage("user", res?.data);
                setStorage("accounts", JSON.stringify([...oldAccounts, res]));
                navigate("/hero", {replace: true});
            })

            .catch((err) => {
                console.log(err, "err");
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="signup__form-fifth">
                <h2 style={{marginBottom: "30px"}}>
                    Your goal <br/>
                    <span>please write in one word</span>
                </h2>
                <div className="input__field">
                    <CustomInput
                        name={"goal"}
                        type={"text"}
                        register={register}
                        placeholder="Enter your goal"
                        invalid={errors.email?.type === "required" && true}
                        required
                    />
                </div>

                <Button type={"submit"}>Continue</Button>
            </div>
        </form>
    );
}

export default FifthStage;
