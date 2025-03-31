import axios from "axios";
import { ExternalLink, Filter, Mail, MoreVertical, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";

interface FeedbackItem {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    read: boolean;
}

const Feedback = () => {
    const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://127.0.0.1:5000/admin/feedback", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFeedbackItems(response.data.feedback || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching feedback:", err);
            setError("Failed to load feedback");
            // Fallback to mock data for development
            setFeedbackItems(mockFeedback);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await axios.put(
                `http://127.0.0.1:5000/admin/feedback/${id}/read`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update local state
            setFeedbackItems(
                feedbackItems.map((item) =>
                    item.id === id ? { ...item, read: true } : item
                )
            );
        } catch (err) {
            console.error("Error marking feedback as read:", err);
        }
    };

    const deleteFeedback = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) {
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:5000/admin/feedback/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Remove from local state
            setFeedbackItems(feedbackItems.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting feedback:", err);
            alert("Failed to delete feedback");
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedItem(expandedItem === id ? null : id);

        // If expanding and not read, mark as read
        const item = feedbackItems.find(item => item.id === id);
        if (expandedItem !== id && item && !item.read) {
            markAsRead(id);
        }
    };

    const filteredFeedback = feedbackItems.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                Loading feedback...
            </div>
        );
    }

    if (error && feedbackItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => fetchFeedback()}
                    className="px-4 py-2 bg-[#d66161] text-white rounded-md"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">User Feedback</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {feedbackItems.filter(item => !item.read).length} unread
                    </span>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search feedback..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none w-full min-w-0"
                    />
                </div>
                <button className="bg-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
                {filteredFeedback.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Mail className="w-12 h-12 text-gray-300 mb-4" />
                            <p className="text-gray-500">No feedback messages found</p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredFeedback.map((item) => (
                        <Card key={item.id} className={!item.read ? "border-l-4 border-l-[#d66161]" : ""}>
                            <div
                                className="p-4 cursor-pointer"
                                onClick={() => toggleExpand(item.id)}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-lg">{item.subject}</h3>
                                        <p className="text-sm text-gray-500">
                                            From: {item.name} ({item.email})
                                        </p>
                                        <p className="text-xs text-gray-400">{item.date}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!item.read && (
                                            <span className="w-2 h-2 bg-[#d66161] rounded-full"></span>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteFeedback(item.id);
                                            }}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {expandedItem === item.id && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-gray-700 whitespace-pre-line">{item.message}</p>
                                        <div className="mt-4 flex justify-end">
                                            <a
                                                href={`mailto:${item.email}`}
                                                className="flex items-center gap-1 text-sm text-[#d66161] hover:underline"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Reply via Email
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

// Mock data for development
const mockFeedback: FeedbackItem[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        subject: "Website Feedback",
        message: "I love your products! The quality is amazing and the shipping was faster than expected. Will definitely order again.",
        date: "2024-02-15",
        read: false,
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        subject: "Question about Returns",
        message: "Hello, I recently purchased a product but it doesn't fit well. What is your return policy? Do I need to pay for return shipping?",
        date: "2024-02-14",
        read: true,
    },
    {
        id: "3",
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        subject: "Product Suggestion",
        message: "Have you considered adding more color options for your bestselling items? I would love to see them in navy blue and forest green.",
        date: "2024-02-13",
        read: false,
    },
];

export default Feedback;
