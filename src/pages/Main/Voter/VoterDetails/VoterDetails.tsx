import React from "react";
import "./style.css";
import phone from "assets/images/phone.svg";
import {Input, Textarea} from "@mantine/core";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import {useGetVoterQuery} from "hooks/query";
import backIcon from "../../../../assets/images/backicon.svg";
import {useVoterGetIdQuery} from "hooks/query";

const socicons = [facebook, telegram, instagram, phone];

type VoterDetails = {
    setOpenGrid: boolean | any;
};
const VoterDetails: React.FC<VoterDetails> = ({setOpenGrid}) => {
    const useGetVoter = useGetVoterQuery({id: 1});
    return (
        <div className="voterdetails__wrapper">
            <div className="voterdetails__top">
                <img src={backIcon} onClick={setOpenGrid}/>
                <button
                    onClick={() => {
                        setOpenGrid("editvoter");
                    }}
                >
                    Edit
                </button>
            </div>
            <div className="voterdetails__info">
                <div className="voterdetails__soc-info">
                    <h2>
                        {useGetVoter.data?.first_name} {useGetVoter.data?.last_name}
                    </h2>
                    <p>ooo “Organization” {useGetVoter.data?.organization}</p>
                    <div className="voterdetails__socicons">
                        {socicons.map((icon, index) => (
                            <img src={icon} alt="icon" key={index}/>
                        ))}
                    </div>
                </div>
                <div className="voterdetails__img-profile">
                    <img
                        src="https://img.freepik.com/free-photo/closeup-portrait-beautiful-smiling-brunette-model-trendy-girl-posing-street_158538-17019.jpg?w=360"/>
                </div>
            </div>
            <div className="voterdetails__voting">
                <h3>Voting For</h3>
                <img
                    src="https://media.istockphoto.com/photos/headshot-portrait-of-smiling-male-employee-in-office-picture-id1309328823?k=20&m=1309328823&s=170667a&w=0&h=oMsI5ZENn4zVrZAjO1g36r7c_enSMkuw11cdBd4jrls="
                    alt="profile-img"
                />
            </div>
            <div className="voterdetails__comments">
                <p>Comments</p>
                <Textarea withAsterisk/>
            </div>
            <div className="voterdetails__invite">
                <p>Invite people</p>
                <Input/>
            </div>
            <div className="voterdetails__bottom-info">
                <p>Result</p>
                <div className="voterdetails__result">
                    <h3>Saidamir Bakhromov</h3>
                    <p>20+</p>
                </div>
            </div>
        </div>
    );
};

export default VoterDetails;
