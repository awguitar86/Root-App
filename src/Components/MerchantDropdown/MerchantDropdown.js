import React, {Component} from 'react';
import './merchantDropdown.css';
import Select from 'react-select';

class MerchantDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: [
                {value: 123, label: 'Gear Launch'},
                {value: 371, label: 'Cold Stone'},
                {value: 918, label: "Trader Joe's"},
                {value: 12, label: '511 Tactical'},
                {value: 432, label: 'Apple'},
            ],
            selectedOption: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    render(){
        const { options, selectedOption } = this.state;
        console.log(this.state.selectedOption['value']);
        return(
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                className='merchant-select'
            />
        );
    }
}

export default MerchantDropdown;