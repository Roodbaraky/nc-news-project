import { ErrorPopUpProps } from "../types/Error"

export const ErrorPopUp = ({ error, setError }:ErrorPopUpProps):JSX.Element => {
  return (
    <div role="alert" className=" flex alert alert-error fixed bottom-0 left-0 mr-0 w-full px-2 z-50 ">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" onClick={()=>{if(setError)setError(null)}} fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{error?.message}</span>
    </div>
  )
}
