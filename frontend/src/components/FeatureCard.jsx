export default function FeatureCard({
    title,
    description,
    image,
    reverse = false
}) {
    return (
        <section className={`rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden
            flex flex-col ${ reverse ? "lg:flex-row-reverse" : "lg:flex-row" }`}>
            

            <div className="lg:w-7/12 h-64 sm:h-80 lg:h-[430px]">
                <div className="w-full h-full bg-center bg-contain bg-no-repeat transition duration-500 hover:scale-105 p-4
                flex items-center justify-center">
                    <img src={image}/>
                </div>
            </div>

            <div className={`lg:w-5/12 flex flex-col justify-center p-6 md:p-8 ${reverse ? "lg:items-start" : "lg:items-end"}`}>
                <div className={`max-w-md ${ reverse ? "text-left" : "lg:text-right text-left" }`} >

                    <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                        {title}
                    </h2>

                    <p className="mt-5 leading-8 text-lg text-zinc-600 dark:text-zinc-400">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}