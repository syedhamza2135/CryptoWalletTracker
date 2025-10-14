import React, { memo } from 'react'

const SearchHistoryRow = memo(({ 
  search, 
  onSearchClick, 
  formatDate, 
  formatBTC 
}) => {
  console.log('Rendering search row for:', search);
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-mono text-sm text-gray-900">
          {search.walletAddress?.slice(0, 8)}...{search.walletAddress?.slice(-8)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {search.balance 
          ? `${formatBTC(search.balance)} BTC`
          : search.balanceBTC 
          ? `${search.balanceBTC} BTC`
          : 'N/A'
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {search.totalTransactions || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(search.searchDate || search.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => onSearchClick(search.walletAddress)}
          className="text-orange-600 hover:text-orange-900 transition-colors"
        >
          View Details
        </button>
      </td>
    </tr>
  )
})

SearchHistoryRow.displayName = 'SearchHistoryRow'

const SearchHistoryTable = memo(({ 
  searchHistory, 
  onSearchClick, 
  formatDate, 
  formatBTC 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {searchHistory.map((search) => (
            <SearchHistoryRow
              key={search._id}
              search={search}
              onSearchClick={onSearchClick}
              formatDate={formatDate}
              formatBTC={formatBTC}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
})

SearchHistoryTable.displayName = 'SearchHistoryTable'

export default SearchHistoryTable