

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxiosSecure";

const useUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], isLoading: loading, refetch } = useQuery(
    ["users"], {
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`)
      return res.data;
    }
  })

  return [users, loading, refetch];
};

export default useUsers;
