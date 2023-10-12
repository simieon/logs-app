import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { MainPage } from "./pages/main/MainPage";


export const useRoutes = (isAuthenticated: boolean) =>{
  if(isAuthenticated){
    return(
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/*" element={<Navigate to="/main"/>} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path="/*" element={<Navigate to="/login"/>} />
    </Routes>
  )
}