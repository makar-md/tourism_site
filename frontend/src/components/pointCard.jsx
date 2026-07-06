export default function PointCard({ point, onDelete, mode, index }) {
    const lng = point.coords ? point.coords[0] : point.lng;
    const lat = point.coords ? point.coords[1] : point.lat;
    return (
        <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-700/15
         shadow-xl shadow-zinc-800/5 dark:shadow-zinc-800/15 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 overflow-hidden">

            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white font-semibold shadow-md shadow-teal-500/30">
                        {index + 1}
                    </div>

                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            Point {index + 1}
                        </h3>
                    </div>
                </div>

                {(mode !== "viewing" && mode !== "moderate") && (
                    <button onClick={() => onDelete(point.id)}
                        className="rounded-xl p-2 text-zinc-400 hover:bg-red-500 hover:text-white transition-all duration-300">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7L5 7M10 11v6M14 11v6M9 7V4h6v3M7 7l1 12h8l1-12"/>
                        </svg>
                    </button>
                )}
            </div>

            <div className="p-5 space-y-4">

                <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-1">
                        Address
                    </p>

                    <p className="text-sm leading-6 text-zinc-800 dark:text-zinc-200">
                        {point.address}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
                        <p className="text-xs uppercase text-zinc-500 mb-1">
                            Longitude
                        </p>
                        <p className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                            {lng.toFixed(6)}
                        </p>
                    </div>

                    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
                        <p className="text-xs uppercase text-zinc-500 mb-1">
                            Latitude
                        </p>

                        <p className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                            {lat.toFixed(6)}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}