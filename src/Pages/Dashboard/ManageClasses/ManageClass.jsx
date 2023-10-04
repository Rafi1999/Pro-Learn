import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ManageClass =({Class,index,refetch}) => {    
    const {name,picture,instructorName,instructorEmail,availableSeats,price,status} = Class;
    // console.log(index);
    const handleApprove = Class => {
        fetch(`https://golingo-server.vercel.app/class/approve/${Class._id}`, {
          method: 'PATCH'
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${Class.name} is approved!`,
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
      }
    const handleDeny = Class => {
        fetch(`https://golingo-server.vercel.app/class/deny/${Class._id}`, {
          method: 'PATCH'
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${Class.name} is denied!`,
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
      }
      const handleFeedback = (Class) => {
        if (status === 'denied') {
          Swal.fire({
            title: 'Add Feedback',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: async (feedback) => {
              try {
                const response = await fetch(`https://golingo-server.vercel.app/class/feedback/${Class._id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ feedback }),
                });
                const data = await response.json();
                if (response.ok) {
                  refetch();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Feedback submitted!',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                } else {
                  throw new Error(data.message);
                }
              } catch (error) {
                Swal.showValidationMessage(`Request failed: ${error}`);
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Feedback submitted!',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      };
      
    //   const handleFeedback = Class =>{
    //     if(status === 'denied'){
    //         Swal.fire({
    //             title: 'Add Feedback',
    //             input: 'text',
    //             inputAttributes: {
    //               autocapitalize: 'off'
    //             },
    //             showCancelButton: true,
    //             confirmButtonText: 'Submit',
    //             showLoaderOnConfirm: true,
    //             preConfirm: async(login) => {
    //               console.log(login);
    //             },
    //             allowOutsideClick: () => !Swal.isLoading()
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //                 fetch(`https://golingo-server.vercel.app/class/feedback/${Class._id}`, {
    //                     method: 'PATCH'
    //                   })
    //             }
    //           })
    //     }
    //   }
    return (
        <tr className='w-full'>
        <td>
        {index+1}
        </td>
        <td>
            <img src={picture} alt=""  className='rounded-full w-14 h-12'/>
        </td>
        <td>
            {name}
        </td>
        <td>
            {instructorName}
        </td>
        <td>
            {instructorEmail}
        </td>
        <td>
            {availableSeats}
        </td>
        <td>
            ${price}
        </td>
        <td className="flex gap-2">
            {status === 'approved' ? <><button onClick={() => handleApprove(Class)} className="btn btn-xs w-20 h-9 btn-success" disabled>Approve</button>
                            <button onClick={() => handleDeny(Class)} className="btn btn-xs w-20 h-9 btn-error" disabled>Deny</button>
                            <Link to='/feedback' className="btn btn-xs w-20 h-9 btn-warning" disabled>Feedback</Link>
                            </>:
                            status === 'denied' ? <><button onClick={() => handleApprove(Class)} className="btn btn-xs w-20 h-9 btn-success" disabled>Approve</button>
                            <button onClick={() => handleDeny(Class)} className="btn btn-xs w-20 h-9 btn-error" disabled>Deny</button>
                            <button onClick={() => handleFeedback(Class)} className="btn btn-xs w-20 h-9 btn-warning">Feedback</button>
                            </>:  
                            <><button onClick={() => handleApprove(Class)} className="btn btn-success btn-xs w-20 h-9" >Approve</button>
                            <button onClick={() => handleDeny(Class)} className="btn btn-xs w-20 h-9 btn-error">Deny</button>
                            <button onClick={() => handleFeedback(Class)} className="btn btn-xs w-20 h-9 btn-warning">Feedback</button>
                            </>
                            }
        </td>
        </tr>
    );
};

export default ManageClass;