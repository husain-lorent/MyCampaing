import React from "react";

type BudgetItemProps = {
  item: {
    name: string;
    job: string;
    icon: string;
    money: string;
    color: string;
  };
};

const BudgetingItem: React.FC<BudgetItemProps> = ({ item }) => {
  return (
    <div className="budgetitem__wrapper">
      <div className="budgetitem__name">
        <img src={item.icon} alt="icon-arrow" />
        <div className="budgetitem__info">
          <p>{item.name}</p>
          <p className="budgetitem__job">{item.job}</p>
        </div>
      </div>
      <div className="budgetitem__money">
        <p style={{ color: `${item.color}` }}>{item.money}</p>
      </div>
    </div>
  );
};

export default BudgetingItem;
