import { Link } from 'react-router-dom'
import { useState } from 'react'
/**
 * 
 * @param {*} linksShow 
 * @returns 
 */
export default function Header({linksShow}){
    const [showMenu, setShowMenu] = useState(false)

    function toggleModal(e){
        setShowMenu(e)
    }


    return(
        <header className="fixed flex w-full top-2.5 left-0 z-48">
            <nav className="flex justify-between w-full">
                <div className="flex w-2/8"></div>
                <div className="flex justify-end md:justify-center items-center w-6/8 px-2">
                    {linksShow && <>
                    <div className="flex-row gap-5 rounded-full bg-white/90 px-5 shadow-lg
                    ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/20
                    dark:ring-white/10 *:duration-200 *:transition-all md:flex hidden ">
                        <div className="text-zinc-900 dark:text-zinc-50 hover:text-orange-500 font-medium text-[14px] text-center
                        cursor-pointer py-2.5 flex justify-center items-center">
                            <Link to="/">Main</Link>
                        </div>
                        <div className="text-zinc-900 dark:text-zinc-50 hover:text-orange-500 font-medium text-[14px] text-center
                        cursor-pointer py-2.5 flex justify-center items-center" >
                            <Link>Projects</Link>
                        </div>
                        <div className="text-zinc-900 dark:text-zinc-50 hover:text-orange-500 font-medium text-[14px] text-center
                        cursor-pointer py-2.5 flex justify-center items-center" >
                            <Link>Docs</Link>
                        </div>
                        <div className="text-zinc-900 dark:text-zinc-50 hover:text-orange-500 font-medium text-[14px] text-center
                        cursor-pointer py-2.5 flex justify-center items-center" >
                            <Link>Templates</Link>
                        </div>
                        <div className="text-zinc-900 dark:text-zinc-50 hover:text-orange-500 font-medium text-[14px] text-center
                        cursor-pointer py-2.5 flex justify-center items-center" >
                            <Link to="/profile">Profile</Link>
                        </div>
                        <div className="text-zinc-900 dark:text-zinc-50 hover:text-orange-500 font-medium text-[14px] text-center
                        cursor-pointer py-2.5 flex justify-center items-center">
                            <Link to="/login">Log in</Link>
                        </div>
                    </div>
                    <div className="pointer-events-auto md:hidden" data-headlessui-state="">
                        <button className="group flex items-center rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium
                        text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm hover:text-orange-500
                        dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20" 
                        type="button" onClick={(e) => toggleModal(true)}>Menu 
                            <svg viewBox="0 0 8 6"  className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400">
                                <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" strokeWidth="1.5">
                                </path>
                            </svg>
                        </button>
                    </div>
                    </>}
                </div>
                <div className="w-2/8 p-2 flex justify-start">
                    <button type="button" id="toggleTheme" className="group rounded-full bg-white/90 px-3 py-2 shadow-lg
                    ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90
                    dark:ring-white/10 dark:hover:ring-white/20">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-orange-50 [@media(prefers-color-scheme:dark)]:stroke-orange-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-orange-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-orange-600">
                            <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"></path>
                            <path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" fill="none"></path>
                        </svg>
                        <svg viewBox="0 0 24 24" className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-orange-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-orange-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400">
                            <path d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>
                

                <div className={`fixed inset-0 z-49 backdrop-blur-xs duration-150 transition-all data-closed:opacity-0
                data-enter:ease-out data-leave:ease-in md:hidden ${ !showMenu ? 'hidden' : 'visible'}`} id="blureBackground"></div>

                <div className={`fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150
                data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900
                dark:ring-zinc-800 md:hidden ${ !showMenu ? 'hidden' : 'visible'}`} >

                    <div className="flex flex-row-reverse items-center justify-between">
                        <button className="group rounded-full bg-white/90 px-3 py-2 ring-1 ring-zinc-900/5
                        backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                        onClick={(e) => toggleModal(false)}>
                            <svg viewBox="0 0 24 24" className="h-6 w-6 text-zinc-500 dark:text-zinc-400 hover:text-orange-500">
                                <path d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">                                
                                </path>
                            </svg>
                        </button>
                        <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Navigation</h2>
                    </div>
                    <nav className="mt-6">
                        <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                            <li>
                                <Link className="flex py-2 hover:text-orange-500 duration-300" to="/">Main</Link>
                            </li>
                            <li>
                                <Link className="flex py-2 hover:text-orange-500 duration-300" href="#">Projects</Link>
                            </li>
                            <li>
                                <Link className="flex py-2 hover:text-orange-500 duration-300" href="#">Docs</Link>
                            </li>
                            <li>
                                <Link className="flex py-2 hover:text-orange-500 duration-300" href="#">Templates</Link>
                            </li>
                            <li>
                                <Link className="flex py-2 hover:text-orange-500 duration-300" to="profile">Profile</Link>
                            </li>
                            <li>
                                <Link className="flex py-2 hover:text-orange-500 duration-300" to="login">Log in</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </nav>
        </header>
    )
}