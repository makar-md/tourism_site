export default function Pointer(){
    return(
        <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full bg-teal-500/40 animate-ping"></div>
            <div className="absolute w-5 h-5 rounded-full bg-teal-500/30 blur-sm"></div>
            <div className="w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 border-2 border-teal-500 shadow-md shadow-teal-500/30"></div>
        </div>
    )
}