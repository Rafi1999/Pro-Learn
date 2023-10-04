import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./UseAxiosSecure";
const useEnrolled = () => {
    const {user,loading} = useContext(AuthContext);
    //const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: enrolled = [] } = useQuery({
        queryKey: ['enrolled', user?.email],
        enabled : !loading,
        // queryFn: async()=>{
        //     const response = await fetch(`https://golingo-server.vercel.app/enrolled?email=${user?.email}`,{
        //         headers : {
        //             authorization : `bearer ${token}`
        //         }
        //     });
        //     return response.json();
        // },
        queryFn: async()=>{
            const response = await axiosSecure(`/payments?email=${user?.email}`);
            console.log('res from axios',response);
            return response.data;
        },
      })
      return [enrolled,refetch]
};

export default useEnrolled;