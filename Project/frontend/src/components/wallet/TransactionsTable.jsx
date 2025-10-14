import React, { memo } from 'react'

const TransactionRow = memo(({ 
  transaction, 
  index, 
  formatDate, 
  formatBTC 
}) => {
  return (
    <tr key={index} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          transaction.type === 'received' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {transaction.type === 'received' ? '↓ Received' : '↑ Sent'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatBTC(transaction.amount)} BTC
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
        {transaction.hash ? `${transaction.hash.slice(0, 10)}...${transaction.hash.slice(-10)}` : 'N/A'}
      </td>
    </tr>
  )
})

TransactionRow.displayName = 'TransactionRow'

const TransactionsTable = memo(({ 
  transactions, 
  formatDate, 
  formatBTC 
}) => {
  if (!transactions || transactions.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.slice(0, 10).map((tx, index) => (
              <TransactionRow
                key={tx.hash || index}
                transaction={tx}
                index={index}
                formatDate={formatDate}
                formatBTC={formatBTC}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

TransactionsTable.displayName = 'TransactionsTable'

export default TransactionsTable