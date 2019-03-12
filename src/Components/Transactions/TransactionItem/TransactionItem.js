import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../transactions.css';

class TransactionItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const {id, amountCovered, paidToInsure, currency, subtotal, taxes, platformTransactionId, transactionNumber} = this.props;
        // let lastFiveTransNum = transactionNumber.slice(-5);
        console.log(transactionNumber);
        console.log(this.props);
        return(
                <div className='trans-table-body-rows'>
                    <p><Link to={`/transactiondetail/${id}`}>{platformTransactionId}</Link></p>
                    <p>${amountCovered}</p>
                    <p>${paidToInsure}</p>
                    <p>{currency}</p>
                    <p>${subtotal}</p>
                    <p>${taxes}</p>
                </div>
        )
    }
}



export default TransactionItem;