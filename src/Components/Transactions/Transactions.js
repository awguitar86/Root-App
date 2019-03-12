import React, {Component} from 'react';
import './transactions.css';
import { updateOrder, updateEntity, updateMerchant, updatePlatform, updateUser } from '../../Redux/actions';
import { connect } from 'react-redux';
import { findAllOrders } from '../../services/order.services'
import MenuHeader from '../MenuHeader/MenuHeader';
import TransactionItem from './TransactionItem/TransactionItem';
import { UV_UDP_REUSEADDR } from 'constants';
// import {Link} from 'react-router-dom';

class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {
                    amount_covered: 95,
                    paid_to_insure: 0.98,
                    currency: "USD",
                    subtotal: 95.98,
                    taxes: 6.18,
                    platform_transaction_id: 12345,
                    transaction_number: 987654,
                    id: 123
                },
                {
                    amount_covered: 168,
                    paid_to_insure: 1.98,
                    currency: "USD",
                    subtotal: 169.98,
                    taxes: 10.92,
                    platform_transaction_id: 12356,
                    transaction_number: 987665,
                    id: 234
                },
                {
                    amount_covered: 43,
                    paid_to_insure: 0.98,
                    currency: "USD",
                    subtotal: 43.98,
                    taxes: 2.80,
                    platform_transaction_id: 12367,
                    transaction_number: 987676,
                    id: 345
                },
                {
                    amount_covered: 64.52,
                    paid_to_insure: 0.98,
                    currency: "USD",
                    subtotal: 65.50,
                    taxes: 4.20,
                    platform_transaction_id: 12389,
                    transaction_number: 987687,
                    id: 456
                }
            ]
        };
    }

    // componentDidMount() {
    //     let id = this.props.merchantInfo.id;
    //     let entity = this.props.entityInfo.entity;
    //     if(entity.includes('ROUTE_MERCHANT')){
    //         findAllOrders(id)
    //         .then( res => {
    //             if (res.status !== 200){
    //                 console.log(res);
    //             }
    //             else{
    //                 this.setState({ orders: res.data });
    //                 console.log(res.data);
    //             }
    //         })
    //     }
    //     else {
    //         this.setState({orders: []});
    //     }
    // }


    render() {
        console.log(this.state);
        const orders = this.state.orders;
        const displayTransactionItems = orders.map((order => {
            console.log(order);
            const index = orders.indexOf(order);
            return (<TransactionItem
                key={`TransactionIndex${index}`}
                index={index}
                id={order.id ? order.id : null}
                amountCovered={order.amount_covered ? order.amount_covered : '0.00'}
                paidToInsure={order.paid_to_insure ? order.paid_to_insure : '0.00'}
                currency={order.currency ? order.currency : null}
                subtotal={order.subtotal ? order.subtotal : null}
                taxes={order.taxes ? order.taxes : '0.00'}
                platformTransactionId={order.platform_transaction_id ? order.platform_transaction_id : null}
                transactionNumber={order.transaction_number ? order.transaction_number : null}
            />)
        }))
        return (
            <div className='trans-wrap'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <div className='trans-body'>
                    <div className='trans-header'>
                        <h2>Transactions</h2>
                    </div>
                    <div className='transactions'>
                        <div className='transaction-table'>
                            <div className='trans-table-head'>
                                <p><a href=""> Platform Transaction Id </a></p>
                                <p><a href=""> Amount Covered </a></p>
                                <p><a href=""> Paid To Insure </a></p>
                                <p><a href=""> Currency </a></p>
                                <p><a href=""> Subtotal </a></p>
                                <p><a href=""> Taxes </a></p>
                            </div>
                            <div className='trans-table-body'>
                                {displayTransactionItems}
                            </div>
                        </div>
                    </div>
                    <div className='trans-entries'>
                        <p>Showing {orders.length} entries</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}


export default connect(mapStateToProps, {updateOrder, updateEntity, updateMerchant, updatePlatform, updateUser}) (Transactions);