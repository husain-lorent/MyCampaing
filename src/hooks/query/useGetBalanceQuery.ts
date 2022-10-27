import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetBalanceQuery = ({
  page,
  election,
  status,
  main,
  update,
}: {
  page?: number;
  election?: number;
  status?: any;
  main?: any;
  update: number;
}) => {
  return useQuery(["use-get-balance", election, update], async () => {
    const { data } = await request.get(`/election/balance/`, {
      params: { page, election, status, main },
    });
    return data;
  });
};
