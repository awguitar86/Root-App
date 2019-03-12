import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './addUser.css';
import MenuHeader from '../../../../MenuHeader/MenuHeader';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../../../../Redux/actions';
import { connect } from 'react-redux';
import { createMerchantUser } from '../../../../../services/user.services';
import { createPlatformUser } from '../../../../../services/platform.service';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            username: '',
            role: '',
            save: true,
            saving: false,
            saved: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount(){
    //     let entity = this.props.entityInfo.entity;
    //     if(entity.includes('ROUTE_PLATFORM')){
    //         this.setState({role: 'ROUTE_PLATFORM'});
    //     }
    //     else {
    //         this.setState({role: 'ROUTE_MERCHANT'});
    //     }
    // }

    handleInputChange(e){
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState });
    }

    handleSubmit(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let { email, first_name, last_name, phone, role, username } = this.state;
        let reqBody = { email, first_name, last_name, phone, role, username };
        let entity = this.props.entityInfo.entity;
        if(entity.includes('ROUTE_PLATFORM')){
            createPlatformUser(platId, reqBody)
            .then( res => {
                if( res.status !== 200 ) {
                    console.log(res);
                }
            })
            .catch( err => {throw err});
        }
        else {
            createMerchantUser(merchId, reqBody)
            .then( res => {
                if( res.status !== 200 ) {
                    console.log(res);
                }
            })
            .catch( err => {throw err});
        }
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            username: '',
            role: '',
            save: false,
            saving: true
        });
        this.timer = setInterval( this.handleSaved.bind(this), 1200 );
    }

    handleSaved() {
        this.setState({saving: false, saved: true});
        clearInterval(this.timer);
    }

    render() {
        console.log(this.state);
        let entity = this.props.entityInfo.entity;
        return (
            <div className='add-user-wrap'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <div className='add-user-header'>
                    <h2>Add User</h2>
                    <Link to='/accountdetails'><button>Back</button></Link>
                </div>
                <div className='add-user'>
                    <div className='add-user-name'>
                        <div>
                            <h4>First Name</h4>
                            <input className='firstName'  value={this.state.first_name}type="text" name="first_name" onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                        <div>
                            <h4>Last Name</h4>
                            <input className='lastName' value={this.state.last_name}type="text" name="last_name" onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                    </div>
                    <div className='add-user-email'>
                        <div>
                            <h4>Email</h4>
                            <input className='email' value={this.state.email}type="text"  name="email" onChange={ e => {this.handleInputChange(e) }} />
                        </div>
                        <div>
                            <h4>Username</h4>
                            <input className='username'  value={this.state.username}type="text" name="username" onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                    </div>
                    <div className='add-user-role'>
                        <div>
                            <h4>Phone</h4>
                            <input className='phone'  value={this.state.phone}type="text" name="phone" onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                        <div>
                            <h4>User Role</h4>
                            {/* <input className={entity.includes('ROUTE_PLATFORM') ? 'platform-role' : 'platform-role-false'} value="ROUTE_PLATFORM"  disabled type="text"  name="role" />
                            <input className={entity.includes('ROUTE_MERCHANT') ? 'merchant-role' : 'merchant-role-false'} value='ROUTE_MERCHANT' disabled type="text"  name="role" /> */}
                            <input className='merchant-role' value='ROUTE_MERCHANT' disabled type="text"  name="role" />
                        </div>
                    </div>
                    <div className='add-user-save-button'>
                        <button className={this.state.save ? 'save' : 'save-false'} onClick={this.handleSubmit}>Save</button>
                        <button className={!this.state.saving ? 'saving' : 'saving-true'}>Saving...</button>
                        <button className={!this.state.saved ? 'saved' : 'saved-true'}>&#x2713;</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (AddUser);