import { useState, useRef, useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/store';
import { Bell } from "lucide-react";

export default function NotificationBell() {
    const { accessToken } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const {
        notificationsQuery,
        unreadCountQuery,
        markRead,
        deleteOne,
    } = useNotifications(accessToken, {page: 1, limit: 5});

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className='relative'>
                <Bell size={24}  className='mt-3'/>
                {unreadCountQuery.data > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[14px] px-1 rounded-full">
                        {unreadCountQuery.data.count}
                    </span>
                )}
            </button>

            {/* dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg p-3 z-50">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    {notificationsQuery.isLoading && (
                        <p>Loading...</p>
                    )}
                    {notificationsQuery.data?.notifications?.length === 0 && (
                        <p>No notifications</p>
                    )}
                    {notificationsQuery.data?.notifications?.map((n) => (
                        <div
                            key={n._id}
                            className={`p-2 border-b ${!n.read ? 'bg-gray-100' : ''}`}
                        >
                            <p className="text-[14px]">{n.message}</p>
                            <div className='flex justify-between mt-1 text-xs'>
                                {!n.read && (
                                    <button
                                        onClick={() => markRead.mutate(n._id)}
                                        className='text-blue-500'
                                    >
                                        Mark as read
                                    </button>
                                )}
                                <button 
                                    onClick={() => deleteOne.mutate(n._id)}
                                    className='text-red-500'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}