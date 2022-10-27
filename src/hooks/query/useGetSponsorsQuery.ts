import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetSponsorsQuery = ({
  page,
  election,
  status,
  main,
  update,
  enabled,
}: {
  page?: number;
  election: number;
  status?: any;
  main?: any;
  update: number;
  enabled: boolean;
}) => {
  return useQuery(
    ["use-get-sponsors", election, update],
    async () => {
      const { data } = await request.get(`/election/sponsors/`, {
        params: { page, election, status, main },
      });
      return data;
    },
    { enabled: enabled }
  );
};
