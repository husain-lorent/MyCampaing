import {useQuery} from "react-query";
import {request} from "services/api";

export const useCandidatesQuery = ({page, refresh }: { page: number, refresh: number}) => {
    return useQuery(["use-get-all-candidates", refresh], async () => {
        const {data} = await request.get(`/candidates`, {
            params: {page}
        
        });
        return data;
    });
};
