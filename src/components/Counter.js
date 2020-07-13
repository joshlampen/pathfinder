import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Counter(props) {
  const [counter, setCounter] = useState(2137);
  const { incrementCounter } = props;

  useEffect(() => { 
    Promise.resolve(axios.get("/counters/1"))
      .then(response => {
        setCounter(response.data.visited);
      })
  }, [incrementCounter]);
    
    
  return (
    <span className='viewcount'>
      {counter} paths visualized
    </span>
  )
}      
