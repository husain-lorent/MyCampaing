import "./style.css";
import React from "react";
import { useForm } from "@mantine/form";
import { Modal, Textarea } from "@mantine/core";
import { Button, TextInput } from "@mantine/core";
import { useCreateTransactionMutation } from "hooks/mutation";
import closeIcon from "../../../../../../../assets/images/closeicon.svg";

type ModalAddExpProps = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  updateGeneral: number;
  setupdateGeneral: any;
};

const ModalAddExp: React.FC<ModalAddExpProps> = ({
  opened,
  setOpened,
  updateGeneral,
  setupdateGeneral,
}) => {
  const useCreateTransaction = useCreateTransactionMutation();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { reason: "", date: "", amount: "", note: "" },

    validate: {
      reason: (value) =>
        value.length < 2 ? "Reason must have at least 2 letters" : null,

      date: (value) =>
        value.length < 2 ? "Date must have at least 2 letters" : null,

      amount: (value) =>
        value.length < 4 ? "How much must have at least 4 letters" : null,

      note: (value) =>
        value.length < 12 ? "Note have at least 12 letters" : null,
    },
  });

  const createGeneral = (e: any) => {
    const data = {
      transaction_type: "expense",
      reason: e.reason,
      amount: Number(e.amount),
      data: e.note,
      election: 1,
      sponsor: 1,
    };
    const createTransaction = useCreateTransaction.mutateAsync(data);
    createTransaction
      .then((res) => {
        setOpened(false);
        setupdateGeneral(updateGeneral + 1);
      })

      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div className="modaladdexp__wrapper">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <div className="modaladdexp__inner">
          <div className="modaladdexp__top">
            <h2>Expense</h2>
            <img onClick={() => setOpened(false)} src={closeIcon} alt="Close" />
          </div>
          <div className="modaladdexp__info">
            <div className="modaladdexp__form">
              <form
                onSubmit={form.onSubmit(createGeneral)}
                className="modaladdexp__form-control"
              >
                <TextInput
                  label="Reason"
                  placeholder="Reason"
                  {...form.getInputProps("reason")}
                />
                <TextInput
                  label="Date"
                  placeholder="Date"
                  {...form.getInputProps("date")}
                />
                <TextInput
                  label="How much"
                  type="number"
                  placeholder="How much"
                  {...form.getInputProps("amount")}
                />
                <Textarea
                  placeholder="Your Note"
                  label="Note"
                  {...form.getInputProps("note")}
                />
                <div className="modaladdexp__btn-add">
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ModalAddExp;
