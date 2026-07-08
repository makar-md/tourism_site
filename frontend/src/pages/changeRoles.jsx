import { useEffect, useState } from "react";
import Body from "../components/body";
import Header from './../components/header';
import UserCard from './../components/userCard'
import { api } from "../api/api";
import { date, json } from "zod";

export default function ChangeRoles(){
    const [usersData, setUsersData] = useState([{
        email: "",
        firstName: "",
        id : "",
        lastName: "",
        roleId: 1,
        surName: ""
    }])
    const [role, setRole]= useState([{
        roleId: 1,
        role: ""
    }])

    useEffect(()=>{
        async function loadUsers(){
            try{
                const res = await api("/admin/users",{})
                const data = await res.json()
                if(!res.ok){
                    alert(data.message)
                }
                setUsersData(data);
            } catch (e){
                alert (e.message)
            }
        }
        async function loadRoles(){
            try{
                const res = await api("/admin/roles",{})
                const data = await res.json()
                if(!res.ok){
                    alert(data.message)
                }
                setRole(data);
            } catch (e){
                alert (e.message)
            }
        }
        loadUsers()
        loadRoles()
    }, [])

    async function changeRole(id, roleId){

        try{
            const res = await api(`/admin/users/${id}/role/${roleId}`,{
                method: "PATCH",
            })
            const data = await res.json()
            if(!res.ok){
                alert(data.message)
            }
            setUsersData(prev => prev.map(user =>
                    user.id === id ? {
                        ...user,
                        roleId: Number(roleId),
                        role: role.find(r => r.id === Number(roleId))?.name
                    }: user
                )
            );
        } catch (e){
            alert (e.message)
        }
    }

    return(
        <Body>
            <main className="w-11/12 lg:w-9/12 mx-auto min-h-screen bg-white dark:bg-zinc-900 pt-15 px-10">
                <Header linksShow={true} isCheckAuthUser={true} />
                <div className="mt-8 flex flex-col gap-8">
                    <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
                        <div>
                            <p className="text-sm uppercase tracking-widest text-teal-500 font-semibold">
                                Administration
                            </p>
                            <h1 className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                                User roles
                            </h1>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                                Manage user permissions and roles.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-800 px-5 py-3 flex flex-col items-center">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Users
                            </p>
                            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                {usersData.length}
                            </p>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-4">
                        <input
                            placeholder="Search user..."
                            className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 px-5 py-3 outline-none transition
                            focus:border-teal-500 text-zinc-900 dark:text-zinc-100"
                        />
                        <button className="rounded-2xl bg-zinc-900 dark:bg-zinc-800 px-6 py-3 text-white hover:bg-teal-600 transition">
                            Refresh
                        </button>
                    </div> */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 pb-10">
                        {usersData.map(user => (
                            <UserCard key={user.id} user={user} roles={role} onChangeRole={changeRole} />
                        ))}
                    </div>
                </div>
            </main>
        </Body>
    )
}