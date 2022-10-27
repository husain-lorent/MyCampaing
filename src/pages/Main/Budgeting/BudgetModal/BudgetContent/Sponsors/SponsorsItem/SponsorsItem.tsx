import "./style.css";
import { useState } from "react";
import { Accordion } from "@mantine/core";
import { BsFillPlayFill } from "react-icons/bs";
import AccordionControl from "./AccordionControl";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import phone from "assets/images/phone.svg";
import AddAmountModal from "../SponsorModal/AddAmount/AddAmountModal";
import AddClient from "../SponsorModal/AddClient/AddClient";
import updateIcon from "../../../../../../../assets/images/updateicon.svg";
import companylogo from "../../../../../../../assets/images/companylogo.svg";

type SponsorsItemProps = {
  item: any;
  setOpenUpdate: React.Dispatch<React.SetStateAction<string>>;
};

const SponsorsItem: React.FC<SponsorsItemProps> = ({ item, setOpenUpdate }) => {
  const [opened, setOpened] = useState(false);
  console.log(item);

  const socincons = [facebook, telegram, instagram, phone];

  return (
    <div className="sponsoritem__wrapper">
      <div className="sponsoritem__top">
        <div className="sponsoritem__top-info">
          <div className="logo">
            <img src={item.image} alt="logo" />
          </div>
          <div>
            <h2>{item.name}</h2>
            <div className="sponsoritem__socicons">
              {socincons.map((icon, index) => (
                <img src={icon} alt="soc-icons" key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="sponsoritem__updateicon">
          <img
            onClick={() => setOpenUpdate("update")}
            src={updateIcon}
            alt="update-icon"
          />
        </div>
      </div>

      <div className="sponsoritem__users">
        <Accordion
          className="accordion__sponsor_root"
          chevron={<BsFillPlayFill size={20} />}
          styles={{
            chevron: {
              "&[data-rotate]": {
                transform: "rotate(90deg)",
              },
            },
          }}
        >
          <Accordion.Item value="customization">
            <div className="sponsoritem__acc-container">
              <div>
                <Accordion.Control className="sponsoritem__cont-pos">
                  <p className="sponsoritem__acc-control">Contact person</p>
                </Accordion.Control>
              </div>
              <div className="sponsoritem__acc-btns">
                <button className="sponsoritem__acc-delete"> Delete </button>
                {/*
                <button onClick={() => setOpened(true)}
                 className="sponsoritem__acc-add"> Add</button> */}
                <AccordionControl />
              </div>
            </div>
            <Accordion.Panel>
              <div className="sponsoritem__users">
                <div className="sponsoritem__users-wrapper">
                  <div className="sponsoritem__users-left">
                    <img src={item?.image} />

                    <div>
                      <p className="sponsoritem__fullname">{item.name}</p>
                      <p className="sponsoritem__job">Project manager</p>
                    </div>
                    <div className="sponsoritem__pm-control">
                      <p className="sponsoritem__phone">+998 90 000 00 00</p>
                      <p className="sponsoritem__mail">tialep@cofsi.gov</p>
                    </div>
                  </div>

                  <div>
                    <div className="sponsoritem__socicons">
                      {socincons.map((icon, index) => (
                        <img src={icon} alt="soc-icons" key={index} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="sponsoritem__amount">
        <div className="sponsoritem__amount-info">
          <h3>The amount</h3>
          <button onClick={() => setOpened(true)}>Add</button>
        </div>
        <div className="sponsoritem__amount-budget">
          <p className="sponsor__amaount-date">7.06.2021</p>
          <span></span>
          <p className="sponsor__amaount-budget">15, 400.00</p>
        </div>
      </div>
      <AddAmountModal opened={opened} setOpened={setOpened} />

      {/* <AddClient /> */}
    </div>
  );
};

export default SponsorsItem;
