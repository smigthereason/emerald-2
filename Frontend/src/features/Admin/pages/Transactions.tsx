import { ColumnDef } from "@tanstack/react-table";
import axios from 'axios';
import { ArrowDownLeft, ArrowUpRight, BarChart, DollarSign, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { DataTable } from '../components/ui/data-table';

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  type: 'credit' | 'debit';
}

interface ProductStat {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

interface TransactionStats {
  totalRevenue: number;
  incoming: number;
  outgoing: number;
  monthlyGrowth: number;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [topProducts, setTopProducts] = useState<ProductStat[]>([]);
  const [stats, setStats] = useState<TransactionStats>({
    totalRevenue: 0,
    incoming: 0,
    outgoing: 0,
    monthlyGrowth: 0,
  });
  const [loading, setLoading] = useState({
    transactions: true,
    products: true,
    stats: true,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
    fetchTopProducts();
    fetchTransactionStats();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(prev => ({ ...prev, transactions: true }));
      const response = await axios.get('http://127.0.0.1:5000/admin/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(response.data.transactions || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions');
      // Fallback to mock data
      setTransactions(mockTransactions);
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }));
    }
  };

  const fetchTopProducts = async () => {
    try {
      setLoading(prev => ({ ...prev, products: true }));
      const response = await axios.get('http://127.0.0.1:5000/admin/products/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTopProducts(response.data.top_products || []);
    } catch (err) {
      console.error('Error fetching product stats:', err);
      // Fallback to mock data
      setTopProducts(mockTopProducts);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  const fetchTransactionStats = async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      const response = await axios.get('http://127.0.0.1:5000/admin/transactions/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStats(response.data || mockStats);
    } catch (err) {
      console.error('Error fetching transaction stats:', err);
      // Fallback to mock data
      setStats(mockStats);
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <span>#{row.getValue("id")}</span>,
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        const type = row.original.type;

        return (
          <span className={type === "credit" ? "text-green-500" : "text-red-500"}>
            Ksh {amount}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${status === "completed"
              ? "bg-green-100 text-green-800"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
              }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <button className="px-4 py-2 bg-[#d66161] text-white rounded-lg hover:bg-[#c26276] transition-colors">
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Ksh{loading.stats ? "..." : stats.totalRevenue}
            </div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {loading.stats ? "..." : `+${stats.monthlyGrowth}% from last month`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Incoming
            </CardTitle>
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Ksh {loading.stats ? "..." : stats.incoming}
            </div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Outgoing
            </CardTitle>
            <ArrowDownLeft className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Ksh {loading.stats ? "..." : stats.outgoing}
            </div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              -5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Success Rate
            </CardTitle>
            <BarChart className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading.transactions ? "..." :
                `${Math.round((transactions.filter(t => t.status === 'completed').length / transactions.length) * 100)}%`}
            </div>
            <p className="text-xs text-blue-500 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +3.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading.products ? (
            <div className="flex justify-center py-4">Loading product stats...</div>
          ) : topProducts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No product statistics available</div>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Ksh{product.revenue.toFixed(2)}</p>
                    <p className={`text-xs ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.growth >= 0 ? '+' : ''}{product.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {loading.transactions ? (
            <div className="flex justify-center py-4">Loading transactions...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <DataTable columns={columns} data={transactions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Mock data for development and fallback
const mockTransactions: Transaction[] = [
  {
    id: "1",
    customer: "John Doe",
    amount: 2990,
    status: "completed",
    date: "2024-02-15",
    type: "credit"
  },
  {
    id: "2",
    customer: "Jane Smith",
    amount: 19950,
    status: "pending",
    date: "2024-02-14",
    type: "debit"
  },
  {
    id: "3",
    customer: "Mike Johnson",
    amount: 4799,
    status: "completed",
    date: "2024-02-13",
    type: "credit"
  },
  {
    id: "4",
    customer: "Sarah Williams",
    amount: 14980,
    status: "failed",
    date: "2024-02-12",
    type: "debit"
  },
  {
    id: "5",
    customer: "Alex Brown",
    amount: 39965,
    status: "completed",
    date: "2024-02-11",
    type: "credit"
  }
];

const mockTopProducts: ProductStat[] = [
  {
    id: 1,
    name: "Premium T-Shirt",
    sales: 245,
    revenue: 4900,
    growth: 12.5
  },
  {
    id: 2,
    name: "Designer Jeans",
    sales: 187,
    revenue: 7480,
    growth: 8.3
  },
  {
    id: 3,
    name: "Leather Jacket",
    sales: 97,
    revenue: 9700,
    growth: 15.2
  },
  {
    id: 4,
    name: "Running Shoes",
    sales: 156,
    revenue: 6240,
    growth: -2.1
  },
  {
    id: 5,
    name: "Casual Hoodie",
    sales: 134,
    revenue: 4020,
    growth: 5.7
  }
];

const mockStats: TransactionStats = {
  totalRevenue: 45231.89,
  incoming: 24875,
  outgoing: 15350,
  monthlyGrowth: 20.1
};

export default Transactions;

