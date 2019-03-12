import React, {Component} from 'react';
import './animateButton.css';

class AnimatedButton extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className='animate-button-wrap'>
                <svg>
                    <circle cx={50} cy={75} r={50} />
                </svg>
            </div>
        )
    }
}

export default AnimatedButton;