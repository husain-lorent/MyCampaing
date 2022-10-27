import React, { FC } from "react";
import { Avatar } from "@mantine/core";
import { Accordion } from "@mantine/core";

type UsersItemProps = {
  setView?: any;
  mainUser: any;
  setOnChangeMail: any;
  setUserId: any;
  electionList: any;
};

const UsersItem: FC<UsersItemProps> = ({
  setView,
  mainUser,
  setOnChangeMail,
  setUserId,
  electionList,
}) => {
  return (
    <section className="useritem__wrapper">
      <Accordion>
        <div className="Profile__sidebar-left">
          <Accordion.Item value="customization">
            <Accordion.Control>
              <div
                className="sidebar__user"
                onClick={() => {
                  setView("account");
                  setOnChangeMail("");
                  setUserId(mainUser.id);
                  console.log(mainUser.id);
                }}
              >
                <Avatar
                  radius="xl"
                  size="md"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPT9mqiidTshsbvsr8SDUYnTLNv3f31RTL0JrQFOZd7ECP8OQ1h0mR_Ze3VlzMPknrUhs&usqp=CAU"
                  alt="user"
                />
                <p>
                  {mainUser.first_name} {mainUser.last_name}
                </p>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="sidebar__user-info">
                <ul>
                  {electionList?.results.map((election: any) => (
                    <li key={election.title} onClick={() => setView("edit")}>
                      {election.title}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="add__user">
                <button className="add__btn" onClick={() => setView("create")}>
                  <span>+</span> Add election
                </button>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </div>
      </Accordion>
    </section>
  );
};

export default UsersItem;
