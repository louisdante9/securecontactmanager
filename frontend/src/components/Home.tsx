import React, {useState,useEffect} from  'react';
import {API} from '../actions';
import Signup from './auth/Signup';
import Signin from './auth/Signin';

const Home = () => {
    const [data, setData] = useState(false)
    useEffect(() => {
        fetch(`${API}/v1/`)
          .then((result) => result.json())
          .then(({file}) => setData(file))
          .catch((err) => err);
    }, []);
  return (
      data ?  <Signin /> :  <Signup />
  );
};

export default Home;