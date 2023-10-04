import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import useInstructor from "../../../hooks/useInstructor";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet";

const AddClass = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isInstructor] = useInstructor();
  const add_class_url = "http://localhost:5000/class";

  const onSubmit = (data) => {
    data.instructorPic = user.photoUrl;
    data.status = "pending";
    data.feedback = 'Awaiting admin review';
    console.log(data);

    axios.post(add_class_url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const data = response.data;
        if (data.insertedId) {
          Swal.fire("Created!", "A new class is added!", "success");
          navigate('/dashboard/addClass')
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };

  return (
    <div className="px-5">
    <Helmet><title>Pro-Learn || Add Class</title></Helmet>
      <SectionTitle title="Add Class" />
      {
        isInstructor ? '' : <div className="">
          <Link
            to="/dashboard/manageClasses"
            className="btn btn-sm bg-secondary text-[#fff]"
          >
            {" "}
            <FaArrowLeft />{" "}
          </Link>
        </div>
      }
      <div className="max-w-md mx-auto h-auto flex flex-col justify-center py-5 bg-slate-100">
        <form className="shadow-md p-9" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="className" className="text-sm font-medium">
              Class Name
            </label>
            <input
              type="text"
              id="className"
              className="w-full px-3 py-2 border rounded"
              {...register("name", { required: true })}
            />
            {errors.className && (
              <span className="text-red-500">Class Name is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="instructorName" className="text-sm font-medium">
              Instructor Name
            </label>
            <input
              type="text"
              value={user?.displayName}
              id="instructorName"
              className="w-full px-3 py-2 border rounded"
              {...register("instructorName", { required: true })}
            />
            {errors.instructorName && (
              <span className="text-red-500">Instructor Name is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="instructorEmail" className="text-sm font-medium">
              Instructor Email
            </label>
            <input
              type="email"
              id="instructorEmail"
              value={user?.email}
              className="w-full px-3 py-2 border rounded"
              {...register("instructorEmail", { required: true })}
            />
            {errors.instructorEmail && (
              <span className="text-red-500">Instructor Email is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="availableSeats" className="text-sm font-medium">
              Available Seats
            </label>
            <input
              type="number"
              id="availableSeats"
              className="w-full px-3 py-2 border rounded"
              {...register("availableSeats", { required: true })}
            />
            {errors.availableSeats && (
              <span className="text-red-500">Available Seats is required</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full px-3 py-2 border rounded"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </div>

          <div className="mb-4 ">
            <label htmlFor="image" className="text-sm font-medium">
              Class Image
            </label>
            <input
              type="text"
              id="image"
              className="w-full px-3 py-2 border rounded"
              {...register("picture")}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
