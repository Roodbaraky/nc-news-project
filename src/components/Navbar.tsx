import { useEffect, useState, useRef, useContext, MouseEvent } from 'react';
import { ErrorContext, UserContext } from '../context/context';
import { getTopics, getUser } from '../services/api';
import { BsArrowBarLeft } from 'react-icons/bs';
import { BiSolidHome, BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Topic } from '../types/Topics';

export const Navbar = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('business');
    const { user, setUser } = useContext(UserContext) ?? { user: null, setUser: () => {} };
    const { setError } = useContext(ErrorContext) ?? { error: null, setError: () => {} };
    const [topics, setTopics] = useState<Topic[]>([]);

    const handleLogin = async () => {
        const username = (document?.getElementById('username') as HTMLInputElement).value;
        try {
            const fetchedUser = await getUser(username);
            if (fetchedUser && setUser) {
                setUser(fetchedUser);
            }
            (document.getElementById('my_modal_1') as HTMLDialogElement).close();
        } catch (err) {
            if (err === null || err instanceof Error) {
                setError(err);
            }
        }
    };

    const handleLogout = () => {
        if (setUser) {
            setUser(null);
        }
        (document.getElementById('my_modal_2') as HTMLDialogElement).close();
    };

    const handleTopicClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const target = e.target as HTMLAnchorElement;
        navigate({
            pathname: `/${target?.innerText}`
        });
        handleCloseMenu();
    };

    useEffect(() => {
        async function fetchTopics() {
            try {
                const fetchedTopics = await getTopics();
                setTopics(fetchedTopics);
            } catch (err) {
                Promise.reject(err);
            }
        }
        fetchTopics();
        (document.querySelector('html') as HTMLElement).setAttribute('data-theme', theme);
    }, [theme]);

    const drawerRef = useRef<HTMLInputElement>(null);
    const handleCloseMenu = () => {
        if (drawerRef.current) {
            drawerRef.current.checked = false;
        }
    };

    return (
        <nav className="fill-black w-screen my-0 h-full z-50">
            <div className="navbar bg-">
                <div className="navbar-start flex">
                    <div className="drawer">
                        <input id="my-drawer" ref={drawerRef} type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn btn-accent drawer-button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                </svg>
                            </label>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-r border-base-content ">
                                <div className="flex justify-between">
                                    <a onClick={() => {
                                        navigate('/');
                                        handleCloseMenu();
                                    }} className="btn text-center self-start">
                                        <BiSolidHome className="scale-125" />
                                    </a>
                                    <a onClick={handleCloseMenu} className="btn text-center cursor-pointer self-end">
                                        <BsArrowBarLeft className="fill-accent scale-125" />
                                    </a>
                                </div>
                                <h2 className="text-xl border-t">Topics</h2>
                                {topics.map((topic: Topic) => (
                                    <li key={topic.description}>
                                        <a onClick={handleTopicClick}>{topic.slug}</a>
                                    </li>
                                ))}
                                <h2 className="text-xl border-t">Resources</h2>
                                <li><a>Coming soon...</a></li>
                                <h2 className="text-xl border-t">Users</h2>
                                <li><a>Coming soon...</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-4xl hidden sm:flex">NC News</a>
                </div>
                <div className="navbar-end mx-4">
                    <label className="swap swap-rotate">
                        <input type="checkbox" onClick={() => { setTheme(theme === 'business' ? 'emerald' : 'business') }} />
                        <svg className="swap-on fill-current w-10 h-10 scale-[70%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg className="swap-off fill-current w-10 h-10 scale-[70%]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle" onClick={() => {
                        if (!user) {
                            (document.getElementById('my_modal_1') as HTMLDialogElement).showModal();
                        } else {
                            (document.getElementById('my_modal_2') as HTMLDialogElement).showModal();
                        }
                    }}>
                        {!user
                            ? <BiUser className="pointer-events-none scale-150" />
                            : <img id="user-avatar_url" src={user.avatar_url} className="rounded-full scale-[80%]" />}
                    </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input id="username" type="text" className="grow" placeholder="Username" />
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                </svg>
                                <input type="password" className="grow" placeholder="Password" />
                            </label>
                            <div className="modal-action">
                                <form method="dialog">
                                    <a className="btn" onClick={handleLogin}>Log in</a>
                                    <button className="btn btn-warning">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <div className="modal-action">
                                <form method="dialog">
                                    <a className="btn" onClick={handleLogout}>Log out</a>
                                    <button className="btn btn-warning">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </nav>
    );
};
