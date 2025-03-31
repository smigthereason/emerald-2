
// Update your Messages.tsx to fetch from the backend
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  type: string;
  date: string;
  isRead: boolean;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replies, setReplies] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/admin/messages');
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleReplyChange = (id: number, value: string) => {
    setReplies((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendReply = async (id: number) => {
    try {
      const message = messages.find(m => m.id === id);
      if (!message) return;

      // Send the reply (you'll need to implement this endpoint)
      await axios.post('http://127.0.0.1:5000/admin/messages/reply', {
        messageId: id,
        reply: replies[id],
        recipientEmail: message.email
      });

      // Mark as read
      await axios.put(`http://127.0.0.1:5000/admin/messages/${id}/read`);
      
      // Update local state
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, isRead: true } : msg
      ));
      
      // Clear the reply
      setReplies(prev => ({ ...prev, [id]: "" }));
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading messages...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customer Messages</h1>
      <div className="space-y-6">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`p-4 border rounded-lg shadow-sm ${!message.isRead ? 'bg-blue-50' : ''}`}
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-lg font-bold capitalize">{message.type}</h2>
                <p className="text-sm text-gray-500">
                  From: {message.name} ({message.email}) on {new Date(message.date).toLocaleDateString()}
                </p>
              </div>
              {!message.isRead && (
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                  New
                </span>
              )}
            </div>
            <p className="mb-4">{message.message}</p>
            <div>
              <textarea
                className="w-full border border-[#d66161] rounded p-2 mb-2 bg-gray-300/50 text-black" 
                placeholder="Write a reply..."
                value={replies[message.id] || ""}
                onChange={(e) => handleReplyChange(message.id, e.target.value)}
              />
              <button
                className="px-4 py-2 bg-transparent text-[#d66161] rounded-3xl hover:text-white hover:bg-[#d66161] border border-[#d66161] transition-colors ease-in-out 300s"
                onClick={() => handleSendReply(message.id)}
              >
                Send Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;