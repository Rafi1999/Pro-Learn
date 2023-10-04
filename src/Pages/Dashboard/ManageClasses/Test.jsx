import axios from "axios";
//import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { TiCancel } from "react-icons/ti";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlinePending } from "react-icons/md";


const ManageClass = ({ Class, index , refetch}) => {
  const {
    
    image,
    instructorName,
    instructorEmail,
    availableSeats,
    price,
    name,
    status,
  } = Class;


  const userStatusDataFetch = (user, status) => {
    
    axios
      .patch(`http://localhost:5000/add_class/${user._id}`, {
        status: status,
      })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user.name} is an ${status} Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.error(error));
  }

  const handlePending = (user) => {
    userStatusDataFetch(user,"pending")
  }
  const handleApproved = (user) => {
    userStatusDataFetch(user,"approved")
  }

  const handleDenied = (user) => {

    userStatusDataFetch(user,"denied")
    // axios
    //   .patch(`http://localhost:5000/add_class/${user._id}`, {
    //     status: "deny",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.modifiedCount) {
    //       refetch();
    //       Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: `${user.name} is an Deny Now!`,
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   })
    //   .catch((error) => console.error(error));
  };

  return (
    <tr className="w-full">
      <td>{index + 1}</td>
      <td>
        <div className="mask mask-squircle w-12 h-12">
          <img src={image} />
        </div>
      </td>
      <td>
        <div className="font-bold">{name}</div>
        
        <div className={`text-sm opacity-[75%] ${(status === "approved") ? "text-[green]" : (status === "denied") ? "text-[red]" : (status === "pending") ? "text-[#ef9b0f]": ""} `}>{status}</div>
      </td>
      <td>{instructorName}</td>
      <td>{instructorEmail}</td>
      <td>{availableSeats}</td>
      <td className="text-right">$ {price}</td>
      <td className="md:w-1/5 w-full">
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-1">
          <div 
            className="btn btn-sm rounded-full bg-warning text-[#fff]" 
            onClick={() => handlePending(Class)}
            disabled={status === "pending" ? true : false}
            ><MdOutlinePending /></div>
          <div
            className="btn btn-sm rounded-full bg-secondary text-[#fff]"
            disabled={status === "deny" ? false : (status === "pending") ? false : true}
            onClick={() => handleApproved(Class)}
          >
            <AiOutlineCheckCircle/>
          </div>
          <div
            title="Denied"
            onClick={() => handleDenied(Class)}
            disabled={(status === "deny") ? true : ((status === "approved") ? true : false)}
            className="btn btn-sm rounded-full bg-primary text-[#fff]"
          >
            <TiCancel/>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ManageClass;
