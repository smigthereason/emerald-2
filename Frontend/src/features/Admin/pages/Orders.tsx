import { useState } from 'react';
import { Search, Filter, MoreVertical, ChevronDown, Printer, Download } from 'lucide-react';

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
];

const Orders = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-600';
      case 'Processing':
        return 'bg-blue-50 text-blue-600';
      default:
        return 'bg-red-50 text-red-600';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Orders</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="flex-1 sm:flex-none bg-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex-1 sm:flex-none bg-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search orders..."
            className="flex-1 bg-transparent outline-none w-full min-w-0"
          />
        </div>
        <button className="bg-white px-4 py-2 rounded-lg flex items-center justify-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Orders Table/Cards */}
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
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
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(order.status)}`}>
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

        {/* Mobile Card View */}
        <div className="md:hidden divide-y">
          {mockOrders.map((order) => (
            <div key={order.id} className="p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === order.id ? null : order.id)}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium">{order.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedRow === order.id ? 'transform rotate-180' : ''
                  }`} 
                />
              </div>

              {expandedRow === order.id && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Date:</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Items:</span>
                    <span>{order.items}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-medium">${order.total}</span>
                  </div>
                  <button className="w-full mt-2 text-gray-400 hover:text-gray-600 flex items-center justify-center py-2 border-t">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;