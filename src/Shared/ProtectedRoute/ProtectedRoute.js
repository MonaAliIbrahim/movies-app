import React from 'react';
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({userData,children}) {
  if(!userData && !localStorage.getItem('userToken')) {
    return <Navigate to='/login'/>
  }else {
    return children;
  }
}
