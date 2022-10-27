import "./styless.css";
import { FC } from "react";
import { Input } from "@mantine/core";
import ChangeMail from "./ChangeMail";
import Button from "components/Button/Button";

type ViewAccountProps = {
  onChangeMail: any;
  setOnChangeMail: any;
};

const ViewAccountComponent: FC<ViewAccountProps> = ({
  onChangeMail,
  setOnChangeMail,
}) => {
  return (
    <>
      {onChangeMail == "changemail" ? (
        <ChangeMail />
      ) : (
        <div className="Profile__sidebar-right">
          <h2>Account</h2>
          <hr className="hr" />
          <div className="sidebar__photo">
            <p>Photo</p>
            <Button>Choose photo</Button>
          </div>
          <hr className="hr" />
          <div className="personal__info">
            <p>Personal info</p>
            <div className="personal__btns">
              <Button>alimanyunusyan@.ru</Button>
              <p
                className="change__email"
                onClick={() => setOnChangeMail("changemail")}
              >
                Change email
              </p>
            </div>
            <div className="sidbar__form">
              <p>First name</p>
              <Input
                variant="filled"
                placeholder="Type your e-mail or phone number"
                radius="md"
                size="md"
              />
              <p>Your email</p>
              <Input
                variant="filled"
                placeholder="Type your e-mail or phone number"
                radius="md"
                size="md"
              />
            </div>
            <hr className="hr" />
            <p>Security</p>
            <div className="personal__btns">
              <Button>*******************</Button>
              <p
                className="change__email"
                onClick={() => setOnChangeMail("changemail")}
              >
                Change password
              </p>
            </div>
            <div className="sidebar__btn-save">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAccountComponent;
