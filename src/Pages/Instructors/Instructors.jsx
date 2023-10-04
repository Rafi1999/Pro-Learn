
import { Helmet } from "react-helmet";
//import useUsers from "../../hooks/useUsers";
import { useEffect, useState } from "react";

const Instructors = () => {
    
    const [instructors, setInstructors] = useState([]);
    useEffect(()=> {
      fetch('https://golingo-server.vercel.app/users/ins')
      .then(res => res.json())
      .then(info => setInstructors(info));
    }, []);
    //const [users] = useUsers();

    // Filter only the instructors from the users array
    // const instructors = users.filter(user => user.role === "instructor");

    return (
        <>
            <Helmet>
                <title>Pro-Learn | Instructors</title>
            </Helmet>
            <div>
                <h2 className='pt-32 text-center text-3xl uppercase py-4'>Instructors</h2>
                <div className='md:grid grid-cols-3 justify-center items-center gap-5 my-5'>
                    {
                        instructors.map((ins, index) => (
                            <div key={index} className="card md:w-96 h-96 bg-teal-700 shadow-xl mb-12">
  <figure className="px-10 pt-10">
    <img src={ins.picture} className="rounded-lg w-64 h-64 mt-5 object-cover" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-white">Name : {ins.name}</h2>
    <p className="text-white">Email : {ins.email}</p>
    
  </div>
</div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Instructors;
