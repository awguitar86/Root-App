import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './editUser.css';
import MenuHeader from '../../../../MenuHeader/MenuHeader';
import { updateMerchant, updatePlatform, updateUser, updateEntity } from '../../../../../Redux/actions';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../../../../services/user.services';
import { updatePlatformUser } from '../../../../../services/platform.service';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            phone: '',
            username: '',
            save: true,
            saving: false,
            saved: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let entity = this.props.entityInfo.entity;
        if(entity.includes('ROUTE_PLATFORM')){
            this.setState({role: 'ROUTE_PLATFORM'});
        }
        else {
            this.setState({role: 'ROUTE_MERCHANT'});
        }
    }

    handleInputChange(e){
        const key = e.target.name;
        let newState = this.state[key];
        newState = e.target.value;
        this.setState({ [key]: newState });
    }

    handleSubmit(){
        let merchId = this.props.merchantInfo.id;
        let platId = this.props.platformInfo.id;
        let entity = this.props.entityInfo.entity;
        let { email, first_name, last_name, phone, role, username } = this.state;
        let reqBody = { email, first_name, last_name, phone, role, username };
        if(entity.includes('ROUTE_PLATFORM')){
            updatePlatformUser(platId, reqBody)
            .then( res => {
                if( res.status !== 200 ) {
                    console.log(res);
                }
            })
            .catch( err => {throw err});
        }
        else {
            updateUserInfo(merchId, reqBody)
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
            <div className='edit-user-wrap'>
                <MenuHeader handleLogout={this.props.handleLogout}/>
                <div className='edit-user-header'>
                    <div className='edit-user-header-left'>
                        <h2>Edit User</h2>
                        <div className='edit-user-header-note'>
                            <h3>*</h3>
                            <p><strong>NOTE: </strong>Changing your own user account may require you to re-login after saving changes.</p>
                            <h3>*</h3>
                        </div>
                    </div>
                    <Link to='/accountdetails'><button>Back</button></Link>
                </div>
                <div className='edit-user'>
                    <div className='edit-user-name'>
                        <div>
                            <h4>First Name</h4>
                            <input className='firstName'  value={this.state.firstName} type="text" name="firstName" onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                        <div>
                            <h4>Last Name</h4>
                            <input className='lastName' value={this.state.lastName} type="text" name="lastName" onChange={ e => {this.handleInputChange(e) }}/>
                        </div>
                    </div>
                    <div className='edit-user-email'>
                        <div>
                            <h4>Email</h4>
                            <input className='email' value={this.state.email} type="text"  name="email" onChange={ e => {this.handleInputChange(e) }} />
                        </div>
                        <div>
                            <h4>Username</h4>
                            <input className='username' value={this.state.username} type="text"  name="username" onChange={ e => {this.handleInputChange(e) }} />
                        </div>
                    </div>
                    <div className='edit-user-role'>
                        <div>
                            <h4>Phone</h4>
                            <input className='phone' value={this.state.phone} type="text"  name="phone" onChange={ e => {this.handleInputChange(e) }} />
                        </div>
                        <div>
                            <h4>User Role</h4>
                            <input className={entity.includes('ROUTE_PLATFORM') ? 'platform-role' : 'platform-role-false'} value="ROUTE_PLATFORM"  disabled type="text"  name="role" />
                            <input className={entity.includes('ROUTE_MERCHANT') ? 'merchant-role' : 'merchant-role-false'} value='ROUTE_MERCHANT' disabled type="text"  name="role" />
                        </div>
                    </div>
                    <div className='edit-user-save-button'>
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

export default connect(mapStateToProps, {updateMerchant, updatePlatform, updateUser, updateEntity}) (EditUser);