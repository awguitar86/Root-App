import React, {Component} from 'react';

class TransactionHistory extends Component {

    render() {
        const {date, status } = this.props;
        console.log(this.props);
        return(
            <tbody className='transaction-history-table-body'>
                <tr>
                    <td>{date}</td>
                    <td>{status}</td>
                </tr>
            </tbody>
        )
    }
}

export default TransactionHistory;