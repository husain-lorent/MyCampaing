import {useAccountPopup} from "context/AccountPopupContext";
import React, {ChangeEvent, useEffect, useState} from "react";
import "./style.css";
import TeamItem from "./TeamItem";
import {Loader} from "@mantine/core";
import TeamAddModal from "./TeamModal/TeamAddModal";
import closeIcon from "assets/images/closeicon.svg";
import {Input} from "@mantine/core";
import {ReactComponent as SearchIcon} from "assets/images/search.svg";
import AddChoose from "./AddChoose/AddChoose";
import {useGetTeamQuery} from "hooks/query";
import {useDeleteTeamMutation} from "hooks/mutation";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {useLocation} from "react-router-dom";
import {useElectionContext} from "../../../context/ElectionContext";


type TeamProps = {
    setOpenGrid: any;
    setChangeTeam: any;
};
const Team: React.FC<TeamProps> = ({
                                       setOpenGrid,
                                       setChangeTeam,
                                   }) => {
    const {electionId} = useElectionContext();
    const {isHovering} = useAccountPopup();
    const getTeam: any = useGetTeamQuery({page: 1, election: electionId})
    const deleteTeam = useDeleteTeamMutation();
    const [deleteTeamWithId, setDeleteTeamWithId] = useState<number[]>([])
    const [checkDelete, setCheckDelete] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [teamPage, setTeamPage] = useState("team");

    const handleDeleteTeamMembers = () => {
        const deleteThisTeam = deleteTeam.mutateAsync({id: deleteTeamWithId});
        deleteThisTeam
            .then((res) => {
                getTeam?.refetch();
            })
            .catch((err) => {
                console.log(err, "err");
            });
    }
    
    useEffect(() => {
        getTeam.refetch();
    }, [teamPage])

    if (getTeam.isLoading) {
        return <div className="team"><Loader/></div>
    }
    const handleChangeTick = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        if (event?.target?.checked) {
            return setDeleteTeamWithId((prevState) => [...prevState, id])
        } else {
            return setDeleteTeamWithId((prevState) => prevState.filter(item => item !== id))
        }
    }


    const handleDeleteTeam = () => {
        setCheckDelete(!checkDelete)

    };

    return (
        <div className={`${isHovering ? "team" : "team__hover"}`}>
            {teamPage == "team" ? (
                <>
                    <div className="team__top">
                        <h2>MyTeam</h2>
                        <div className="team__btns">
                            <button
                                onClick={() => setOpenModal(true)}
                                className={`${
                                    checkDelete ? "team__btns-hidden" : "team__btn-add"
                                }`}
                            >
                                Add
                            </button>

                            {/* display hidde */}
                            <button
                                onClick={handleDeleteTeam}
                                className={`${
                                    checkDelete ? "team__btn-delete-hidden" : "team__btn-delete"
                                }`}
                            >
                                Delete
                            </button>
                        </div>
                        <div
                            className={`${
                                checkDelete
                                    ? "teamitem__closeicon"
                                    : "teamitem__closeicon-hidden"
                            }`}
                        >
                            <img
                                onClick={() => setCheckDelete(false)}
                                src={closeIcon}
                                alt="closeIcon"
                            />
                        </div>
                    </div>
                    <div className="team__form-input">
                        <div
                            className={`${checkDelete ? "team__input" : "team__input-block"}`}
                        >
                            <Input
                                icon={<SearchIcon/>}
                                variant="filled"
                                placeholder="Search"
                                radius="lg"
                            />
                        </div>
                        {/* Delete uchun */}
                        <button
                            className={`${
                                checkDelete ? "team__btn-delete" : "team__btn-delete-hidden"
                            }`}
                            onClick={handleDeleteTeamMembers}
                        >
                            Delete
                        </button>
                    </div>
                    <div className={`${isHovering ? "team__list" : "team__list-hover"}`}>
                        {getTeam?.data?.results?.map((item: any, index: number) => {
                            return (
                                <TeamItem
                                    handleChangeTick={handleChangeTick}
                                    item={item}
                                    key={index}
                                    checkDelete={checkDelete}
                                    setOpenGrid={setOpenGrid}
                                />

                            );
                        })}
                    </div>
                    {openModal && (
                        <TeamAddModal
                            setOpenModal={setOpenModal}
                            setChangeTeam={setChangeTeam}
                            setTeamPage={setTeamPage}
                        />
                    )}
                </>
            ) : teamPage == "addchoosevoter" ? (
                <AddChoose isHovering={isHovering} setTeamPage={setTeamPage}/>
            ) : null}
        </div>
    );
};

export default Team;
