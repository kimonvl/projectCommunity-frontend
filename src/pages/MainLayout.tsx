import Header from '@/components/header/Header'
import { useAppDispatch } from '@/store/hooks'
import { getUnseenNotificationsStart } from '@/store/notification/notificationSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getUnseenNotificationsStart());
    }, [dispatch]);
    return (
        <div className="w-screen h-screen flex flex-col bg-black text-white overflow-hidden">
            <Header />

            <main className="flex-1 w-full h-full bg-black text-white p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
