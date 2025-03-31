import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const mockSalesData = [
  { month: "Jan", sales: 4000, profit: 2400 },
  { month: "Feb", sales: 3000, profit: 1398 },
  { month: "Mar", sales: 2000, profit: 9800 },
  { month: "Apr", sales: 2780, profit: 3908 },
  { month: "May", sales: 1890, profit: 4800 },
  { month: "Jun", sales: 2390, profit: 3800 },
];

const mockCategoryData = [
  { name: "Tops", value: 400 },
  { name: "Jeans", value: 300 },
  { name: "Jackets", value: 300 },
  { name: "Skirts", value: 200 },
  { name: "Dresses", value: 278 },
  { name: "Shoes", value: 189 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF5733",
];

const Stats = () => {
  return (
    <div className="space-y-4 p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold">Statistics</h1>
        <div className="flex items-center">
          <select className="bg-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm w-full sm:w-auto">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales & Profit Chart */}
        <div className="bg-white sm:bg-gray-200 p-3 sm:p-6 rounded-2xl shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Sales & Profit</h2>
          <div className="h-48 sm:h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white sm:bg-gray-200 p-3 sm:p-6 rounded-2xl shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Category Distribution</h2>
          <div className="h-48 sm:h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryData}
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockCategoryData.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white sm:bg-gray-200 p-3 sm:p-6 rounded-2xl shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Monthly Revenue</h2>
          <div className="h-48 sm:h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="bg-white sm:bg-gray-200 p-3 sm:p-6 rounded-2xl shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-blue-50 rounded-xl">
              <p className="text-xs sm:text-sm text-gray-600">Total Sales</p>
              <p className="text-xl sm:text-2xl font-semibold text-blue-600">Ksh 24,156</p>
              <p className="text-xs sm:text-sm text-green-500 mt-1">
                +12% from last month
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 rounded-xl">
              <p className="text-xs sm:text-sm text-gray-600">Total Profit</p>
              <p className="text-xl sm:text-2xl font-semibold text-green-600">Ksh 18,240</p>
              <p className="text-xs sm:text-sm text-green-500 mt-1">+8% from last month</p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-50 rounded-xl">
              <p className="text-xs sm:text-sm text-gray-600">Average Order</p>
              <p className="text-xl sm:text-2xl font-semibold text-purple-600">Ksh 1560</p>
              <p className="text-xs sm:text-sm text-red-500 mt-1">-3% from last month</p>
            </div>
            <div className="p-3 sm:p-4 bg-orange-50 rounded-xl">
              <p className="text-xs sm:text-sm text-gray-600">Conversion Rate</p>
              <p className="text-xl sm:text-2xl font-semibold text-orange-600">2.4%</p>
              <p className="text-xs sm:text-sm text-green-500 mt-1">+5% from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;