import { useEffect, useRef, useState } from "react";

export default function CustomSelect({ data, currentValue, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);


    return (
        <div ref={ref} className="relative w-44">

            <button onClick={() => setOpen(prev => !prev)}
                className="w-full flex items-center justify-between rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-zinc-900 dark:text-zinc-100 transition hover:border-teal-500">

                <span>{currentValue}</span>

                <svg className={`w-5 h-5 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>

            </button>

            {open &&
                <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl shadow-zinc-900/20 z-50">
                    {data.map( (data,index) => (
                        <button key={index} onClick={() => { onChange(data); setOpen(false); }}
                            className={`w-full px-4 py-3 text-left transition ${
                                data === Number(currentValue)
                                    ? "bg-teal-500 text-white"
                                    : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            }`}>
                            {data}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
}