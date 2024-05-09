
import { useNavigate } from 'react-router-dom'



export const Error = ({ error }) => {
    const navigate = useNavigate()
    return (
        <div className='error-container'>
            <div>
                <h1>{error.status || 404}</h1>
            </div>
            <p>{error.status === 400 || !error.status ? `Oops, looks like there's nothing here.` : `Oops, something went wrong.`}</p>
            <p>click <a onClick={() => { navigate(-3) }}>here</a> to go back</p>
        </div>
    )
}
