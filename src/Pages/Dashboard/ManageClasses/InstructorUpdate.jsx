import { useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const InstructorUpdate = () => {
    const InstructorClassID = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [updated, setUpdated] = useState();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const instructorClassLoad = async () => {
            const res = await axios.get(
                `https://golingo-server.vercel.app/class/ins/${InstructorClassID?.id}`
            );
            const data = res.data;
            setUpdated(data[0]);
        };

        instructorClassLoad();
    }, []); // empty dependency array ensures it runs only once

    const update_class_url = `https://golingo-server.vercel.app/class/ins/${InstructorClassID?.id}`;

    const onSubmit = (data) => {
        // Convert availableSeats and price to numbers
        data.availableSeats = parseInt(data.availableSeats, 10);
        data.price = parseFloat(data.price);

        //default check
        const defaultClassName = updated?.name || "";
        const defaultPicture = updated?.picture || "";
        const defaultInstructorName = user?.displayName || "";
        const defaultInstructorEmail = user?.email || "";

        data.name = data.name || defaultClassName;
        data.picture = data.picture || defaultPicture;
        data.instructorName = data.instructorName || defaultInstructorName;
        data.instructorEmail = data.instructorEmail || defaultInstructorEmail;

        data.status = "pending";
        data.feedback = "Awaiting admin review";
        axios
            .patch(update_class_url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                const data = response.data;

                if (data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Class is updated!", "success");
                    navigate("/");
                    reset();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };



    return (
        <div className="px-5">
            <SectionTitle title="Update Class" />
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
                            defaultValue={updated?.name}
                            {...register("name")}
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
                            defaultValue={updated?.picture}
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

export default InstructorUpdate;