export default function RouteImg({index, file, onDelete, mode}){
    const src =
    file instanceof File
        ? URL.createObjectURL(file)
        : `http://localhost:4200/uploads/${file.img ?? file}`;
    return(
        <div key={index} className="relative shrink-0 group">
            <img src={src} className={`${mode !== "viewing"? `w-42 h-42` : `w-60 h-60`} rounded-2xl object-cover shadow-xl shadow-zinc-900/40 transition group-hover:brightness-50`} />

            {mode !=="viewing" &&
                <button onClick={() => onDelete(index)} className="absolute inset-0 flex items-center justify-center rounded-2xl bg-zinc-950/50 opacity-0 transition
                duration-300 group-hover:opacity-100">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-7 h-7 text-white" fill="currentColor" stroke="currentColor">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            }
        </div>
    )
}