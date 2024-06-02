import Lottie from 'react-lottie'
import loadingAnim from '../assets/Loader.json'

export const Loading = () => {
    return (
        <div>
            <Lottie
                options={
                    {
                        loop: true,
                        autoplay: true,
                        animationData: loadingAnim,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        }
                    }}
                height={200}
                width={200}
            />


        </div>
    )
}
