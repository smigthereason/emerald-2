import { Search, Filter, MoreVertical, Mail, Phone } from 'lucide-react';

const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8901',
    orders: 12,
    totalSpent: 1499.99,
    lastOrder: '2024-02-10'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234-567-8902',
    orders: 8,
    totalSpent: 899.99,
    lastOrder: '2024-02-08'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 234-567-8903',
    orders: 5,
    totalSpent: 599.99,
    lastOrder: '2024-02-05'
  }
];

const Customers = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <div className="flex items-center gap-4">
          <button className="bg-white px-4 py-2 rounded-lg text-sm">Export CSV</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Add Customer</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <button className="bg-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-6">Customer</th>
                <th className="text-left py-4 px-6">Contact</th>
                <th className="text-left py-4 px-6">Orders</th>
                <th className="text-left py-4 px-6">Total Spent</th>
                <th className="text-left py-4 px-6">Last Order</th>
                <th className="text-left py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="border-b last:border-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">Customer ID: #{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{customer.orders}</td>
                  <td className="py-4 px-6">${customer.totalSpent.toFixed(2)}</td>
                  <td className="py-4 px-6 text-gray-500">{customer.lastOrder}</td>
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

export default Customers;