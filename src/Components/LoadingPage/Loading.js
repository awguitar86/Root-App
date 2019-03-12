import React, {Component} from 'react';
import './loading.css';
import { Redirect } from 'react-router-dom';
import RouteLogo from '../../images/RouteLogoIcon.png';
// import { findMerchant } from '../../services/merchant.service';
// import { findUser } from '../../services/user.services';
// import { findPlatform } from '../../services/platform.service';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../Redux/actions';
import { connect } from 'react-redux';
import { findMerchantSignature } from '../../services/merchant.service';
import { findPlatformSignature } from '../../services/platform.service';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            signature: false,
        }
    }

    componentDidMount(){
        let entity = this.props.entityInfo.entity;
        let platId = this.props.platformInfo.id;
        let merchId = this.props.merchantInfo.id;
        switch( entity ){
            case "ROUTE_MERCHANT":
                console.log('merchant');
                console.log(merchId);
                findMerchantSignature(merchId)
                    .then( res => {
                        console.log(res.data);
                        if(res.data['terms_signed']){
                            this.setState({ signature: true });
                            this.timer = setInterval( this.changeRedirectState.bind(this), 3000 );
                        }
                        else {
                            this.setState({ signature: false });
                            this.timer = setInterval( this.changeRedirectState.bind(this), 3000 );
                        }
                    })
                    .catch( err => {throw err} );
                break;

            case "ROUTE_PLATFORM":
                console.log('platform');
                console.log(platId);
                findPlatformSignature(platId)
                    .then( res => {
                        if(res.data['terms_signed']){
                            this.setState({ signature: true });
                            this.timer = setInterval( this.changeRedirectState.bind(this), 3000 );
                        }
                        else {
                            this.setState({ signature: false });
                            this.timer = setInterval( this.changeRedirectState.bind(this), 3000 );
                        }
                    })
                    .catch( err => {throw err} );
                break;

            default:
            console.log('default');
            this.setState({ signature: false });
            this.timer = setInterval( this.changeRedirectState.bind(this), 3000 );
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    changeRedirectState(){
        this.setState({ redirect: true });
    }

    render(){
        console.log(this.state);
        if(this.state.redirect){
            if(this.state.signature){
                    return <Redirect to='/dashboard'/>;
            }
            else{
                return <Redirect to='/terms'/>;
            }
        }
        return(
            <div className='loading-wrap'>
                <i className="loading">
                    <img src={RouteLogo} alt='route logo'/>
                </i>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (Loading);