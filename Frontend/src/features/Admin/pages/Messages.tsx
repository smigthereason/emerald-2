// src/features/Admin/pages/Messages.tsx
import React, { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  date: string;
}

// Sample static data for demonstration purposes.
const messagesData: Message[] = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Product Enquiry",
    content: "I would like to know more about product X. Can you provide more details on its features and pricing?",
    date: "2025-02-12",
  },
  {
    id: 2,
    sender: "Jane Smith",
    subject: "Order Issue",
    content: "I have an issue with my recent order. The product received doesn't match the description.",
    date: "2025-02-11",
  },
];

const Messages: React.FC = () => {
  // We'll store reply text for each message keyed by message id.
  const [replies, setReplies] = useState<{ [key: number]: string }>({});

  const handleReplyChange = (id: number, value: string) => {
    setReplies((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendReply = (id: number) => {
    // This is where you would integrate with your API to send the reply.
    console.log(`Reply sent to message ${id}: ${replies[id]}`);
    // Optionally, clear the reply field after sending.
    setReplies((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Customer Messages</h1>
      <div className="space-y-6">
        {messagesData.map((message) => (
          <div key={message.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-lg font-bold">{message.subject}</h2>
                <p className="text-sm text-gray-500">
                  From: {message.sender} on {message.date}
                </p>
              </div>
            </div>
            <p className="mb-4">{message.content}</p>
            <div>
              <textarea
                className="w-full border rounded p-2 mb-2"
                placeholder="Write a reply..."
                value={replies[message.id] || ""}
                onChange={(e) => handleReplyChange(message.id, e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
