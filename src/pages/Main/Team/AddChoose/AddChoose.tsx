import "./style.css";
import closeIcon from "assets/images/closeicon.svg";
import ChooseItem, {ChooseItemProps} from "./ChooseItem";
import {Input} from "@mantine/core";
import {ReactComponent as SearchIcon} from "assets/images/search.svg";
import Button from "components/Button/Button";
import React, {ChangeEvent, useState} from "react";
import {useGetTeamQuery, useGetTeamWithChoosingQuery} from "hooks/query";
import {useCreateTeamWithChoosingMutation} from "hooks/mutation";
import {useLocation} from "react-router-dom";
import toast from "react-hot-toast";
import {useElectionContext} from "../../../../context/ElectionContext";


type AddChooseProps = {
    setTeamPage: any;
    isHovering: boolean;
};
const AddChoose: React.FC<AddChooseProps> = ({setTeamPage, isHovering}) => {
    const [teammates, setTeammateData] = useState<number[]>([]);
    const useGetTeamWithChoosing = useGetTeamWithChoosingQuery({page: 1, election: 1});
    const createTeamWithChoosing = useCreateTeamWithChoosingMutation();
    const {electionId} = useElectionContext();


    const handleOnChoose = (e: ChangeEvent<HTMLInputElement>, data: ChooseItemProps["item"]) => {
        if (e?.target?.checked) {
            setTeammateData([...teammates, data?.id])
        } else {
            setTeammateData(teammates.filter((item) => item !== data.id))
        }
    }

    const handleAddTeammate = () => {
        const chooseTeamMates = createTeamWithChoosing.mutateAsync({election: electionId, teammates})
        chooseTeamMates.then((res) => {
            toast.success("Teammates added successfully")

        }).catch((err) => {
            toast.error(err.message)
        })
    }


    return (
        <div className="addchoose">
            <div className="addchoose__top">
                <h2>Add teammate</h2>
                <img
                    onClick={() => setTeamPage("team")}
                    src={closeIcon}
                    alt="close-icon"
                />
            </div>
            <div className="addchoose__input">
                <Input
                    icon={<SearchIcon/>}
                    variant="filled"
                    placeholder="Search"
                    radius="lg"
                />
                <Button onClick={handleAddTeammate}>Add</Button>
            </div>
            <div
                className={`${
                    isHovering ? "addchoose__list" : "addchoose__list-hover"
                }`}
            >
                {useGetTeamWithChoosing?.data?.results.map((item: any, index: number) => {
                    return <ChooseItem handleOnChoose={handleOnChoose} item={item} key={index}/>;
                })}
            </div>
        </div>
    );
};

export default AddChoose;
