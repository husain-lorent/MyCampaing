import { useQuery } from "react-query";
import { request } from "services/api";

export const useVoterGetIdQuery = ({ id }: { id: number }) => {
    return useQuery(["use-get-voter", id], async () => {
        const { data } = await request.get(`/voters/`, {
            params: { id },
        });
        return data;
    });
};
