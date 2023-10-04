import { useContext } from "react";
import useAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useAdminClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const {loading} = useContext(AuthContext);
    const {data : classes = [],refetch} = useQuery([],{
        enabled: !loading,
        queryFn : async()=>{
            const res = await axiosSecure.get('/class')
            return res.data;
        }
    })
    return [classes,loading,refetch];
};

export default useAdminClass;
