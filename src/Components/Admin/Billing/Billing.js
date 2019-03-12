import React, {Component} from 'react';
import './billing.css';
import {Link} from 'react-router-dom';
import MenuHeader from '../../MenuHeader/MenuHeader';
import BillingItem from './BillingItem/BillingItem';
import { findMerchantBilling } from '../../../services/billing.services';
import { findPlatformBilling } from '../../../services/platform.service';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../../Redux/actions';
import { connect } from 'react-redux';

class Billing extends Component {
    constructor(props){
        super(props);
        this.state = {
            billing: [{
                label: "My Bank",
                added_by: "John Smith",
                create_date: "February 5, 2015"
            }]
        }
    }

    componentDidMount(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        if( entity === 'ROUTE_PLATFORM' ){
            findPlatformBilling(platId)
            .then( res => {
                if (res.status !== 200){
                    alert(res);
                    }
                    else {
                    this.setState({ billing: res.data });
                    console.log(res.data);
                    }
                });
            }
            else {
                findMerchantBilling(merchId)
                .then(res => {
                    if (res.status !== 200){
                      alert(res);
                    }
                    else {
                      this.setState({ billing: res.data });
                      console.log(res.data);
                    }
                  });
        }

    }

    render() {
        const billingInfo = this.state.billing;
        console.log(billingInfo.length);
        let displayBilling;
        if(billingInfo.length > 0) {
            displayBilling = billingInfo.map(billing => {
                const index = billingInfo.indexOf(billing);
                console.log(billing);
                return <BillingItem
                    key={index}
                    label={billing.label ? billing.label : null}
                    addedBy={billing.added_by ? billing.added_by : null}
                    created={billing.create_date ? billing.create_date : null}
                />
            })
        }
        else {
            displayBilling = <p className='add-your-billing'></p>
        }
        console.log(this.state);
        return (
            <div className='billing-wrap'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <div className='billing-header'>
                    <h2>Billing</h2>
                </div>
                <div className='billing'>
                    <div className='billing-table'>
                            <div className='billing-table-head'>
                                <p><a href=""> Label </a></p>
                                <p><a href=""> Added By </a></p>
                                <p><a href=""> Created </a></p>
                            </div>
                            <div className='billing-table-body'>
                                {displayBilling}
                            </div>
                    </div>
                    <div className='add-billing-type-button'>
                        <Link to='/billingtype'><button>Add Billing Type</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (Billing);