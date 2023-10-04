
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import ManageClass from "./ManageClass";

import useAdminClass from "../../../hooks/useAdminClass";
import { Helmet } from "react-helmet";


const ManageClasses = () => {
  const [classes, ,refetch] = useAdminClass();
  return (
    <div className="p-5 ">
    <Helmet><title>Pro-Learn || Manage Class</title></Helmet>
      <SectionTitle title="Manage Classes" />
      
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Instructor name</th>
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {
              classes.map((Class, index) => <ManageClass Class={Class} index={index} key={index} refetch={refetch}/>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
