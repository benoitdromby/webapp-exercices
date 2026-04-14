export interface Order {
    id: string
    price: number
    size: number
    side?: "bid" | "ask"
}