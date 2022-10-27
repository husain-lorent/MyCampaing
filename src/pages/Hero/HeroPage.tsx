import React from "react";
import "./styless.css";
import {createSearchParams, Link, useLocation, useNavigate} from "react-router-dom";
import {useUserContext} from "context/UserContext";
import {ReactComponent as IconArrow} from "assets/images/icon-arrow.svg";
import {useGetElectionQuery} from "hooks/query";
import Button from "../../components/Button";


const HeroPage = () => {
    const {mainUser} = useUserContext();
    const navigate = useNavigate();
    const electionList = useGetElectionQuery({page: 1});
    const election_id = electionList?.data?.results?.[0]?.id
    console.log(electionList, "electionList")

    const handleNavigateMain = () => {
        election_id && localStorage.setItem("election_id", election_id)
        navigate({
            pathname: "/",
            search: createSearchParams({
                election_id
            }).toString()
        })
    }

    // useEffect(() => {
    //     navigate("/", {
    //         state: {...state, election_id: electionList?.data?.results?.[0]?.id}
    //     })
    // }, [electionList.isSuccess]);


    return (
        <div className="hero_wrapper">
            <h3>
                Hello Mr. {mainUser?.first_name}! <br/> your path of becoming a{" "}
                {mainUser?.goal}
            </h3>
            <h1>
                You are here <br/>
                to win! 🔥
            </h1>
            <div className="icon__arrow">
                <div style={{cursor: "pointer"}} onClick={handleNavigateMain}>
                    <IconArrow/>
                </div>
            </div>
        </div>
    );
};

export default HeroPage;
