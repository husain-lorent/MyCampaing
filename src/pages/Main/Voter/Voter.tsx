import "./style.css";
import VoterItem from "./VoterItem";
import {Input} from "@mantine/core";
import React, {useState} from "react";
import {useVotersQuery} from "hooks/query";
import {useDeleteVotersMutation} from "hooks/mutation";
import {useStatesPopup} from "context/MainStatesContext";
import closeIcon from "../../../assets/images/closeicon.svg";
import {ReactComponent as SearchIcon} from "../../../assets/images/search.svg";


type VoterProps = {
    setOpenGrid: boolean | any;
};

const Voter: React.FC<VoterProps> = ({setOpenGrid}) => {
    const [showDelete, setShowDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [statusState, setStatusState] = useState("");
    const [deleteVotersId, setDeleteVotersId] = useState([0]);
    const useDeleteVoters = useDeleteVotersMutation();
    const {updateVoterPage, setUpdateVoterPage} = useStatesPopup();

    const voterStatus = [
        {
            title: "Vip",
            params: "vip",
        },
        {
            title: "Gold",
            params: "gold",
        },
        {
            title: "Bronze",
            params: "bronze",
        },
        {
            title: "Silver",
            params: "silver",
        },
    ];

    const votersList = useVotersQuery({
        page: page,
        election: 1,
        main: "",
        status: statusState,
        refresh: updateVoterPage,
    });

    const filterDeleteVoter = (id: number) => {
        let result = deleteVotersId.filter((deleteVoterId) => deleteVoterId == id);
        if (!result.length) return setDeleteVotersId([...deleteVotersId, id]);
        let resultArray = deleteVotersId.filter(
            (deleteVoterId) => deleteVoterId != id
        );
        setDeleteVotersId([...resultArray]);
    };

    const deleteVoterFunc = () => {
        const deleteVoters = useDeleteVoters.mutateAsync({id: deleteVotersId});
        deleteVoters
            .then((res) => {
                setShowDelete(false);
                setUpdateVoterPage(updateVoterPage + 1);
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    return (
        <div className="voter">
            <div className="vooter__top">
                <h1>Voters</h1>
                <div className="vooter__btns">
                    <button
                        onClick={() => {
                            setOpenGrid("voteradd");
                        }}
                        className={`${
                            showDelete == true ? "voterbtn__hidden" : "vooter_btn-add"
                        }`}
                    >
                        Add
                    </button>
                    <button
                        onClick={() => {
                            setShowDelete(true);
                            setOpenGrid("");
                        }}
                        className={`${
                            showDelete ? "vooter_btn-delete-hidden" : "vooter_btn-delete"
                        }`}
                    >
                        Delete
                    </button>
                    {showDelete == true && (
                        <img
                            onClick={() => setShowDelete(false)}
                            src={closeIcon}
                            alt="Close"
                        />
                    )}
                </div>
            </div>
            <div
                className={`${showDelete ? "vooter__input-delete" : "vooter__input"}`}
            >
                <Input
                    icon={<SearchIcon/>}
                    variant="filled"
                    placeholder="Search"
                    radius="lg"
                />

                {showDelete && (
                    <button onClick={deleteVoterFunc} className="vooter_btn-delete">
                        Delete
                    </button>
                )}
            </div>
            <div className="vooter__filter-btns">
                {voterStatus.map((status, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setStatusState(status.params);
                            setDeleteVotersId([0]);
                            setOpenGrid("");
                        }}
                        className={`${status.params == statusState ? "active" : null}`}
                    >
                        {status.title}
                    </button>
                ))}
            </div>
            <div className="vooter__scrollbar">
                {votersList.data?.results?.map((item: any, index: number) => (
                    <VoterItem
                        item={item}
                        key={index}
                        setOpenGrid={setOpenGrid}
                        showDelete={showDelete}
                        deleteVoters={filterDeleteVoter}
                    />
                ))}
            </div>
        </div>
    );
};

export default Voter;
