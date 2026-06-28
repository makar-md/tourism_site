import Header from "../components/header";

export default function Index(){
    return(
        <>
            <Header linksShow={true} isCheckAuthUser={false}/>
            <h1>Main</h1>
        </>
    )
}