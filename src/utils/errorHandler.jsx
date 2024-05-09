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
        return (<>{isAlertTriggered && <CustomAlert message={alertMessage} setIsAlertTriggered={setIsAlertTriggered} />}</>)
    }

    return {
        triggerError,
        renderAlert
    }
}
