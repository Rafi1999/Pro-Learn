import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./UseAxiosSecure";
const useSelect = () => {
    const {user,loading} = useContext(AuthContext);
    //const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: selected = [] } = useQuery({
        queryKey: ['selected', user?.email],
        enabled : !loading,
        // queryFn: async()=>{
        //     const response = await fetch(`http://localhost:5000/selected?email=${user?.email}`,{
        //         headers : {
        //             authorization : `bearer ${token}`
        //         }
        //     });
        //     return response.json();
        // },
        queryFn: async()=>{
            const response = await axiosSecure(`/selected?email=${user?.email}`);
            console.log('res from axios',response);
            return response.data;
        },
      })
      return [selected,refetch]
};

export default useSelect;