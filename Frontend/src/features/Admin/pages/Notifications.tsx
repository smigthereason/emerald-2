// src/features/Admin/pages/Notification.tsx
import React from 'react';

interface Notification {
  id: number;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'error';
}

// Sample notifications data
const notificationsData: Notification[] = [
  {
    id: 1,
    message: "New order received from John Doe.",
    date: "2025-02-12 09:30",
    type: "info",
  },
  {
    id: 2,
    message: "Product XYZ is running low on stock.",
    date: "2025-02-11 14:45",
    type: "warning",
  },
  {
    id: 3,
    message: "Server maintenance scheduled for tonight at 12 AM.",
    date: "2025-02-10 17:00",
    type: "info",
  },
  {
    id: 4,
    message: "Payment gateway error encountered in transaction #12345.",
    date: "2025-02-09 16:20",
    type: "error",
  },
];

const Notification: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Recent Notifications</h1>
      <ul className="space-y-4">
        {notificationsData.map((notification) => (
          <li key={notification.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span
                className={`font-bold ${
                  notification.type === "warning"
                    ? "text-yellow-600"
                    : notification.type === "error"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {notification.type.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">{notification.date}</span>
            </div>
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
