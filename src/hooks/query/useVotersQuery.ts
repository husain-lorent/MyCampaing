import {useQuery} from "react-query";
import {request} from "services/api";

export const useVotersQuery = ({
                                   page,
                                   election,
                                   status,
                                   main,
                                   refresh,
                               }: {
    page?: number;
    election?: number;
    status?: string;
    main?: string;
    refresh?: number;
}) => {
    return useQuery(
        ["use-get-all-voters", page, election, status, main, refresh],
        async () => {
            const {data} = await request.get(`/voters`, {
                params: {page, election, status, main},
            });
            return data;
        }
    );
};
