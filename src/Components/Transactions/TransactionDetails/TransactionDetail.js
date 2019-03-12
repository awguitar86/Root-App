import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './transactionDetail.css';
import { updateOrder, updateEntity, updateMerchant, updatePlatform, updateUser } from '../../../Redux/actions';
import { connect } from 'react-redux';
import MenuHeader from '../../MenuHeader/MenuHeader';
import HistoryItems from './HistoryItems/HistoryItems';

// import MailIcon from '../../../images/MailIcon.png';
// import CalenderIcon from '../../../images/DateCalenderIcon-01.png';
// import UserIcon from '../../../images/UserIcon-01.png';
import { findOrderById } from '../../../services/order.services';
// import moment from 'moment';


class TransactionDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // transactionName:'Transaction 83-50',
            // orderID: '1010',
            // orderDate:'DEFAULT',
            // phone:'801-555-9876',
            // country:'United States',
            // valueTerm:'525.25 USD',
            // email: 'jerry@gmail.com',
            // insuredCost: '5.25 USD',
            // insuredValue: '525.25 USD',
            // city: 'Provo',
            // created: '07-01-2018',
            // name:'Jerry George',
            // state: 'Utah',
            // order: [{
            amount_covered: 95,
            create_date: "07-01-2018",
            currency: "USD",
            customer: "Tim Burns",
            destination: "Boise, ID",
            email: "tim@gmail.com",
            paid_to_insure: 0.98,
            phone: "801-555-1234",
            platform_transaction_id: 12345,
            transaction_number: 987654
        }
    }

    // componentDidMount() {
    // let id = this.props.match.params.id;
    // console.log(id);
    // findOrderById(id)
    //     .then( res => {
    //         if (res.status !== 200){
    //             console.log(res);
    //         }
    //         else{
    //             this.setState({ order: res.data });
    //         }
    //     })
    // }

    render() {
        console.log(this.state.order);
        let {
            amount_covered,
            create_date,
            currency,
            customer,
            destination,
            email,
            paid_to_insure,
            phone,
            platform_transaction_id,
            transaction_number
        } = this.state;
        // const id = this.props.match.params.id;
        return (
            <div className='trans-detail-wrap'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <div className="trans-detail-header">
                    <h2>Transaction Detail</h2>
                    <Link to='/transactions'><button>Back</button></Link>
                </div>
                <div className="trans-detail-body">
                    <div className="order-info">
                        <div className="order-id">
                            <div><h2>{platform_transaction_id}</h2></div>
                            <h2>Order Id</h2>
                        </div>
                        <div className="order-info-body">
                            <div className="order-info-left">
                                <div className="left-item">
                                    <div className="left-item-text">
                                        <h4>Order Date</h4>
                                        <p>{create_date}</p>
                                    </div>
                                </div>
                                <div className="left-item">
                                    <div className="left-item-text">
                                        <h4>Insured Value</h4>
                                        <p>${amount_covered}</p>
                                    </div>
                                </div>
                                <div className="left-item">
                                    <div className="left-item-text">
                                        <h4>Insured Cost</h4>
                                        <p>${paid_to_insure}</p>
                                    </div>
                                </div>
                                <div className="left-item">
                                    <div className="left-item-text">
                                        <h4>Currency</h4>
                                        <p>{currency}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-info-middle">
                                <div className="middle-item">
                                    <div className="middle-item-text">
                                        <h4>Customer</h4>
                                        <p>{customer}</p>
                                    </div>
                                </div>
                                <div className="middle-item">
                                    <div className="middle-item-text">
                                        <h4>Email</h4>
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <div className="middle-item">
                                    <div className="middle-item-text">
                                        <h4>Destination</h4>
                                        <p>{destination}</p>
                                    </div>
                                </div>
                                <div className="middle-item">
                                    <div className="middle-item-text">
                                        <h4>Phone</h4>
                                        <p>{phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-info-right"></div>
                        </div>
                        <div className='transaction-number'><h4>Transaction Number :</h4><h3>{transaction_number}</h3></div>
                    </div>
                    <HistoryItems />
                </div>

            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}


export default connect(mapStateToProps, {updateOrder, updateEntity, updateMerchant, updatePlatform, updateUser}) (TransactionDetail);