import React, {Component} from 'react';
import '../transactionDetail.css';

class ShippingHistory extends Component {

    render() {
        const {date, status, message} = this.props;
        console.log(this.props);
        return(
            <tbody className='shipping-history-table-body'>
                <tr>
                    <td className='ship-history-date'>{date}</td>
                    <td className='ship-history-status'>{status}</td>
                    <td className='ship-history-message'>{message}</td>
                </tr>
            </tbody>
        )
    }
}

export default ShippingHistory;