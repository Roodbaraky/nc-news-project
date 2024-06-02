import { useNavigate } from 'react-router-dom';
import { ErrorPageProps } from '../types/Error';

export const ErrorPage = ({ error }: ErrorPageProps): JSX.Element => {
    const navigate = useNavigate()
    return (
        <>
            <section className="absolute z-10 bg-base py-48 top-16 w-full bottom-0 my-auto">
                <div className="container mx-auto">
                    <div className="-mx-4 flex">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[400px] text-center">
                                <h2 className="mb-2 text-[50px] font-bold leading-none text-base-content sm:text-[80px] md:text-[100px]">
                                    
                                    {error?.status?error.status : '404'}
                                </h2>
                                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-base-content">
                                    {error?.message || "Oops! That page can’t be found"}
                                </h4>

                                <a
                                    className="inline-block rounded-lg border border-base-content px-8 py-3 text-center text-base font-semibold text-base-content transition hover:bg-white hover:text-primary"
                                    onClick={() => { navigate('/') }}>
                                    Go To Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
                    <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                    <div className="flex h-full w-1/3">
                        <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
                        <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                    </div>
                    <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
                </div>
            </section>
        </>
    );
};

