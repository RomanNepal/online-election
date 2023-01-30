import React,{useEffect} from "react";

const Election = () => {
  useEffect(()=>{
    console.log('inside useeffect')
  },[])
  return <div>Election</div>;
};

export default Election;
