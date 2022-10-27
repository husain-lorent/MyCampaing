import { useQuery } from "react-query";
import { request } from "services/api";

export const useGetTransactionsQuery = ({
  page,
  election,
  status,
  sponsor,
  year,
  month,
  type_transaction,
  enabled,
  update,
}: {
  page?: number;
  election?: number;
  status?: any;
  sponsor?: number;
  year?: any;
  month?: string;
  type_transaction?: string;
  enabled: any;
  update: number;
}) => {
  return useQuery(
    [
      "use-get-transactions",
      election,
      status,
      sponsor,
      year,
      month,
      type_transaction,
      page,
      update,
    ],
    async () => {
      const { data } = await request.get(`/election/transactions/`, {
        params: {
          page,
          election,
          status,
          sponsor,
          year,
          month,
          type_transaction,
        },
      });
      return data;
    },
    { enabled: enabled }
  );
};
