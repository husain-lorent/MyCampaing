import {useQuery} from "react-query";
import {request} from "services/api";

export const useGetTeamWithChoosingQuery = ({page, election}: { page: number, election: number }) => {
    return useQuery(["use-get-team-with-choosing-query", page, election], async () => {
        const {data} = await request.get(`/team/choose/`, {
            params: {page, election}
        });
        return data;
    });
};
