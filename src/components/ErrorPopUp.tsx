import { ErrorPopUpProps } from "../types/Error"

export const ErrorPopUp = ({ error, setError }: ErrorPopUpProps): JSX.Element => {
  return (
    
    <dialog id="errorModal" className="modal">
  <div className="modal-box bg-error">
    <h3 className="font-bold text-lg text-error-content">{error?.message}</h3>
    <p className="py-4 text-error-content">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn" onClick={()=>{if(setError)setError(null)}}>Close</button>
      </form>
    </div>
  </div>
</dialog>

  )
}
