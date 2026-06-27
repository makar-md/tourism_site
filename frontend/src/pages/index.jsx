import Header from "../components/header";

export default function Index(){
    return(
        <>
            <Header linksShow={true} isCheckAuthUser={true}/>
            <h1>Main</h1>
        </>
    )
}