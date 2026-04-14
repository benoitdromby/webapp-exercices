import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchOrderBook, fetchOrderBookUpdate } from '../services/orderbook.service'
import { Order } from '../types/orderBookTypes'

type OrderMap = Record<string, Order>

type OrderBookState = {
  bids: OrderMap
  asks: OrderMap
}

export function useOrderBook() {


  const [orderBook, setOrderBook] = useState<OrderBookState>({
    bids: {},
    asks: {},
  })

  const {
    data: snapshot,
    isLoading: firstLoad,
    isError,
  } = useQuery({
    queryKey: ['orderbook'],
    queryFn: ({ signal }) => fetchOrderBook({ signal }),
  })


  const {
    data: updates = [],
  } = useQuery({
    queryKey: ['orderbook-updates'],
    queryFn: ({ signal }) => fetchOrderBookUpdate({ signal }),
    refetchInterval: 100, 
  })
  useEffect(() => {
    if (!snapshot) return

    const bids: OrderMap = {}
    const asks: OrderMap = {}

    snapshot.bids.forEach((order: Order) => {
      bids[order.id] = { ...order, side: 'bid' }
    })

    snapshot.asks.forEach((order: Order) => {
      asks[order.id] = { ...order, side: 'ask' }
    })

    setOrderBook({ bids, asks })
  }, [snapshot])

  useEffect(() => {
    if (!updates.length) return

    setOrderBook(prev => {
      const next = {
        bids: { ...prev.bids },
        asks: { ...prev.asks },
      }

      updates.forEach((update: Order) => {
        const side = (update.side === 'bid' ? 'bids' : 'asks') as 'bids' | 'asks'
        const targetMap = next[side]

        if (update.size === 0) {
          delete targetMap[update.id]
        } else if(update?.id) {
          targetMap[update.id] = update
        }
      })

      return next
    })
  }, [updates])

  const bids = useMemo(() => {
    return Object.values(orderBook.bids)
      .sort((a, b) => b.price - a.price)
      .slice(0, 10) // top 10
  }, [orderBook.bids])

  const asks = useMemo(() => {
    return Object.values(orderBook.asks)
      .sort((a, b) => a.price - b.price)
      .slice(0, 10)
  }, [orderBook.asks])

  return {
    bids,
    asks,
    firstLoad,
    isError,
  }
}