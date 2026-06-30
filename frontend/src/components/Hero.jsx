import { Link } from "react-router-dom";
import forest from "../assets/forest.jpg";

export default function Hero() {
    return (
        <section className={`w-full pt-28 pb-18 h-screen flex items-center justify-center ` }
        style={{ backgroundImage: `url(${forest})`,
                 backgroundRepeat: "no-repeat",
                 backgroundPosition: "cenetr",
                 backgroundSize:"cover",
                 boxShadow: "0px 0px 500px 500px rgba(0, 0, 0, 0.3) inset"}}>

            <div className="flex flex-col items-center text-center w-full">
                <h1 className=" mt-8 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-zinc-100 " >
                    Create routes.
                    <br />

                    <span className="text-teal-500">
                        Save memories.
                    </span>
                </h1>

                <p className=" mt-8 max-w-3xl text-lg md:text-xl leading-8 text-zinc-400 ">
                    Create beautiful routes, save your favorite places,
                    publish adventures and discover journeys created by other
                    travelers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">

                    <Link to="/routes/create" className=" rounded-lg bg-zinc-800 dark:bg-zinc-70 px-8 py-1 text-lg font-semibold text-zinc-300
                      hover:bg-zinc-700 dark:hover:bg-zinc-60 transition " >
                        Create route
                    </Link>

                    <Link to="/routes/public" className=" rounded-lg border border-zinc-300 dark:border-zinc-70 px-8 py-1 text-lg font-semibol
                      text-zinc-300 dark:text-zinc-200  hover:border-teal-500 hover:text-teal-50 transition bg-zinc-900/80">
                        Explore routes
                    </Link>

                </div>
            </div>
        </section>
    );
}