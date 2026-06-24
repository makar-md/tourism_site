import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../pages/register"

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}