import { Search, Filter, MoreVertical } from 'lucide-react';

const mockOrders = [
  {
    id: '#ORD-1234',
    customer: 'John Doe',
    date: '2024-02-13',
    total: 299.99,
    status: 'Completed',
    items: 3
  },
  {
    id: '#ORD-1235',
    customer: 'Jane Smith',
    date: '2024-02-13',
    total: 149.99,
    status: 'Processing',
    items: 2
  },
  {
    id: '#ORD-1236',
    customer: 'Mike Johnson',
    date: '2024-02-12',
    total: 99.99,
    status: 'Cancelled',
    items: 1
  },
  // Add more mock orders as needed
];

const Orders = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex items-center gap-4">
          <button className="bg-white px-4 py-2 rounded-lg text-sm">Export</button>
          <button className="bg-white px-4 py-2 rounded-lg text-sm">Print</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <button className="bg-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">Order ID</th>
                <th className="text-left py-4 px-6">Customer</th>
                <th className="text-left py-4 px-6">Date</th>
                <th className="text-left py-4 px-6">Items</th>
                <th className="text-left py-4 px-6">Total</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-4 px-6 font-medium">{order.id}</td>
                  <td className="py-4 px-6">{order.customer}</td>
                  <td className="py-4 px-6 text-gray-500">{order.date}</td>
                  <td className="py-4 px-6">{order.items}</td>
                  <td className="py-4 px-6">${order.total}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'Completed' ? 'bg-green-50 text-green-600' :
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;