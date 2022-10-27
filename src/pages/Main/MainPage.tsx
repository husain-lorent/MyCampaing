import "./style.css";
import { useState } from "react";
import Team from "./Team/Team";
import Voter from "./Voter/Voter";
import Event from "./Event/Event";
import Budgeting from "./Budgeting/Budgeting";
import CustomTable from "components/Table/Table";
import Candidates from "./Candidates/Candidates";
import { Container, SimpleGrid } from "@mantine/core";
import SliderStatistic from "components/SliderStatistic/SliderStatistic";
import OutlineSlider from "components/OutlineSlider/OutlineSlider";

import VoterDetails from "./Voter/VoterDetails/VoterDetails";
import Notes from "./Notes/Notes";
import VoterAdd from "./Voter/VoterAdd/VoterAdd";
import VoterEdit from "./Voter/VoterEdit/VoterEdit";
import EditSocmedia from "./Voter/VoterEdit/Edit-Socmedia/EditSocmedia";
import VoterSocMedia from "./Voter/VoterAdd/VoterAdd-SocMedia/VoterSocMedia";

import { useAccountPopup } from "context/AccountPopupContext";
import AddTeam from "./Team/AddTeam/AddTeam";
import TeamDetails from "./Team/TeamDetails/TeamDetails";
import { useCandidatesQuery } from "hooks/query";
import { useStatesPopup } from "context/MainStatesContext";
import { Loader } from "@mantine/core";
import SkletonTable from "components/Table/SkletonTable";
import SliderSkleton from "components/Slider/SliderSkleton/SliderSkleton";
import SkletonCard from "components/Card/SkletonCard/SkletonCard";

const MainPage = () => {
  const [openGrid, setOpenGrid] = useState("");
  const [changeTeam, setChangeTeam] = useState("team");
  const { handleMouseOver, handleMouseOut } = useAccountPopup();

  const { refreshCandidates, setRefreshCandidates } = useStatesPopup();
  const CandidatesList = useCandidatesQuery({
    page: 1,
    refresh: refreshCandidates,
  });

  return (
    <div className="main">
      <Container size="xl">
        <OutlineSlider />
        <SimpleGrid cols={3} spacing="lg">
          {openGrid != "team" && openGrid != "team_detail" ? (
            <Voter setOpenGrid={setOpenGrid} />
          ) : null}
          {openGrid == "voterdetails" ? (
            <VoterDetails setOpenGrid={setOpenGrid} />
          ) : openGrid == "voteradd" ? (
            <VoterAdd setOpenGrid={setOpenGrid} />
          ) : openGrid == "addvoter-socmedia" ? (
            <VoterSocMedia setOpenGrid={setOpenGrid} />
          ) : openGrid == "editvoter" ? (
            <VoterEdit setOpenGrid={setOpenGrid} />
          ) : openGrid == "editvoter-socmedia" ? (
            <EditSocmedia setOpenGrid={setOpenGrid} />
          ) : null}
          <SimpleGrid cols={1} spacing="lg">
            <Event />
            <Budgeting />
          </SimpleGrid>
          {openGrid != "voter" &&
          openGrid != "voteradd" &&
          openGrid != "teamdetails" &&
          openGrid != "voterdetails" &&
          openGrid != "voteradd" &&
          openGrid != "addvoter-socmedia" &&
          openGrid != "editvoter" &&
          openGrid != "editvoter-socmedia" ? (
            <SimpleGrid cols={1} spacing="lg" className="tt">
              <div>
                {changeTeam == "team" ? (
                  <div>
                    <div
                      className="notehover"
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <Team
                        setChangeTeam={setChangeTeam}
                        setOpenGrid={setOpenGrid}
                      />
                    </div>
                    <div>
                      <Notes />
                    </div>
                  </div>
                ) : changeTeam == "addteam" ? (
                  <AddTeam setChangeTeam={setChangeTeam} />
                ) : null}
              </div>
            </SimpleGrid>
          ) : null}
          {openGrid == "team_detail" ? (
            <TeamDetails setOpenGrid={setOpenGrid} />
          ) : null}
        </SimpleGrid>
      </Container>
      <Candidates CandidatesList={CandidatesList} />
  
      {/* {CandidatesList.isLoading ? (
        <Loader />
      ) : (
        <Candidates CandidatesList={CandidatesList} />
      )} */}

      {CandidatesList.isLoading ? (
        <SliderSkleton />
      ) : (
        <SliderStatistic CandidatesList={CandidatesList} />
      )}

      <div className="table-container">
        <Container size="xl">
          {CandidatesList.isLoading ? (
            <SkletonTable />
          ) : (
            <CustomTable
              CandidatesList={CandidatesList}
              verticalSpacing={"md"}
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default MainPage;
