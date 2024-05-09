

export const CustomAlert = ({ message, setIsAlertTriggered }) => {
    const hideAlert = () => {
        setIsAlertTriggered(false)
    }
    return (

        <div className="alert-container absolute  w-full h-full p-5 bg-bkg z-10 mx-auto left-0 right-0 text-center flex flex-col place-items-center place-content-evenly border">

            <p className="text-3xl">{message || `This is an empty alert`}</p>
            <button className="bg-accent-1 text-content hover:bg-accent-2 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-1" onClick={hideAlert}>OK</button>
        </div>
    )
}
