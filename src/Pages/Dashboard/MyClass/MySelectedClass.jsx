import { Helmet } from "react-helmet";
import useSelect from "../../../hooks/useSelect";
//import SelectedClass from "./SelectedClass";
import Swal from "sweetalert2";
import {  FaTrashAlt } from "react-icons/fa";

const MySelectedClass = () => {
  const [selected, refetch] = useSelect();
  const handleDelete = (Class) => {
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
            fetch(`https://golingo-server.vercel.app/Selected/${Class._id}`,{
                method : 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
              console.log(data);
                if(data.deletedCount>0){
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        'Class has been removed.',
                        'success'
                      )                      
                }
            })
        }
    })
}
  //const total = selected.reduce((sum,select)=>select.price + sum,0)
  return (
    <>
      <Helmet>
        <title>Pro-Learn || My Selected Class</title>
      </Helmet>
      <div className="uppercase flex gap-16 my-5">
        <h3 className="text-3xl">Total Class : {selected.length}</h3>

      </div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Image</th>
              <th>Class name</th>
              <th>Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {
              selected.map((Class, index) => <tr key={Class._id} className='w-full'>
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
                <td>
                  <button onClick={() => handleDelete(Class)} className="text-white btn  px-4 btn-error ml-2 btn-md rounded-full text-2xl"><FaTrashAlt></FaTrashAlt></button>
                </td>
              </tr>)
            }

          </tbody>
        </table>
      </div>
    </>
  );
};

export default MySelectedClass;