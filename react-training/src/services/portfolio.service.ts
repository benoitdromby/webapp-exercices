import { PortfolioItem } from "../types/portfolioTypes"
import { API_URL } from "../constants/constants"

export function calculatePnl(quantity: number, marketPrice: number, buyPrice: number) {
  return ((quantity * marketPrice) - (quantity * buyPrice)).toFixed(2)
}

export async function fetchPrices({ signal }: { signal?: AbortSignal } = {}) {
    return fetch(`${API_URL}/prices`, { signal }).then(r => r.json())
}

export async function fetchPositions({ signal }: { signal?: AbortSignal } = {}) {
    return fetch(`${API_URL}/positions`, { signal }).then(r => r.json())
}

export async function modifyPosition(payload: PortfolioItem, id: string) {
    return fetch(`${API_URL}/positions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
        console.log(error);
      });
}

export async function deletePosition(id: string) {
    return fetch(`${API_URL}/positions/${id}`, {
      method: "DELETE",
    }).catch((error) => {
        console.log(error);
      });
}
