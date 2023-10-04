import { FaAmazonPay, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const SelectedClass = ({ Class, index }) => {
    const { name, picture, price } = Class;
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
                    if(data.deletedCount>0){
                        
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )                      
                    }
                })
            }
        })
    }
    return (
        <tr className='w-full'>
            <td>
                {index + 1}
            </td>
            <td>
                <img src={picture} alt="" className='rounded-full w-16 h-16' />
            </td>
            <td>
                {name}
            </td>
            <td>
                ${price}
            </td>
            <td>
                <button className="text-white  btn btn-accent btn-md  rounded-full"><FaAmazonPay className="text-2xl"></FaAmazonPay></button>
                <button onClick={() => handleDelete(Class)} className="text-white btn  px-4 btn-error ml-2 btn-md rounded-full text-2xl"><FaTrashAlt></FaTrashAlt></button>

            </td>
        </tr>
    );
};

export default SelectedClass;