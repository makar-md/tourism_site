import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../pages/register"
import Login from "../pages/login"
import Index from "../pages";
import Profile from "../pages/profile"
import ProtectedRouter from "./ProtectedRouter"
import CreateRoute from "../pages/createRoute"

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<Register/>}/>
                <Route path="/" element={<Index/>}/>
                <Route path="/login" element={<Login/>}/>


                <Route path="/profile"
                    element={
                        <ProtectedRouter>
                            <Profile />
                        </ProtectedRouter>
                    }/>
                <Route path="/routes/create"
                element={
                    <ProtectedRouter>
                        <CreateRoute />
                    </ProtectedRouter>
                }/>
            </Routes>
        </BrowserRouter>
    )
}