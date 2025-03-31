
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Notification {
  id: number;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'error' | 'feedback' | 'enquiry';
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch system notifications
        const sysResponse = await axios.get('http://127.0.0.1:5000/notifications');
        // Fetch contact messages as notifications
        const contactResponse = await axios.get('/api/admin/messages?unread=true');
        
        const contactNotifications = contactResponse.data.messages.map(msg => ({
          id: msg.id,
          message: `New ${msg.type} from ${msg.name}: ${msg.message.substring(0, 50)}...`,
          date: msg.date,
          type: msg.type === 'feedback' ? 'feedback' : 'enquiry'
        }));
        
        setNotifications([
          ...sysResponse.data.notifications,
          ...contactNotifications
        ]);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Recent Notifications</h1>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span
                className={`font-bold ${
                  notification.type === "warning"
                    ? "text-yellow-600"
                    : notification.type === "error"
                    ? "text-red-600"
                    : notification.type === "feedback"
                    ? "text-purple-600"
                    : notification.type === "enquiry"
                    ? "text-blue-600"
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