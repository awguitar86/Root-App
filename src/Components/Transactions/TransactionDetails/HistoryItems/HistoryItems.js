import React, {Component} from 'react';
import './historyItems.css';
import ShippingHistory from './ShippingHistory';
import TransactionHistory from './TransactionHistory';

class HistoryItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            shippingHistory: [{
                date: "10/05/2016",
                status: "Delivered",
                message: "Your item was delivered."
            }],
            transactionHistory: [{
                date: "July 1, 2018",
                status: "Paid"
            }],
            historyToggle: true
        }
        this.handleShippingHistory = this.handleShippingHistory.bind(this);
        this.handleTransactionHistory = this.handleTransactionHistory.bind(this);
    }

    handleShippingHistory(){
        this.setState({historyToggle: true});
    };

    handleTransactionHistory(){
        this.setState({historyToggle: false});
    };

    render() {
        const shippingHistory = this.state.shippingHistory;
        const transactionHistory = this.state.transactionHistory;
        const displayShippingHistoryItems = shippingHistory.map((shippedItem => {
            console.log(shippedItem);
            const index = shippingHistory.indexOf(shippedItem);
            return (<ShippingHistory
                key={`TransactionIndex${index}`}
                date={shippedItem.date}
                status={shippedItem.status}
                message={shippedItem.message}
            />)
        }))
        const displayTransactionHistoryItems = transactionHistory.map((transItem => {
            console.log(transItem);
            const index = transactionHistory.indexOf(transItem);
            return (<TransactionHistory
                key={`TransactionIndex${index}`}
                date={transItem.date}
                status={transItem.status}
            />)
        }))
        return(
            <div className="order-history">
                <div className='order-history-header'>
                    <button className={this.state.historyToggle ? 'shipping-history-btn' : 'shipping-history-btn-off'} onClick={this.handleShippingHistory}>Shipping History</button>
                    <button className={this.state.historyToggle ? 'transaction-history-btn-off' : 'transaction-history-btn'} onClick={this.handleTransactionHistory}>Transaction History</button>
                </div>

                <div className={this.state.historyToggle ? 'shipping-history' : 'shipping-history-off'}>
                    <table>
                        <thead className='shipping-history-head'>
                            <tr>
                                <th className='ship-hist-head-date'> Date </th>
                                <th className='ship-hist-head-status'> Status </th>
                                <th className='ship-hist-head-message'> Message </th>
                            </tr>
                        </thead>
                        {displayShippingHistoryItems}
                    </table>
                </div>

                <div className={this.state.historyToggle ? 'transaction-history-off' : 'transaction-history'}>
                    <table>
                        <thead className='transaction-history-head'>
                            <tr>
                                <th> Date </th>
                                <th> Status </th>
                            </tr>
                        </thead>
                        {displayTransactionHistoryItems}
                    </table>
                </div>
            </div>
        )
    }
}

export default HistoryItems;