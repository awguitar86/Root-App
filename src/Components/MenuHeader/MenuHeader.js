import React, {Component} from 'react';
import './menuHeader.css';
import {Link} from 'react-router-dom';
import RouteLogo from '../../images/RouteLogoKionaRowWhite.svg';
import DashIcon from '../../images/DashboardIcon.svg';
import ReportsIcon from '../../images/ReportsIcon.svg';
import AdminIcon from '../../images/AdminIcon.svg';
import LogoutIcon from '../../images/LockIcon.svg';
import DownArrow from '../../images/DownArrow.svg';
import UpArrow from '../../images/UpArrow.svg';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

export default class MenuHeader extends Component {
    render() {
        return (
            <div className='menu-body'>
                <div className="menu-wrap">
                    {/* <div className='menu-logo'><Link to='/dashboard'><img src={RouteLogo} alt='Route logo'/></Link></div> */}
                    <div></div>
                    <div className='menu-nav'>
                        <Link to='/dashboard'>
                            <div className='menu-item'>
                                <div className='menu-item-icon'><img src={DashIcon} alt='dashboard icon'/></div>
                                <div className='menu-item-text'><p>Dashboard</p></div>
                            </div>
                        </Link>
                        <div className='menu-item'>
                            <div className='menu-item-icon'><img src={ReportsIcon} alt='reports icon'/></div>
                            <DropdownMenu className='reports' text='Reports' key="reportsMenu" options={[
                                {text: 'Transaction Report', to: '/transactions', key: "transactionReport"}
                            ]}/>
                            <div className='menu-arrows'>
                                <img src={DownArrow} alt='down arrow' className='down-arrow'/>
                                <img src={UpArrow} alt='up arrow' className='up-arrow'/>
                            </div>
                        </div>
                        <div className='menu-item'>
                            <div className='menu-item-icon'><img src={AdminIcon} alt='admin icon'/></div>
                            <DropdownMenu className='admin' text='Admin' key="adminMenu" options={[
                                {text: 'Account Details', to: '/accountdetails', key:"accountDetails"},
                                {text: 'Billing', to: '/billing', key:"billing"}
                            ]}/>
                            <div className='menu-arrows'>
                                <img src={DownArrow} alt='down arrow' className='down-arrow'/>
                                <img src={UpArrow} alt='up arrow' className='up-arrow'/>
                            </div>
                        </div>
                        <a onClick={this.props.handleLogout}>
                            <div className='menu-logout'>
                                <img src={LogoutIcon} alt='logout icon'/>
                                <p>Logout</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}