import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { MessageSquare, Star, Flag, ThumbsUp, ThumbsDown } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      customer: 'Emily Johnson',
      avatar: '/api/placeholder/40/40',
      rating: 5,
      date: '2025-02-13',
      product: 'Wireless Headphones Pro',
      content: 'Absolutely love these headphones! The sound quality is incredible and they are so comfortable to wear for long periods.',
      helpful: 24,
      unhelpful: 2,
      status: 'published'
    },
    {
      id: 2,
      customer: 'Michael Chen',
      avatar: '/api/placeholder/40/40',
      rating: 4,
      date: '2025-02-12',
      product: 'Smart Watch Series X',
      content: 'Great watch overall. Battery life could be better but the features are exactly what I needed.',
      helpful: 15,
      unhelpful: 1,
      status: 'published'
    },
    {
      id: 3,
      customer: 'Sarah Williams',
      avatar: '/api/placeholder/40/40',
      rating: 2,
      date: '2025-02-11',
      product: 'Bluetooth Speaker Mini',
      content: 'Disappointed with the sound quality. Expected better for the price point.',
      helpful: 8,
      unhelpful: 12,
      status: 'flagged'
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Customer Reviews</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-[#d66161] text-white rounded-lg hover:bg-[#c26276] transition-colors">
            Export Reviews
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Reviews
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Average Rating
            </CardTitle>
            <Star className="w-4 h-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +0.3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Flagged Reviews
            </CardTitle>
            <Flag className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              +5 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Response Rate
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.customer}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">
                          {review.customer}
                        </h3>
                        <span className="text-sm text-gray-500">
                          reviewed
                        </span>
                        <span className="font-medium text-gray-900">
                          {review.product}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{review.content}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.helpful}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{review.unhelpful}</span>
                        </button>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          review.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {review.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;