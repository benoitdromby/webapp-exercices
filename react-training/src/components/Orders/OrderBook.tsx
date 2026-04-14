import { Order } from "../../types/orderBookTypes"
import OrderRow from './OrderRow'

function AsksList ({asks}:{asks: Order[]}) {
    if(asks) {
        return (
        <div>
            <h2 className="text-center">ASKS</h2>
            <table>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                {asks.map((ask) => (
                    <OrderRow 
                        key={ask.id} 
                        order={ask} 
                    />
                ))}
                </tbody>
            </table>
        </div>
        );
    } else {
        return ('')
    }
        
}

function BidsList ({bids}:{bids: Order[]}) {
        if(bids) {
            return (
            <div>
                <h2 className="text-center">BIDS</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                    {bids.map((ask) => (
                        <OrderRow 
                            key={ask.id} 
                            order={ask} 
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            );
        } else {
            return ('')
        }
        
    }

function OrderBook({ bids, asks }: { bids: Order[], asks:Order[] }) {
    return (
        <div>
            <AsksList asks={asks} /> 
            <BidsList bids={bids} /> 
        </div>
    )
}

export default OrderBook
