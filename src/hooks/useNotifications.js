import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getNotifications,
    getUnreadNotificationsCount,
    markNotificationAsRead,
    deleteNotification,
    deleteAllNotifications,
    markAllNotificationsAsRead,
} from '@/api/api';

export const useNotifications = (accessToken, params = {}) => {
    const queryClient = useQueryClient();

    // Fetch notifications
    const notificationsQuery = useQuery({
        queryKey: ['notifications', accessToken, params],
        queryFn: () => getNotifications(accessToken, params),
        enabled: !!accessToken,
        keepPreviousData: true,
    });

    // Fetch unread notifications count
    const unreadCountQuery = useQuery({
        queryKey: ['unreadNotificationsCount', accessToken],
        queryFn: () => getUnreadNotificationsCount(accessToken),
        enabled: !!accessToken,
        refetchInterval: 15000, // Refetch every 15 seconds to keep count updated
    });
    // Shared Invalidation
    const invalidate = () => {
        queryClient.invalidateQueries(['notifications']);
        queryClient.invalidateQueries(['unreadNotificationsCount']);
    };
    // Mutations
    const deleteOne = useMutation({
        mutationFn: (id) => deleteNotification(id, accessToken),
        onSuccess: invalidate,
    });
    const deleteAll = useMutation({
        mutationFn: () => deleteAllNotifications(accessToken),
        onSuccess: invalidate,
    });
    const markRead = useMutation({
        mutationFn: (id) => markNotificationAsRead(id, accessToken),
        onSuccess: invalidate,
    });
    const markAllAsRead = useMutation({
        mutationFn: () => markAllNotificationsAsRead(accessToken),
        onSuccess: invalidate,
    });
    return {
        notificationsQuery,
        unreadCountQuery,
        isLoading: notificationsQuery.isLoading,
        isError: notificationsQuery.isError,

        deleteOne,
        deleteAll,
        markRead,
        markAllAsRead,
    };
   
}
 