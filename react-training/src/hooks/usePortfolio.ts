import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchPositions, fetchPrices } from '../services/portfolio.service'

export function usePortfolio() {
    const [isItemEditing, setItemEditing] = useState(false)
    const queryClient = useQueryClient()

    const { data: positions = [], isLoading: loading } = useQuery({
        queryKey: ['positions'],
        queryFn: ({ signal }) => fetchPositions({ signal }),
    })

    useQuery({
        queryKey: ['prices'],
        queryFn: ({ signal }) => fetchPrices({ signal }),
        refetchInterval: isItemEditing ? false : 5000,
    })

    const marketPrices: Record<string, number> = queryClient.getQueryData(['prices']) ?? { '': 0 }  

    function updateItem(updating: boolean) {
        setItemEditing(updating)
    }

    function updatedItem() {
        setItemEditing(false)
        queryClient.invalidateQueries({ queryKey: ['positions'] })
    }

    return {
        positions,
        marketPrices,
        loading,
        updateItem,
        updatedItem,
    }
}
