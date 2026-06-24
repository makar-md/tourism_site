export default function Body({children}){
    return(
        <div className="min-h-screen min-w-full dark:bg-black bg-zinc-50 py-0 overflow-x-hidden 
        bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] duration-500  selection:bg-teal-500 selection:text-zinc-100
        bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-zinc-200)] dark:[--pattern-fg:var(--color-white)]/10">
                {children}
        </div>
    )
}