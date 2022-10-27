import {createContext, useState, useContext} from "react";
import {getStorage} from "utils/helpers/local-storage";
import {useLocation} from "react-router-dom";

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [mainUser, setMainUser] = useState(JSON.parse(getStorage("user") || "{}") || {});
    const {state} = useLocation();
    const [mainUsers, setMainsUser] = useState(JSON.parse(getStorage("accounts") || "[]") || []);
    const [electionMain, setElectionMain] = useState(state?.election_id);
    const [userMain, setUserMain] = useState(getStorage("user_id"));

    return (<UserContext.Provider
        value={{
            mainUser, setMainUser, mainUsers, setMainsUser, electionMain, setElectionMain, setUserMain, userMain,
        }}
    >
        {children}
    </UserContext.Provider>);
}
