import { useMemo } from 'react'

// Memoized formatters to avoid recreating functions on each render
export const useFormatters = () => {
  const formatBTC = useMemo(() => (satoshis) => {
    if (!satoshis) return '0.00000000'
    return (satoshis / 100000000).toFixed(8)
  }, [])

  const formatDate = useMemo(() => (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }, [])

  const formatDateTime = useMemo(() => (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  const formatNumber = useMemo(() => (number) => {
    if (!number) return '0'
    return number.toLocaleString()
  }, [])

  return {
    formatBTC,
    formatDate,
    formatDateTime,
    formatNumber
  }
}