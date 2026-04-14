import React from 'react'
import { Order } from '../../types/orderBookTypes';

function OrderRow(
        {order}:
        {order: Order}
    ) {
    return (
        <tr key={order.id}>
            <td>{order.price}</td>
            <td>{order.size}</td>
        </tr>
    )
}

export default React.memo(OrderRow)