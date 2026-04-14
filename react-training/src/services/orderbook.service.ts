import { API_URL } from "../constants/constants"

export async function fetchOrderBook({ signal }: { signal?: AbortSignal } = {}) {
    return fetch(`${API_URL}/orderbook`, { signal }).then(r => r.json())
}

export async function fetchOrderBookUpdate({ signal }: { signal?: AbortSignal } = {}) {
    return fetch(`${API_URL}/orderbook/updates`, { signal }).then(r => r.json())
}