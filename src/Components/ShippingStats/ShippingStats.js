import React, {Component} from 'react';
import './shippingStats.css';
import Delivered from '../../images/DeliveredBackground.svg';
import OutForDelivery from '../../images/OutForDeliveryBackground.svg';
import InTransit from '../../images/InTransitBackground.svg';
import Exception from '../../images/ExceptionBackground.svg';

// import DeliveredIcon from '../../images/RouteCheckmark.svg';
// import OutForDeliveryIcon from '../../images/RouteOutForDeliveryIcon.svg';
// import InTransitIcon from '../../images/RouteInTransitIcon.svg';
// import ExceptionIcon from '../../images/RouteExceptionIcon.svg';

import { updateMerchant } from '../../Redux/actions';
import { connect } from 'react-redux';

class ShippingStats extends Component {
    render() {
        return (
            <div className='shipping-stats'>
                <div className='delivered'>
                    <p>{this.props.merchantInfo.delivered}</p>
                    {/* <p>8549</p> */}
                    <img src={Delivered} alt="delivered background"/>
                </div>
                <div className='out-for-delivery'>
                    <p>{this.props.merchantInfo.out_for_delivery}</p>
                    {/* <p>4832</p> */}
                    <img src={OutForDelivery} alt="delivered background"/>
                </div>
                <div className='in-transit'>
                    <p>{this.props.merchantInfo.in_transit}</p>
                    {/* <p>5329</p> */}
                    <img src={InTransit} alt="delivered background"/>
                </div>
                <div className='exception'>
                    <p>{this.props.merchantInfo.exception}</p>
                    {/* <p>103</p> */}
                    <img src={Exception} alt="delivered background"/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant}) (ShippingStats);