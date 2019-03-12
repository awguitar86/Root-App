import React, {Component} from 'react';
import './dashContent.css';
import RevenueProtected from '../../RevenueProtected/RevenueProtected';
// import ShippingStats from '../../ShippingStats/ShippingStats';
// import PackagesInTransit from '../../PackagesInTransit/PackagesInTransit';
import { findMerchant } from '../../../services/merchant.service';
// import { findPlatformMerchants, findPlatformGraph } from '../../../services/platform.service';
import { updateMerchant, updateEntity, updatePlatform, updateUser } from '../../../Redux/actions';
import { connect } from 'react-redux';
// import Select from 'react-select';
// import { findGraphData } from '../../../services/merchant.service';

class DashContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedOption: '',
            merchants: [],
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // componentDidMount(){
    //     let merchId = this.props.merchantInfo.id;
    //     let platId = this.props.platformInfo.id;
    //     let entity = this.props.entityInfo.entity;
    //     if(entity === 'platform'){
    //         findPlatformMerchants(platId)
    //         .then( res => {
    //             console.log(res.data);
    //             this.setState({merchants: res.data});
    //         });
    //     }
    //     else {
    //         this.setState({merchants: []});
    //     }
    // }

    handleSelectChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        let merchantId = selectedOption.value;
        findMerchant(merchantId)
            .then(res => {
                let newMerchantInfo = res.data;
                console.log(res.data);
                this.props.updateMerchant(newMerchantInfo);
                this.props.updateEntity({entity: 'merchant'})
            })
      }

    render() {
        // console.log(this.state.selectedOption['label']);
        // const { merchants, selectedOption } = this.state;
        // const listMerchants = merchants.map(merchant => {
        //     return {
        //         value: merchant.id,
        //         label: merchant.name
        //     }
        // });
        // let entity = this.props.entityInfo.entity;
        // let entity = 'platform';
        // const customStyles = {
        //     input: () => ({
        //         color: 'white'
        //     }),
        //     control: () => ({
        //         display: entity === 'platform' ? 'flex' : 'none',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         width: '250px',
        //         color: 'white'
        //     })
        // }

        return (
            <div className='dashboard-content'>
                <div className='dashboard-content-header'>
                    <h2>Dashboard</h2>
                    {/* <Select
                        value={selectedOption}
                        onChange={this.handleSelectChange}
                        options={listMerchants}
                        placeholder = 'Search Merchants...'
                        styles={customStyles}
                    />
                    <button className={entity === 'merchant' ? 'merchant-select-back-button': 'merchant-select-back-button-false'}>Back</button> */}
                </div>
                <RevenueProtected />
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updateEntity, updatePlatform, updateUser}) (DashContent);