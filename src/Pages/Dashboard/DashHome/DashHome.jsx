import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const DashHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex flex-col justify-center items-center animate-bounce">
            <h2 className="mt-5 text-3xl font-medium text-warning">Welcome {user.displayName}</h2>
            <img className="mt-2 rounded-full w-[90px] h-[90px]" src={user.photoURL} alt="" />
        </div>
    );
};

export default DashHome;