export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Content */}
        <main className="p-6 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Total Users</p>
              <h2 className="text-2xl font-bold mt-1">1,240</h2>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Revenue</p>
              <h2 className="text-2xl font-bold mt-1">₦4.2M</h2>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Transactions</p>
              <h2 className="text-2xl font-bold mt-1">8,312</h2>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Growth</p>
              <h2 className="text-2xl font-bold mt-1 text-green-600">+12%</h2>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white h-64 rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500 mb-2">Revenue Overview</p>
              <div className="h-full flex items-center justify-center text-gray-400">
                Chart goes here
              </div>
            </div>

            <div className="bg-white h-64 rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500 mb-2">User Growth</p>
              <div className="h-full flex items-center justify-center text-gray-400">
                Chart goes here
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-4">John Doe</td>
                    <td className="p-4 text-green-600">Completed</td>
                    <td className="p-4">₦120,000</td>
                    <td className="p-4 text-gray-500">Jan 20, 2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
