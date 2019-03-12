import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import '../../accountDetails.css';

export default class Users extends Component {

    render() {
        const {id, email, name, role, created} = this.props;
        console.log(this.props);
        return (
            <tbody className='users-table-body'>
                <tr>
                    <td>{email}</td>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>{created}</td>
                </tr>
            </tbody>
        )
    }
}