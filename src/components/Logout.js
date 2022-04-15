import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies  from 'universal-cookie';

function Logout() {
    const cookies = new Cookies();
    cookies.remove("TOKEN", { path: "/" });
  return (
    <Navigate to="/login" />  )
}

export default Logout