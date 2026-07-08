import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../pages/register"
import Login from "../pages/login"
import Index from "../pages";
import Profile from "../pages/profile"
import ProtectedRouter from "./ProtectedRouter"
import EditorRoute from "../pages/editorRoute"
import RoutesPage from "../pages/routesPage";
import ChangeRoles from "../pages/changeRoles";

export default function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<Register/>}/>
                <Route path="/" element={<Index/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/routes/public" element={<RoutesPage mode="public"/>}/>
                <Route path="/routes/:id" element={<EditorRoute mode="viewing" />} />


                <Route path="/profile" element={
                    <ProtectedRouter>
                        <Profile />
                    </ProtectedRouter>
                }/>
                <Route path="/routes/create" element={
                    <ProtectedRouter>
                        <EditorRoute mode="create"/>
                    </ProtectedRouter>
                }/>
                <Route path="/routes/private" element={
                    <ProtectedRouter>
                        <RoutesPage mode="private"/>
                    </ProtectedRouter>
                }/>
                <Route path="/routes/:id/edit" element={
                    <ProtectedRouter>
                        <EditorRoute mode="edit" />
                    </ProtectedRouter>
                } />

                <Route path="/moderate" element={
                    <ProtectedRouter>
                        <RoutesPage mode="moderate"/>
                    </ProtectedRouter>
                }/>
                <Route path="/moderate/route/:id" element={
                    <ProtectedRouter>
                        <EditorRoute mode="moderate"/>
                    </ProtectedRouter>
                }/>
                <Route path="/admin/changeRoles" element={
                    <ProtectedRouter>
                        <ChangeRoles/>
                    </ProtectedRouter>
                }/>
            </Routes>
        </BrowserRouter>
    )
}