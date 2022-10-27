import "./styless.css";
import React, {useState} from "react";
import CustomModal from "components/Modal/Modal";
import {useGetElectionQuery} from "hooks/query";
import {useAccountPopup} from "context/AccountPopupContext";
import ViewAccountComponent from "./Account/ViewAccountComponent";
import ProfileSideBarComponent from "./Sidebar/ProfileSideBarComponent";
import EditElectionComponent from "./EditElection/EditElectionComponent";
import CreateElectionComponent from "./CreateElection/CreateElectionComponent";

const ProfileComponent = () => {
    const {opened, setOpened} = useAccountPopup();
    const [view, setView] = useState("account");
    const [onChangeMail, setOnChangeMail] = useState("");
    const [userId, setUserId] = useState(0);

    const electionList = useGetElectionQuery({
        page: 1,
        userId: userId,
        enabled: userId !== 0,
    });


    return (
        <>
            <CustomModal opened={opened} onClose={() => setOpened(false)} size="80%">
                <div className="inner__sidebar">
                    <ProfileSideBarComponent
                        setView={setView}
                        setOnChangeMail={setOnChangeMail}
                        setUserId={setUserId}
                        electionList={electionList.data}
                    />
                    <div className="rightsidebar__wrapper">
                        {view == "account" ? (
                            <ViewAccountComponent
                                onChangeMail={onChangeMail}
                                setOnChangeMail={setOnChangeMail}
                            />
                        ) : null}
                        {view == "create" ? <CreateElectionComponent refetch={electionList.refetch}/> : null}
                        {view == "edit" ? <EditElectionComponent/> : null}
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default ProfileComponent;
