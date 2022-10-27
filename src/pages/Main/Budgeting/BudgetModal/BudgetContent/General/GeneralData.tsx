import "./style.css";
import React from "react";
import arrowblue from "../../../../../../assets/images/arrowblue.svg";

type GeneralDataProps = {
  item: any;
};
const GeneralData: React.FC<GeneralDataProps> = ({ item }) => {
  return (
    <div className="generaldata">
      <div className="generaldata__table">
        {/* {item.map((it: any, i: number) => (
          <div key={i} style={{ display: "flex" }}>
            <div className="generaldata__table-day">
              <p> {it.day}</p>
            </div>
            <div className="generaldata__table-info">
              <img src={it.icon} />
              <div className="generaldata__wrapper">
                <p className="general__data-title"> {it.reason}</p>
                <p className="general__data-budget"> {it.amount}</p>
              </div>
              <p className="general__data-time"> {it.data}</p>
            </div>
          </div>
        ))} */}
        <div style={{ display: "flex" }}>
          <div className="generaldata__table-day">
            <p> {item.day}22 Feb</p>
          </div>
          <div className="generaldata__table-info">
            <img src={arrowblue} alt={item.reason} />
            <div className="generaldata__wrapper">
              <p className="general__data-title"> {item.reason}</p>
              <p className="general__data-budget">${item.amount}</p>
            </div>
            <p className="general__data-time"> {item.data}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralData;
