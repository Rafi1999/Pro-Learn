import { Link, NavLink } from "react-router-dom";
import { FaChalkboardTeacher, FaCode, FaShoppingCart } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import ViewMode from "../ViewMode/ViewMode";
import useSelect from "../../../hooks/useSelect";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
const Navbar = () => {
    const {user,logOut} = useContext(AuthContext);
    const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
    const [ selected ] = useSelect();
    const handleLogOut = () =>{
        logOut()
        .then(()=>{

        })
        .catch(err=>{console.log(err);})
    }
    const navOptions = <div className="md:flex items-center">
        <li>
      <NavLink
        to="/"
        exact
        activeClassName="text-red-500 bg-gray-100" // Customize these classes
        className="hover:text-gray-700"
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/classes"
        activeClassName="text-red-500 bg-gray-100" // Customize these classes
        className="hover:text-gray-700"
      >
        Classes
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/instructors"
        activeClassName="text-red-500 bg-gray-100" // Customize these classes
        className="hover:text-gray-700"
      >
        Instructors
      </NavLink>
    </li>
        { user ? <li><Link to="/dashboard/dashHome"><button className="btn gap-2 ">
  {isAdmin ? <GrUserAdmin></GrUserAdmin> : isInstructor ? <FaChalkboardTeacher></FaChalkboardTeacher> :<div className="flex justify-center items-center gap-3"><FaShoppingCart></FaShoppingCart> <div className="badge badge-secondary">+{selected?.length || 0}</div></div> }
</button></Link></li> : <Link to='login'><button className="btn gap-2 ">
  <FaShoppingCart></FaShoppingCart>
  <div className="badge badge-secondary">+{selected?.length || 0}</div>
</button></Link>}
    </div>
    return (
        <>
        <div className="navbar fixed z-10 bg-opacity-40 max-w-screen-xl bg-black text-white  md:h-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-5 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-700 md:bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost font-serif normal-case text-sm mr-4 md:text-2xl"><FaCode></FaCode> Pro-Learn</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                { user ? <>
                <img title={user.displayName} className="w-8 h-8 md:w-12 md:h-12 rounded-full mr-2" src={user.photoURL}></img>
                <Link onClick={handleLogOut} className="btn btn-sm md:btn-md mr-2 md:mr-4 text-xs md:text-md">LogOut</Link></> : <Link to='login' className="btn btn-sm md:btn-md mr-5 text-xs md:text-md">Login</Link>}
                <ViewMode></ViewMode>
            </div>
        </div>
    </>
    );
};

export default Navbar;