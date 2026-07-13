import i1 from "../assets/1.jpg";
import i2 from "../assets/2.jpg";
import i3 from "../assets/3.png";
import i4 from "../assets/4.jpg";

export default function Gallery() {
    const images = [i1, i2, i3, i4];

    return (
        <section className="py-20">
            <div className="text-center mb-12">
                <span className="text-teal-500 font-semibold tracking-widest uppercase text-sm">
                    Inspiration
                </span>

                <h2 className="mt-3 text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                    Discover amazing places
                </h2>

                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Explore routes created by travelers and get inspired for your next adventure.
                </p>
            </div>

            <div className="flex gap-7 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-4 [&::-webkit-scrollbar]:hidden">
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className="group relative shrink-0 snap-center w-[320px] h-[470px] rounded-3xl overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 transition-all duration-500 hover:-translate-y-3 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/10"
                    >
                        <img 
                            src={image} 
                            alt={`Beautiful destination ${index + 1}`} 
                            className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="inline-flex px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
                                Route #{index + 1}
                            </div>
                            <h3 className="mt-4 text-2xl font-semibold text-white">
                                Beautiful destination
                            </h3>
                            <p className="mt-2 text-white/80 text-sm leading-6">
                                Save this route or use it as inspiration for your next trip.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}