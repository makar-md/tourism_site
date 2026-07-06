import Header from "../components/header";
import Body from "../components/body";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Features from "../components/Features";

export default function Index(){
    return(
        <Body>
            <main className=" w-11/12 lg:w-9/12 mx-auto min-h-screen bg-white dark:bg-zinc-900 flex flex-col  ">
                <Header linksShow={true} isCheckAuthUser={true} />

                <Hero />

                <Gallery />

                <Features />
            </main>
        </Body>
    )
}