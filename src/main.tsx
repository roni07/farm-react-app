const  Main = () => {

    let x: Number | null = null;
    console.log(x ??= 2);

    const environmentURL: string | undefined = process.env.FARM_APP_BASE_URL;

    console.log("Environment url", environmentURL)

    return (
        <>

        </>
    );
}

export default Main;