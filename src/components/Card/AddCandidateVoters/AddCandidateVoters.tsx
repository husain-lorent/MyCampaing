import { useGetCandidatVotersList } from "hooks/query";
import { Button, Input } from "@mantine/core";
import "./style.css";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import CloseIcon from "assets/images/closeicon.svg";
import AddCandtItems from "./AddCandtItems";
import { useCreateVotersInCandidate } from "hooks/mutation";
import { useState } from "react";
import { useStatesPopup } from "context/MainStatesContext";
import { useDebouncedState } from "@mantine/hooks";

type AddCandidateVotersProps = {
  setCandidateVoters: React.Dispatch<React.SetStateAction<string>>;
  candidateid: number;
  voterfirstname: string;
  voterlastname: string;
  voters: string;
};

const AddCandidateVoters: React.FC<AddCandidateVotersProps> = ({
  setCandidateVoters,
  candidateid,
  voterfirstname,
  voterlastname,
  voters,
}) => {
  const createVoters = useCreateVotersInCandidate();
  const [checked, setChecked] = useState<number[]>([]);
  const [value, setValue] = useDebouncedState("", 200);

  const { refreshCandidates, setRefreshCandidates } = useStatesPopup();
  const useGetVoterCandidatesList = useGetCandidatVotersList({ voter: value });
  const createCandidant = () => {
    const data = {
      candidate: candidateid,
      voter: checked,
    };
    const createCandidates = createVoters.mutateAsync(data);

    createCandidates
      .then((res) => {
        setRefreshCandidates(refreshCandidates + 1);
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div className="candidatevoters">
      <div className="candidatevoter__top">
        <h2>
          {voterfirstname} {voterlastname}
        </h2>
        <img
          onClick={() => setCandidateVoters("")}
          src={CloseIcon}
          alt="CloseIcon"
        />
      </div>
      <div className="cand__voters">
        <p>
          {voters} <span>voters</span>
        </p>
      </div>
      <div className="addcandidate__form">
        <Input
          onChange={(event: any) => setValue(event.target.value)}
          icon={<SearchIcon />}
          variant="filled"
          placeholder="Search"
          radius="lg"
        />
        <Button
          onClick={createCandidant}
          radius="lg"
          className="candidatevoters__btn-add"
        >
          Add
        </Button>
      </div>
      {useGetVoterCandidatesList.data?.results == 0 ? (
        <p className="noresult">The requested voter was not found </p>
      ) : (
        <div className="candidatevoters__list">
          {useGetVoterCandidatesList.data?.results.map((items: any) => (
            <AddCandtItems
              checked={checked}
              setChecked={setChecked}
              items={items}
              key={items.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddCandidateVoters;
