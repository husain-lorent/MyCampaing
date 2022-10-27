import "./style.css";
import { useState, FC } from "react";
import GeneralItem from "./GeneralItem";
import GeneralData from "./GeneralData";
import ModalAddExp from "./AddExp-Modal/ModalAddExp";
import ModalAddInc from "./AddInc-Modal/ModalAddInc";
import { useGetTransactionsQuery } from "hooks/query";
import { useStatesPopup } from "context/MainStatesContext";

type GeneralProps = {
  balance?: any;
  openedModel: any;
};

const General: FC<GeneralProps> = ({ balance, openedModel }) => {
  const { updateGeneral, setupdateGeneral } = useStatesPopup();
  const [transaction, setTransaction] = useState("");
  const [opened, setOpened] = useState(false);
  const [change, setChange] = useState("");
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);

  const useGetTransactions = useGetTransactionsQuery({
    election: 1,
    page: page,
    type_transaction: transaction,
    month: month,
    year: year,
    enabled: openedModel == "general" ? true : false,
    update: updateGeneral,
  });

  return (
    <>
      <div className="general__wrapper">
        <div className="general__top">
          <h2>General</h2>
          <div className="general__info-badge">
            <p>Your balance</p>
            <h3>${balance.data?.results[0]?.balance}</h3>
          </div>
        </div>
        <div className="general__exp-btns">
          <p>Expence and Income</p>
          <div>
            <button
              onClick={() => {
                setOpened(true);
                setChange("modaladdexp");
              }}
              className="general__add-exp"
            >
              Add Expence
            </button>
            <button
              onClick={() => {
                setOpened(true);
                setChange("modaladdinc");
              }}
              className="general__btn-inc"
            >
              Add Income{" "}
            </button>
          </div>
        </div>
        <GeneralItem
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          transaction={transaction}
          setTransaction={setTransaction}
        />
        {useGetTransactions?.data?.results?.map((item: any, index: number) => (
          <GeneralData item={item} key={index} />
        ))}

        {change == "modaladdexp" ? (
          <ModalAddExp
            opened={opened}
            setOpened={setOpened}
            setupdateGeneral={setupdateGeneral}
            updateGeneral={updateGeneral}
          />
        ) : change == "modaladdinc" ? (
          <ModalAddInc
            opened={opened}
            setOpened={setOpened}
            setupdateGeneral={setupdateGeneral}
            updateGeneral={updateGeneral}
          />
        ) : null}
      </div>
    </>
  );
};

export default General;
