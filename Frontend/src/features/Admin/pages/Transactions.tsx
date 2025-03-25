import { DataTable } from '../components/ui/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table";

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  type: 'credit' | 'debit';
}

const Transactions = () => {
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      customer: 'John Doe',
      amount: 299.99,
      status: 'completed',
      date: '2025-02-13',
      type: 'credit'
    },
    {
      id: '2',
      customer: 'Jane Smith',
      amount: 199.50,
      status: 'pending',
      date: '2025-02-13',
      type: 'debit'
    },
    {
      id: '3',
      customer: 'Mike Johnson',
      amount: 499.99,
      status: 'completed',
      date: '2025-02-12',
      type: 'credit'
    }
  ];

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
            ${amount.toFixed(2)}
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
            className={`px-2 py-1 rounded-full text-xs ${
              status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              +20.1% from last month
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
            <div className="text-2xl font-bold">$24,875.50</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
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
            <div className="text-2xl font-bold">$15,350.25</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              -5.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={recentTransactions} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;