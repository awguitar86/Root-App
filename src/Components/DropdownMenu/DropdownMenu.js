import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dropdownMenu.css';

export default class DropdownMenu extends Component {
    constructor(){
        super()
        this.state = {
            open: false
        }
    }

    handleHover(){
        this.setState({
            open: !this.state.open
        });
    }

    render () {
        return (
            <div
                onMouseEnter={this.handleHover.bind(this)}
                onMouseLeave={this.handleHover.bind(this)}
                className='dropdown-menu-body'
                key="dropdownMenu">

                <div className={this.props.className}>
                    {this.props.text}
                </div>
                {this.state.open &&
                <div className="dropdown-menu">{
                    this.props.options.map(option => (
                    <div className="dropdown-menu-text-box" key={option.key}>
                        <Link to={option.to} className="dropdown-menu-text">{option.text}</Link>
                    </div>
                    ))}
                </div>}
            </div>
        )
    }
}