import "./style.css";
import { Input, Button } from "@mantine/core";
import { ReactComponent as SearchIcon } from "../../../assets/images/search.svg";
import CloseIcon from "assets/images/closeicon.svg";
import CandidatevoterItem from "./CandidatevoterItem/CandidatevoterItem";
import { useGetVoterCandidates } from "hooks/query";
import { useState } from "react";
import { useStatesPopup } from "context/MainStatesContext";
import { useDeleteVoterForCandidate } from "hooks/mutation";
import { useDebouncedState } from "@mantine/hooks";
type CandidateVotersProps = {
  setCandidateVoters: any;
  candidateid: any;
  voters: any;
  voterfirstname: string;
  voterlastname: string;
};
const CandidateVoters: React.FC<CandidateVotersProps> = ({
  setCandidateVoters,
  candidateid,
  voters,
  voterfirstname,
  voterlastname,
}) => {
  const [value, setValue] = useDebouncedState("", 1000);
  const useGetVoterCandidatesList = useGetVoterCandidates({
    candidate: candidateid,
    query: value,
  });
  console.log(useGetVoterCandidatesList)
  const [showChecked, setShowChecked] = useState(false);
  const [deleteVotersId, setDeleteVotersId] = useState<number[]>([]);

  const DeleteVoterForCandidates = useDeleteVoterForCandidate();
  const { refreshCandidates, setRefreshCandidates } = useStatesPopup();

  const filterDeleteVoter = (id: number) => {
    let result = deleteVotersId.filter((deleteVoterId) => deleteVoterId == id);
    if (!result.length) return setDeleteVotersId([...deleteVotersId, id]);
    let resultArray = deleteVotersId.filter(
      (deleteVoterId) => deleteVoterId == id
    );
    setDeleteVotersId([...resultArray]);
  };

  const deleteVoterFunc = () => {
    const deleteVoters = DeleteVoterForCandidates.mutateAsync({
      id: deleteVotersId,
    });
    deleteVoters
      .then((res) => {
        if (showChecked == false) {
          setShowChecked(true);
        } else {
          setRefreshCandidates(refreshCandidates + 1);
        }
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
      <div className="candidatevoters__form">
        <Input
          onChange={(event: any) => setValue(event.target.value)}
          icon={<SearchIcon />}
          variant="filled"
          placeholder="Search"
          radius="lg"
        />
        <Button radius="lg" className="candidatevoters__btn-add">
          Add
        </Button>
        <Button
          onClick={deleteVoterFunc}
          radius="lg"
          className="candidatevoters__btn-delete"
        >
          Delete
        </Button>
      </div>
      {useGetVoterCandidatesList.data?.results == 0 ? (
      <p className="noresult">The requested voter was not found </p>
      ) : (
        <div className="candidatevoters__list">
          {useGetVoterCandidatesList.data?.results.map(
            (item: any, index: number) => (
              <CandidatevoterItem
                showChecked={showChecked}
                setShowChecked={setShowChecked}
                item={item}
                key={index}
                deleteVoters={filterDeleteVoter}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateVoters;
