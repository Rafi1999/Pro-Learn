import { FaTrashAlt } from "react-icons/fa";

const ManageUser = ({User,index}) => {
    const {name,picture,email} = User;   
    // console.log(index);
    return (
        <tr className='w-full'>
        <td>
        {index+1}
        </td>
        <td>
            <img src={picture} alt=""  className='rounded-full w-16 h-16'/>
        </td>
        <td>
            {name}
        </td>
        <td>
            {email}
        </td>
        <td>
        <button onClick={() => handleDelete(Class)} className="text-white btn  px-4 btn-error ml-2 btn-md rounded-full text-2xl"><FaTrashAlt></FaTrashAlt></button>
        </td>
        </tr>
    );
};

export default ManageUser;