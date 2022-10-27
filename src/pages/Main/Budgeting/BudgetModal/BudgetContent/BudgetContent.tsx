import "./style.css";
import React from "react";
import General from "./General/General";
import Reporties from "./Reporties/Reporties";
import Sponsors from "./Sponsors/Sponsors";

type BudgetContentProps = {
  budgetPage: string;
  balance?: any;
};

const BudgetContent: React.FC<BudgetContentProps> = ({
  budgetPage,
  balance,
}) => {
  return (
    <div className="budgetcontent">
      {budgetPage == "general" ? (
        <General balance={balance} openedModel={budgetPage} />
      ) : budgetPage == "sponsors" ? (
        <Sponsors openedModel={budgetPage} />
      ) : budgetPage == "reporties" ? (
        <Reporties />
      ) : null}
      {/* <ModalAddExp/> */}
    </div>
  );
};

export default BudgetContent;
