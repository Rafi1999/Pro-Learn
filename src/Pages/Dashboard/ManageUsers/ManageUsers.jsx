
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
//import ManageClass from "../ManageClasses/ManageClass";
//import { Link } from "react-router-dom";
import useUsers from "../../../hooks/useUsers";
//import ManageUser from './ManageUser';
import { Helmet } from "react-helmet";
import { FaChalkboardTeacher, FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, , refetch] = useUsers();
  const handleDelete = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://golingo-server.vercel.app/users/${user._id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                'Deleted!',
                `${user.name} has been deleted!`,
                'success'
              )
            }
          })
      }
    })
  }
  const handleAdmin = user => {
    fetch(`https://golingo-server.vercel.app/users/admin/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }
  const handleInstructor = user => {
    fetch(`https://golingo-server.vercel.app/users/instructor/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }
  return (
    <div className="p-5 ">
      <Helmet>
        <title>Pro-Learn || Manage Users</title>
      </Helmet>
      <SectionTitle title="Manage Users" />
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {
              users.map((User, index) =>
                <tr key={User._id}>
                  <td>{index + 1}</td>
                  <td><img src={User.picture} className="w-14 h-14 rounded-full" alt="" /></td>
                  <td>{User.name}</td>
                  <td>{User.email}</td>
                  <td>
                    {
                      User.role === 'admin' ? <><button onClick={() => handleAdmin(User)} className=" btn btn-accent text-xl" disabled><FaUserShield></FaUserShield></button>
                        <button onClick={() => handleInstructor(User)} className=" btn ml-2 btn-info text-xl "><FaChalkboardTeacher></FaChalkboardTeacher></button></> :
                        User.role === 'instructor' ? <><button onClick={() => handleAdmin(User)} className=" btn btn-accent text-xl" ><FaUserShield></FaUserShield></button>
                          <button onClick={() => handleInstructor(User)} className=" btn ml-2 btn-info text-xl " disabled><FaChalkboardTeacher></FaChalkboardTeacher></button></>
                          :
                          <><button onClick={() => handleAdmin(User)} className=" btn btn-accent text-xl" ><FaUserShield></FaUserShield></button>
                            <button onClick={() => handleInstructor(User)} className=" btn ml-2 btn-info text-xl "><FaChalkboardTeacher></FaChalkboardTeacher></button></>
                    }
                  </td>
                  <td>
                    <button onClick={() => handleDelete(User)} className="text-white btn btn-error  rounded-full "><FaTrashAlt></FaTrashAlt></button>
                  </td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;