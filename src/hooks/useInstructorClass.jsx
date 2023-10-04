import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./UseAxiosSecure";

const useInstructorClass = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["instructor", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const response = await axiosSecure(`/class/ins?email=${user?.email}`);
      console.log(response);
      return response.data;
    },
  });

  return [classes, refetch];
};

export default useInstructorClass;
