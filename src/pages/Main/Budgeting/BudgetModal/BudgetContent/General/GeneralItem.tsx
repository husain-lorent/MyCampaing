import React from "react";

type GeneralItemProps = {
  year: any;
  setYear: any;
  month: string;
  setMonth: any;
  transaction: string;
  setTransaction: any;
};

const GeneralItem: React.FC<GeneralItemProps> = ({
  year,
  setYear,
  month,
  setMonth,
  transaction,
  setTransaction,
}) => {
  const years = [
    {
      year: 2020,
    },
    {
      year: 2021,
    },
    {
      year: 2022,
    },
  ];
  const months = [
    {
      month: "January",
      key: "january",
    },
    {
      month: "February",
      key: "february",
    },
    {
      month: "March",
      key: "march",
    },
    {
      month: "April",
      key: "april",
    },
    {
      month: "May",
      key: "may",
    },
    {
      month: "June",
      key: "june",
    },
    {
      month: "July",
      key: "july",
    },
    {
      month: "August",
      key: "august",
    },
    {
      month: "September",
      key: "september",
    },
    {
      month: "October",
      key: "october",
    },
    {
      month: "November",
      key: "november",
    },
    {
      month: "December",
      key: "december",
    },
  ];
  return (
    <div className="generalitem__wrapper">
      <div className="general__date-info">
        <div className="general__year">
          {years.map((y: any, i: number) => (
            <button
              className={`${year == y.year ? "active" : null}`}
              key={i}
              onClick={() => setYear(y.year)}
            >
              {y.year}
            </button>
          ))}
        </div>
        <hr className="hr__general" />
        <div className="general__month">
          {months.map((m: any, i: number) => (
            <button
              className={`${month == m.key ? "active" : null}`}
              key={i}
              onClick={() => setMonth(m.key)}
            >
              {m.month}
            </button>
          ))}
        </div>
        <hr className="hr__general" />
        <div className="general__expi">
          <button
            className={`${transaction == "expence" ? "active" : null}`}
            onClick={() => setTransaction("expence")}
          >
            Expence
          </button>
          <button
            className={`${transaction == "income" ? "active" : null}`}
            onClick={() => setTransaction("income")}
          >
            Income
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralItem;
