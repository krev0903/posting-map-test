import { Head, Link } from '@inertiajs/react';
import Sidebar from './Components/Sidebar'

export default function Welcome( auth ) {
    return (
        <>
            <Head title="Welcome" />
            <div>
                <div>
                    <div>
                        <header className="grid grid-cols-2 items-center gap-2 py-5 lg:grid-cols-3 bg-gray-300">
                            <div className="flex lg:col-start-2 lg:justify-center">
                            <div className='mx-10 text-[32px] whitespace-nowrap font-bold'>ポスティングエリアを選択して下さい</div>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        マイページ
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            ログイン
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            登録
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </>
    );
}