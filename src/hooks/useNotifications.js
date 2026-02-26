import {
  deleteNotification,
  getNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/api/notifications";
import { useAuth } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const baseNotificationKeys = ["admin_notifications"];

// Helper to extract notifications array from backend response
const extractNotificationsData = (responseData) => {
  // responseData is the parsed JSON from axios (i.e., response.data)
  // Expected shape: { status: "success", data: [...], total, page, totalPages, unreadCount }
  return {
    items: Array.isArray(responseData?.data) ? responseData.data : [],
    total: responseData?.total ?? 0,
    page: responseData?.page ?? 1,
    totalPages: responseData?.totalPages ?? 1,
    unreadCount: responseData?.unreadCount ?? 0,
  };
};

export const getNotificationTitle = (notification) => {
  if (notification?.title) return notification.title;
  if (notification?.type === "new_application_admin") {
    return "New Application Received";
  }
  return "Notification";
};

export const getNotificationRelativeTime = (dateValue) => {
  if (!dateValue) return "just now";
  const date = dayjs(dateValue);
  if (!date.isValid()) return "just now";
  return date.fromNow();
};

// Hook for unread count with polling
export const useUnreadNotificationCount = ({ pollingInterval = 30000 } = {}) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: [...baseNotificationKeys, "unread_count", accessToken],
    queryFn: async () => {
      const response = await getUnreadNotificationsCount(accessToken);
      // response = { status: "success", unreadCount: X }
      return response?.unreadCount ?? 0;
    },
    enabled: !!accessToken,
    refetchInterval: pollingInterval,
    refetchOnWindowFocus: true,
  });
};

// Hook for fetching paginated notifications
export const useNotifications = ({ page = 1, limit = 20, unreadOnly = false } = {}) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: [...baseNotificationKeys, "list", accessToken, page, limit, unreadOnly],
    queryFn: async () => {
      const response = await getNotifications({ accessToken, page, limit, unreadOnly });
      // response = { status: "success", data: [...], total, page, totalPages, unreadCount }
      return extractNotificationsData(response);
    },
    enabled: !!accessToken,
    placeholderData: (prev) => prev,
  });
};

// Hook for notification actions (mark read, mark all, delete)
export const useNotificationActions = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  // Invalidate all notification queries after mutation
  const refreshNotifications = async () => {
    await queryClient.invalidateQueries({ queryKey: baseNotificationKeys });
    // Also invalidate the unread count specifically if needed
    await queryClient.invalidateQueries({ queryKey: [...baseNotificationKeys, "unread_count"] });
  };

  const markSingleAsRead = useMutation({
    mutationFn: (notificationId) =>
      markNotificationAsRead({ accessToken, notificationId }),
    onSuccess: refreshNotifications,
  });

  const markAllAsRead = useMutation({
    mutationFn: () => markAllNotificationsAsRead(accessToken),
    onSuccess: refreshNotifications,
  });

  const removeNotification = useMutation({
    mutationFn: (notificationId) =>
      deleteNotification({ accessToken, notificationId }),
    onSuccess: refreshNotifications,
  });

  return {
    markSingleAsRead,
    markAllAsRead,
    removeNotification,
  };
};