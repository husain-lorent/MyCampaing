import "./styless.css";
import { Avatar } from "@mantine/core";
import { useAccountPopup } from "context/AccountPopupContext";
import { useUserContext } from "context/UserContext";

const DropdonHeader = () => {
  const { changeModal } = useAccountPopup();
  const { mainUsers } = useUserContext();

  return (
    <div className="dropdown__wrapper">
      {mainUsers?.map((item: any, index: number) => (
        <div className="user__info" key={index}>
          <p>
            {item.first_name}
            <br />
            {item.last_name}
          </p>
          <Avatar
            radius="xl"
            size="lg"
            src={
              item.image
                ? item.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisU8tM696QaPXOYFtGWdCjFWE6YD2nd3Dcd9L9lqtkNlbet6CWORBLKxJGeeK9FJL_TI&usqp=CAU"
            }
          />
        </div>
      ))}

      <div className="dropdown__setting">
        <ul>
          <li onClick={() => changeModal()}>Settings</li>
          <li>Add Acaount</li>
          <li>Log out all</li>
        </ul>
      </div>
    </div>
  );
};

export default DropdonHeader;
