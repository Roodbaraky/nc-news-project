import { useEffect, useState } from "react";
import { CustomAlert } from "../components/CustomAlert";

export const useErrorHandler = () => {
    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertTriggered, setIsAlertTriggered] = useState(false)

    useEffect(() => {
        if (isAlertTriggered) {
            renderAlert();
        }


    }, [isAlertTriggered])

    function triggerError(message) {
        setAlertMessage(message)
        setIsAlertTriggered(true)
    }
    function renderAlert() {
        return (<>{isAlertTriggered &&
            <div onClick={() => { setIsAlertTriggered() }} role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 fixed top-2/4 left-2/4  -translate-y-2/4 -translate-x-2/4 w-5/6 aspect-square z-50 max-w-96">
                <strong className="block font-medium text-red-800"> {alertMessage} </strong>

                <p className="mt-2 text-sm text-red-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo quasi assumenda numquam deserunt
                    consectetur autem nihil quos debitis dolor culpa.
                </p>
            </div>}</>)
    }

    return {
        triggerError,
        renderAlert
    }
}
