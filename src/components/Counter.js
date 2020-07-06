import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Counter() {

const [counter, setCounter] = useState(0)


useEffect(() => { 

  const updateCounter = axios.put("/counters/2")
  const getCounter = axios.get("/counters/2")
  axios.all([updateCounter, getCounter]).then(axios.spread((...responses) => {
  const { data } = responses[1]
  setCounter(data.visited)

}))},[] )
   
  
return (

<div><h1>{counter}</h1></div>

)

}









