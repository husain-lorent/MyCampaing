import "./style.css";
import React from "react";
import { Checkbox } from "@mantine/core";
import Image from "assets/images/Image.png";

type VoterItemProps = {
  item: {
    election: number;
    first_name: string;
    id: number;
    image: any;
    invite_people: number;
    last_name: string;
    organization: string;
    status: string;
    social_contacts: any;
  };
  setOpenGrid: any;
  showDelete: boolean;
  deleteVoters: any;
};

const VoterItem: React.FC<VoterItemProps> = ({
  item,
  setOpenGrid,
  showDelete,
  deleteVoters,
}) => {
  return (
    <div className="vooter__wrapper">
      <div className="vooter__list">
        {/* <div className="vooter__change">
          <h3>{item.change}</h3>
          <span
            className="vooter__border"
            style={{ background: `${item.bgcolor}` }}
          ></span>
        </div> */}
        <div className="vooter__info">
          <div
            className="vooter__info-left"
            onClick={() => {
              setOpenGrid("voterdetails");
            }}
          >
            <img src={item.image ? item.image : Image} />
            <div>
              <div className="vooter__name">
                <h4>{item.first_name ? item.first_name : "Name"}</h4>
              </div>
              <div className="vooter__job">
                <p>{item.organization ? item.organization : "Organization"}</p>
              </div>
            </div>
          </div>
          <div className="vooter__info-center" onClick={setOpenGrid}>
            <p className="phone">{item.social_contacts.phone_number}</p>
            <p className="mail">{item.social_contacts.email}</p>
          </div>
          <div className="vooter__info-right">
            {showDelete ? (
              <Checkbox
                radius="md"
                size="md"
                onClick={() => deleteVoters(item?.id)}
              />
            ) : (
              <p>{item?.invite_people ? item?.invite_people : 0}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterItem;
