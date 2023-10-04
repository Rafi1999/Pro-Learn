import { Helmet } from "react-helmet";
import useInstructorClass from "../../../hooks/useInstructorClass";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";


const InstructorClass = () => {
    const [Classes] = useInstructorClass();
    return (
        <>
      <Helmet>
        <title>Pro-Learn || My Class</title>
      </Helmet>
      <SectionTitle title="Instructor Class" />
      <div className="uppercase flex gap-16 my-5">
        <h3 className="text-3xl">Total Class : {Classes.length}</h3>

      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Enrolled Student</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {
              Classes.map((Class, index) => <tr key={Class._id} className='w-full'>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img src={Class.picture} alt="" className='rounded-full w-16 h-16' />
                </td>
                <td>
                  {Class.name}
                </td>
                <td>
                  {Class.availableSeats}
                </td>
                <td>
                  {Class.status}
                </td>
                {
                    Class.status === 'denied' ? <td>{Class.feedback}</td>: <td></td>
                }
                <td> <Link to={`/dashboard/instructorUpdate/${Class?._id}`} className="btn btn-xs rounded-lg h-8 w-20 btn-info">Update</Link> </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </>
    );
};

export default InstructorClass;