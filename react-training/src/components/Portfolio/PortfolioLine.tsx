import React from 'react'
import { Position, Prices } from '../../types/portfolioTypes';
import { useState, useEffect, useMemo } from 'react'
import { calculatePnl } from '../../services/portfolio.service';

function PortfolioLine(
        {position, hideChangeInput, marketPrices, onStartChangeQuantity, onEndChangeQuantity, onDeletePosition}:
        {position: Position, hideChangeInput:string, marketPrices:Prices, onStartChangeQuantity:(value: boolean) => void, onEndChangeQuantity:(form: HTMLFormElement, id: string) => void, onDeletePosition: (id: string) => void}
    ) {
    const [displayChange, setDisplayChange] = useState<boolean>(false)
    const marketPrice = marketPrices[position.symbol] ?? position.price
    useEffect(() => {
        if(hideChangeInput === position._id) {
            setDisplayChange(false)
        }
    }, [hideChangeInput, position._id]);
    const toggleEditQuantity = () => {
        const newVal = !displayChange
        onStartChangeQuantity(newVal);
        setDisplayChange(newVal)
    };
    const calculatedPnl = useMemo(() => calculatePnl(position.quantity, marketPrice, position.price), [position.quantity, marketPrice, position.price])
    return (
        <tr key={position._id}>
            <td>{position.symbol}</td>
            <td>{position.quantity}</td>
            <td>{position.price}</td>
            <td>{marketPrice}</td>
            <td>{calculatedPnl}</td>
            <td>
                <span style={{cursor:'pointer'}} onClick={toggleEditQuantity}>Change</span>
                <form style={{display: displayChange ? 'inline' : 'none' }} onSubmit={e => {
                    e.preventDefault();
                    if(e?.target) {
                        onEndChangeQuantity(e.target, position._id);
                    }                  
                }}>
                    <input name="quantity" defaultValue={position.quantity} />
                    <button type="submit">Change</button>
                </form>
            </td>
            <td>
                <span style={{cursor:'pointer'}} onClick={_e => onDeletePosition(position._id)}>Delete</span>
            </td>
        </tr>
    )
}

export default React.memo(PortfolioLine)