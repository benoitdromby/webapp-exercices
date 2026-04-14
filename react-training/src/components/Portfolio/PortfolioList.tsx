import { Position, Prices } from "../../types/portfolioTypes"
import { modifyPosition, deletePosition } from "../../services/portfolio.service"
import { useState } from 'react'
import PortfolioLine from './PortfolioLine'

function PortfolioList({ positions, marketPrices, onStartUpdateItem, onEndUpdateItem }: { positions: Position[], marketPrices:Prices, onStartUpdateItem: (editing: boolean) => void, onEndUpdateItem: (id: string) => void }) {
    const [hideChangeInput, setHideChangeInput] = useState<string>('')
    const handleStartChangeQuantity = (isChanging:boolean) => {
        onStartUpdateItem(isChanging);
    }
    const handleEndChangeQuantity = (form: HTMLFormElement, id: string | undefined) => {
        const quantity = new FormData(form).get('quantity')
        if(quantity && quantity?.toString().trim().length && !isNaN(parseInt(quantity?.toString())) && id) {
            modifyPosition({
                quantity: parseInt(quantity?.toString())
            }, id).then(() => {
                onEndUpdateItem(id)
            });
            setHideChangeInput(id);
        }
    }
    const handleDeletePosition = (id: string | undefined) => {
        if(id) {
            deletePosition(id).then(() => {
                onEndUpdateItem(id)
            });
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Buy Price</th>
                    <th>Market Price</th>
                    <th>PnL</th>
                    <th>Modify Quantity</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {positions.map((position) => (
                <PortfolioLine 
                    key={position._id} 
                    position={position} 
                    marketPrices={marketPrices}
                    hideChangeInput={hideChangeInput}
                    onStartChangeQuantity={handleStartChangeQuantity}
                    onEndChangeQuantity={handleEndChangeQuantity} 
                    onDeletePosition={handleDeletePosition}
                />
            ))}
            </tbody>
        </table>
    )
}

export default PortfolioList
