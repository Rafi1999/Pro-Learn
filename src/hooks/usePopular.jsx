
import { useEffect } from 'react';
import { useState } from 'react';

const usePopular = () => {
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/class/all')
        .then(res=>res.json())
        .then(data=>{
            setClasses(data);
            setLoading(false);
        });
    },[])
    return [classes,loading]
};

export default usePopular;
