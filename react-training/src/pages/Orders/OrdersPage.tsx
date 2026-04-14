import OrderBook from '../../components/Orders/OrderBook'
import GlobalLoader from '../../components/Loaders/GlobalLoader'
import ErrorMessage from '../../components/Error/ErrorMessage'
import { useOrderBook } from '../../hooks/useOrderBook'

function Orders() {
    const { asks, bids, firstLoad, isError } = useOrderBook()
    if(isError) {
        return (
            <ErrorMessage message='An error occurred' />
        )
    } else {
        return (
        <div>
            <GlobalLoader isLoading={firstLoad} />
            <OrderBook 
                asks={asks} 
                bids={bids}
            />
        </div>
    )
    }  
}

export default Orders
