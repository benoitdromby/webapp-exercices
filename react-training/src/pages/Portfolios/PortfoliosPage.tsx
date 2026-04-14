import BasicLoader from '../../components/Loaders/BasicLoader'
import PortfolioList from '../../components/Portfolio/PortfolioList'
import { usePortfolio } from '../../hooks/usePortfolio'

function Portfolios() {
    const { positions, 
        marketPrices, 
        loading,
        updateItem,
        updatedItem } = usePortfolio()
    function handleUpdateItem(updating: boolean) {
        updateItem(updating)
    }
    function handleUpdatedItem() {
        updatedItem()
    }
    if(loading) {
        return (
            <BasicLoader />
        )
    } else {
        return (
            <PortfolioList 
                positions={positions} 
                marketPrices={marketPrices}
                onStartUpdateItem={handleUpdateItem}
                onEndUpdateItem={handleUpdatedItem}
            />
        )
    }
}

export default Portfolios
