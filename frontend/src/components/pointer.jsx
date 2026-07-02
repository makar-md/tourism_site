export default function Pointer({ number }) {
    return (
        <div className="relative group">

            <div className="absolute left-1/2 top-[34px] h-3 w-3 -translate-x-1/2 rounded-full bg-black/20 blur-sm"></div>

            <div className="relative transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white font-bold shadow-xl shadow-teal-500/40">
                    {number}
                </div>

                <div className="absolute left-1/2 top-[30px] h-4 w-4 -translate-x-1/2 rotate-45 bg-teal-500"></div>

            </div>

        </div>
    );
}