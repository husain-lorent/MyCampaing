import { FC } from "react";
import { Slider } from "@mantine/core";
import "./styless.css";
import Skletavatar from "assets/images/skletavatar.svg";
type ModalProps = {
  item?: any;
};

const CustomSlider: FC<ModalProps> = ({ item }) => {


  return (
    <>
      <div className="slider__fullname">
        <div className="slider__info">
          <div className="slider__info-name">
            <p> {item.first_name}</p>
            <p> {item.last_name}</p>
          </div>
          {item.real_numbers > 0 ? <span>|</span> : null }
        </div>
        <div className="votes">
          <p>
            Votes <span>{item.real_numbers} </span>
          </p>
        </div>
      </div>
      <Slider
        thumbChildren={
          <img
            src={item.image ? item.image : Skletavatar}
            className="slider__img"
          />
        }
        label={null}
        defaultValue={3}
        thumbSize={60}
        styles={{
          thumb: { borderWidth: 0, padding: 0, left: -90, zIndex: 2 },
        }}
      />
    </>
  );
};

export default CustomSlider;
