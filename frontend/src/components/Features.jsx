import FeatureCard from "./FeatureCard";

import createRoute from "../assets/routes.png";
import publicRoute from "../assets/public.png";
import editRoute from "../assets/edit.png";
import placeNear from "../assets/find.png";

export default function Features() {
    const features = [
        {
            title: "Create routes",
            description:
                "Build routes anywhere in the world. Select a point on the map, use coordinates or simply enter an address. Everything is saved automatically.",
            image: createRoute,
            reverse: false,
        },
        {
            title: "Publish routes",
            description:
                "Share your adventures with other people. Public routes are moderated before publication to keep the quality high.",
            image: publicRoute,
            reverse: true,
        },
        {
            title: "Edit anytime",
            description:
                "Need to improve your route? No problem. Every change is saved, and your editing history remains available.",
            image: editRoute,
            reverse: false,
        },
        {
            title: "Find nearby places",
            description:
                "Search for interesting locations near your route. Cafes, hotels, viewpoints and many other places are just a few clicks away.",
            image: placeNear,
            reverse: true,
        },
    ];

    return (
        <section className="w-full py-12 md:py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                    Everything you need
                </h2>

                <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
                    Create, edit, publish and store your routes in one place.
                    Designed for travelers who prefer exploring the world
                    instead of organizing dozens of files.
                </p>
            </div>

            <div className="space-y-10">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
}