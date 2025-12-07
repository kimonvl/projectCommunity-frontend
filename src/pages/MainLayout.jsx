import Header from '@/components/header/Header'
import { getUnseenNotificationsStart } from '@/store/notification/notificationSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    const dispatch = useDispatch();
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
