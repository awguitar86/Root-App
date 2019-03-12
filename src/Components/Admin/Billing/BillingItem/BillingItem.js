import React, {Component} from 'react';
import '../billing.css';

class BillingItem extends Component {
    render() {
        const {label, addedBy, created } = this.props;
        console.log(this.props);
        return(
                <div className='billing-table-body-rows'>
                    <p>{label}</p>
                    <p>{addedBy}</p>
                    <p>{created}</p>
                </div>
        )
    }
}

export default BillingItem;