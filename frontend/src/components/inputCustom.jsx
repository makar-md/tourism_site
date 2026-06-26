import '../index.css'

/**
 * 
 * @param {*} name - id and name 
 * @param {*} label 
 * @param {*} type 
 * @param {*} value 
 * @param {*} onChange 
 * @returns 
 */
export default function InputCustom( {name, label, type = "text", error, value, onChange, ...props}){
    return(
        <>
            <label htmlFor={name} className='text-lg sm:text-xl md:text-2xl text-zinc-800 dark:text-zinc-100 font-medium'>{label}</label>
            <input type={type} id={name} name={name} value={value} onChange={onChange} {...props}
            className={`w-full rounded-lg sm:rounded-[calc(var(--radius-md)-1px)] bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-md shadow-zinc-800/5
            outline placeholder:text-zinc-400 focus:ring-2 focus:ring-teal-500/10  dark:bg-zinc-700/15  dark:placeholder:text-zinc-500
            dark:focus:ring-teal-400/10  placeholder:text-base sm:placeholder:text-xl text-base sm:text-xl 
            
            ${error ? "outline-pink-700 dark:outline-pink-500 text-pink-700 focus:outline-pink-700 dark:focus:outline-pink-500":
             "dark:focus:outline-teal-400 focus:outline-teal-500 dark:outline-zinc-700 outline-zinc-900/10 dark:text-zinc-200 text-zinc-950"}`}/>
            {error &&
                <p className="text-pink-700 text-sm sm:text-md font-medium px-2 sm:px-4">{error}</p>
            }
        </>
    )
}