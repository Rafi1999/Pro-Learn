import { Helmet } from 'react-helmet';
import Class from './Class';
import { useEffect, useState } from 'react';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    useEffect(()=>{
        fetch('https://golingo-server.vercel.app/class/all')
        .then(res=>res.json())
        .then(data=>{
            setClasses(data);
        });
    },[])
    console.log(classes);
    return (
        <>
        <Helmet>
                <title>Pro-Learn | Classes</title>
            </Helmet>
        <div>
            <h2 className='pt-32 text-center text-3xl uppercase py-4'>Classes</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {classes.map((classItem) => (
                    <Class key={classItem._id} classItem={classItem}/>
                ))}
            </div>
        </div>
        </>
        
    );
};

export default Classes;