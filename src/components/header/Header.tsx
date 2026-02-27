import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutStart } from "@/store/auth/authSlice";
import { useState } from "react";
import CreateProject from "@/pages/CreateProject";
import { Bell } from "lucide-react";
import { selectCurrentUser } from "@/store/auth/auth.selector";
import { selectNotifications } from "@/store/notification/notification.selector";
import Notification from "../notifications/Notification";

export default function Header() {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectNotifications);
    const user = useAppSelector(selectCurrentUser);
    const avatarLetter = user?.email?.charAt(0).toUpperCase() || "?";
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="w-full h-14 border-b border-neutral-700 bg-black flex justify-center">
                <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between px-6 text-white">
                    <nav className="flex items-center gap-10 text-lg font-semibold">
                        <Link to="/" className="hover:text-neutral-300 transition">Home</Link>
                        <button
                            onClick={() => setOpen(true)}
                            className="hover:text-neutral-300 transition text-lg font-semibold"
                        >
                            Create Project
                        </button>
                        <Link to="/upgrade" className="hover:text-neutral-300 transition">Upgrade</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {/* Notification Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="rounded-full p-0 w-9 h-9 text-white relative">
                                    <Bell className="w-5 h-5" />
                                    {/* Notification count badge */}
                                    {
                                        notifications?.length > 0 ?
                                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full px-1">
                                                {notifications.length}
                                            </span> : <></>
                                    }

                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-80 bg-neutral-900 border-neutral-700 text-white p-2"
                            >
                                <div className="space-y-2">
                                    {
                                        notifications?.length > 0 ? notifications.map((notification) => {
                                            return (
                                                <Notification notification={notification} />
                                            )
                                        }) : <div>There are no new notifications</div>
                                    }
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/**User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="rounded-full p-0 w-9 h-9 text-white">
                                    <Avatar className="w-9 h-9 border border-white text-white bg-transparent">
                                        <AvatarFallback className="text-white bg-transparent">
                                            {avatarLetter}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-48 bg-neutral-900 border-neutral-700 text-white"
                            >
                                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-neutral-700" />
                                <DropdownMenuItem asChild className="hover:bg-neutral-800 cursor-pointer">
                                    <Link to="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="hover:bg-neutral-800 cursor-pointer"
                                    onClick={() => dispatch(logoutStart())}
                                >
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <CreateProject open={open} setOpen={setOpen} />
        </>

    );
}
