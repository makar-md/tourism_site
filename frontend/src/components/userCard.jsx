import RoleSelect from "./roleSelect"
export default function UserCard({ user, roles, onChangeRole }) {
    return (
        <div className="group rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition duration-300 hover:border-teal-500 hover:shadow-xl hover:shadow-teal-500/10">
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {user.surName} {user.firstName} 
                        </h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.roleId === 1
                                ? "bg-red-500/10 text-red-500"
                                : user.roleId === 3
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-teal-500/10 text-teal-500"
                        }`}>
                            {roles.map((role)=>(
                                role.id === user.roleId && role.name
                            ))}
                        </span>
                    </div>
                    {user.lastName &&
                        <p className="text-zinc-400">{user.lastName}</p>
                    }
                    <p className="text-zinc-500 dark:text-zinc-400">{user.email}</p>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-5">
                <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400"> Role </p>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100"> Change permissions </p>
                </div>
                {/* <select defaultValue={user.roleId} onChange={(e) => onChangeRole(user.id, e.target.value)}
                    className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-3
                     text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-teal-500">
                    {roles.map(role => (
                        <option key={role.id} value={role.id}> {role.name} </option>
                    ))}
                </select> */}
                <RoleSelect roles={roles} value={user.roleId} onChange={(roleId) => onChangeRole(user.id, roleId)}/>
            </div>
        </div>
    );
}