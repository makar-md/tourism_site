export default function RouteCard({name, description, img, user}){
    return(
        <div className="group relative shrink-0 snap-center w-[320px] h-[470px] rounded-3xl overflow-hidden border border-zinc-300 dark:border-zinc-700
            bg-white dark:bg-zinc-900 transition-all duration-500 hover:-translate-y-3 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10">

            <img src={`http://localhost:4200/uploads/${img}`}  alt={`Beautiful destination`} className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110"/>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
                    {user}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">
                    {name}
                </h3>
                <p className="mt-2 text-white/80 text-sm leading-6">
                    {description}
                </p>
            </div>
        </div>
    )
}