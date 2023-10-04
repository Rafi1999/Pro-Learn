import { Helmet } from "react-helmet";
import useEnrolled from "../../../hooks/useEnrolled";

const MyEnrolledClass = () => {
  const [enrolled] = useEnrolled();

  return (
    <>
      <Helmet>
        <title>Pro-Learn || My Enrolled Class</title>
      </Helmet>
      <div className="uppercase flex gap-16 my-5">
        <h3 className="text-3xl">Total Class : {enrolled.length}</h3>

      </div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {
              enrolled.map((Class, index) => <tr key={Class._id} className='w-full'>
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
                  ${Class.price}
                </td>
                
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyEnrolledClass;