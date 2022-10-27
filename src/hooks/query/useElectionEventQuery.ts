import {useQuery} from "react-query";
import {request} from "services/api";

export const useElectionEventQuery = () => {
    return useQuery(["use-get-all-event-query"], async () => {
        const {data} = await request.get(`/election/event/`);
        return data;
    });
};