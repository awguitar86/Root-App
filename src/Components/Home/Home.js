import React, { Component } from 'react';
import './home.css';
import { updateEntity, updateUser, updateMerchant, updatePlatform } from '../../Redux/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }


    render(){
        if(!this.state.redirect){
            return <Redirect to='/login'/>;
        }
        return(
            <div className='home-body'>
                <h1>...Loading</h1>
            </div>
        )
    }


}

function mapStateToProps(state){
    return state;
  }

  export default connect(mapStateToProps, {updateEntity, updateMerchant, updatePlatform, updateUser}) (Home);
