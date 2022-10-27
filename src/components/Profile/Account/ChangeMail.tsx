import React from "react";
import { Input } from "@mantine/core";
import Button from "components/Button/Button";

const ChangeMail = () => {
  return (
    <div className="changemail">
      <h2>ChangeMail</h2>
      <hr className="hr" />
      <div>
        <p>First name</p>
        <Input
          variant="filled"
          placeholder="Type your e-mail or phone number"
          radius="md"
          size="md"
        />
        <div className="changemail__info">
          <p>
            We just sent you a temporary sign up code. Please check your inbox
            and paste the sign up code below.
          </p>
          <p>Code</p>
          <Input
            variant="filled"
            placeholder="Type code"
            radius="md"
            size="md"
          />
        </div>
      </div>
      <div className="changemail__btn-save">
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default ChangeMail;
