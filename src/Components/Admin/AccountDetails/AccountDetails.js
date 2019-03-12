import React, {Component} from 'react';
import './accountDetails.css';
import { Link } from 'react-router-dom';
import UsersItem from './Users/UsersItem/UsersItem';
import { findUsers } from '../../../services/merchant.service';
import { findPlatformUsers } from '../../../services/platform.service';
import { findMerchantKey, findPlatformKey } from '../../../services/api.service';
import { updateMerchant, updateUser, updatePlatform, updateEntity } from '../../../Redux/actions';
import { connect } from 'react-redux';
import AccountNameIcon from '../../../images/UserIcon-01.png';
// import AccountIdIcon from '../../../images/AccountIdIcon-01.png';
import AccountTypeIcon from '../../../images/AccountTypeIcon-01.png';
import DateIcon from '../../../images/DateCalenderIcon-01.png';
import MenuHeader from '../../MenuHeader/MenuHeader';

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            users: [{
                id: 1234,
                user_email: "johnsmith@gmail.com",
                name: "John Smith",
                status: "active",
                role_names: "admin",
                create_date: "February 5, 2015"
            }],
            getAPIKey: false,
            apiKey: [],
            info: []
        }
        this.handleAPIKey = this.handleAPIKey.bind(this);
    }

    // componentDidMount() {
    //     let merchId = this.props.merchantInfo.id;
    //     let platId = this.props.platformInfo.id;
    //     let entity = this.props.entityInfo.entity;
    //     if(entity.includes('ROUTE_PLATFORM')){
    //         findPlatformUsers(platId)
    //             .then( res => {
    //                 if (res.status !== 200){
    //                     console.log(res);
    //                 }
    //                 else{
    //                     this.setState({ users: res.data });
    //                     console.log(res.data);
    //                 }
    //             })
    //         this.setState({info: this.props.platformInfo});
    //     }
    //     else {
    //         findUsers(merchId)
    //         .then( res => {
    //             if (res.status !== 200){
    //                 console.log(res);
    //             }
    //             else{
    //                 this.setState({ users: res.data });
    //                 console.log(res.data);
    //             }
    //         })
    //         this.setState({info: this.props.merchantInfo});
    //     }
    // }

    handleAPIKey(){
        let entity = this.props.entityInfo.entity;
        if(entity.includes('ROUTE_PLATFORM')) {
            let platId = this.props.platformInfo.id;
            findPlatformKey(platId)
                .then(res => {
                    console.log(res.data['t']);
                    this.setState({ apiKey: res.data['t'], getAPIKey: true });
                })
        }
        else {
            let merchId = this.props.merchantInfo.id;
            findMerchantKey(merchId)
                .then( res => {
                    console.log(res.data);
                    this.setState({ apiKey: res.data['t'], getAPIKey: true });
                })
        }
        this.timer = setInterval( this.changeShowAPIKey.bind(this), 10000 );
        console.log(this.state);
    }

    showAPIKey() {
        this.setState({getAPIKey: true});
    }

    changeShowAPIKey(){
        this.setState({getAPIKey: false});
        clearInterval(this.timer);
    }

    render() {
        const users = this.state.users;
        console.log(users);
        console.log(this.state);
        const displayUsers = users.map( singleUser => {
            const index = users.indexOf(singleUser);
            return ( <UsersItem
                    key={`userItem${index}`}
                    index={index}
                    id={singleUser.id}
                    email={singleUser.user_email ? singleUser.user_email : null}
                    name={singleUser.name ? singleUser.name : null}
                    status={singleUser.status ? singleUser.status : null}
                    role={singleUser.role_names ? singleUser.role_names : null}
                    created={singleUser.create_date ? singleUser.create_date : null}
            />)
        })
        let info = this.state.info;
        console.log(info);
        return (
            <div className='account-wrap'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <div className='account-header'>
                    <h2>Account Details</h2>
                    <div className='api-key'>
                        <button className={!this.state.getAPIKey ? 'get-api-key' : 'get-api-key-true'} onClick={this.handleAPIKey}>Get API Key</button>
                        <div className={!this.state.getAPIKey ? 'show-api-key-false' : 'show-api-key'}>
                            <p>{this.state.apiKey}</p>
                        </div>
                    </div>
                </div>
                <div className='account-content'>
                    <div className="account-body">
                        <div className="account-name-wrap">
                            <img src={AccountNameIcon} alt="account name icon"/>
                            <div className="account-info-text">
                                <h4>Account Name:</h4>
                                {/* <p>{ info.name ? info.name : null}</p> */}
                                <p>John Smith</p>
                            </div>
                        </div>
                        <div className="account-type-wrap">
                            <img src={AccountTypeIcon} alt="account type icon"/>
                            <div className="account-info-text">
                                <h4>Account Type:</h4>
                                {/* <p>{ info.account_type ? info.account_type :  null}</p> */}
                                <p>Merchant</p>
                            </div>
                        </div>
                        {/* <div className="account-id-wrap">
                            <img src={AccountIdIcon} alt="account id icon"/>
                            <div className="account-info-text">
                                <h4>Account ID:</h4>
                                <p>{ info.id ? info.id : null}</p>
                            </div>
                        </div> */}
                        <div className="account-created-wrap">
                            <img src={DateIcon} alt="date icon"/>
                            <div className="account-info-text">
                                <h4>Created:</h4>
                                {/* <p>{ info.create_date ? info.create_date : null}</p> */}
                                <p>February 5, 2015</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='users-header'>
                    <h2>Users</h2>
                </div>
                <div className='users'>
                    <div className='users-table'>
                        <table>
                            <thead className='users-table-head'>
                            <tr>
                                <th><a href=""> Email </a></th>
                                <th><a href=""> Name </a></th>
                                <th><a href=""> Role(s) </a></th>
                                <th><a href=""> Created </a></th>
                            </tr>
                            </thead>
                            {displayUsers}
                        </table>
                    </div>
                    <div className='add-new-user-button'>
                        <Link to='/adduser'><button>Add New User</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updateEntity, updateUser}) (AccountDetails);