import "./style.css";
import { useState } from "react";
import BudgetingItem from "./BudgetingItem";
import { useGetBalanceQuery } from "hooks/query";
import BudgetModal from "./BudgetModal/BudgetModal";
import redicon from "../../../assets/images/arrowred.svg";
import blueicon from "../../../assets/images/arrowblue.svg";
import { useStatesPopup } from "context/MainStatesContext";

const budgetdata = [
  {
    name: "Mira Futer",
    job: "Project manager",
    icon: blueicon,
    money: "+$ 400",
    color: "#1C54FC",
  },
  {
    name: "Mira Futer",
    job: "Project manager",
    icon: redicon,
    money: "-$ 400",
    color: "#F5415F",
  },
];
function Budgeting() {
  const [opened, setOpened] = useState(false);
  const { updateGeneral } = useStatesPopup();
  const useGetBalance = useGetBalanceQuery({
    page: 1,
    election: 1,
    update: updateGeneral,
  });

  return (
    <div className="budgeting">
      <div>
        <div className="budgeting__top">
          <h2>Budgeting</h2>
        </div>
        <div className="budgeting__balnce">
          <p>Budgeting</p>
          <h3>${useGetBalance.data?.results[0].balance}</h3>
        </div>
        <div className="budgeting__list">
          <h3>Today</h3>
          <div className="budgeting__info" onClick={() => setOpened(true)}>
            {budgetdata.map((item, index) => (
              <BudgetingItem item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <BudgetModal
        opened={opened}
        setOpened={setOpened}
        balance={useGetBalance}
      />
    </div>
  );
}

export default Budgeting;
