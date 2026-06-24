export default function Body({children}){
    return(
        <div className="min-h-screen min-w-full dark:bg-black bg-zinc-50 py-0 overflow-x-hidden 
        bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] duration-500  selection:bg-teal-500 selection:text-zinc-100
        bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-zinc-200)] dark:[--pattern-fg:var(--color-white)]/10">
            <main className="min-h-screen w-11/12 sm:w-10/12 lg:w-5xl bg-white dark:bg-zinc-900 mx-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-2">
                {children}
            </main>
        </div>
    )
}