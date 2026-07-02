import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../pages/register"
import Login from "../pages/login"
import Index from "../pages";
import Profile from "../pages/profile"
import ProtectedRouter from "./ProtectedRouter"
import EditorRoute from "../pages/editorRoute"
import RoutesPage from "../pages/routesPage";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<Register/>}/>
                <Route path="/" element={<Index/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/routes/public" element={<RoutesPage isPublic={true}/>}/>


                <Route path="/profile"
                    element={
                        <ProtectedRouter>
                            <Profile />
                        </ProtectedRouter>
                    }/>
                <Route path="/routes/create"
                element={
                    <ProtectedRouter>
                        <EditorRoute mode="create"/>
                    </ProtectedRouter>
                }/>
                <Route path="/routes/private"
                element={
                    <ProtectedRouter>
                        <RoutesPage isPublic={false}/>
                    </ProtectedRouter>
                }/>
            </Routes>
        </BrowserRouter>
    )
}