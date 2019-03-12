import React, {Component} from 'react';
import './packagesInTransit.css';
// import USMap from '../../images/US-Sillhouette.svg';
// import WorldMap from '../../images/WorldMap.svg';
import RouteMap from '../RouteMap/RouteMap';


export default class PackagesInTransit extends Component {
    render() {
        return (
            <div className='packages-in-transit'>
                    <div className='packages-header'>
                        <h3>Packages In Transit</h3>
                    </div>
                    <div className='packages-map'>
                        <RouteMap />
                    </div>
            </div>
        )
    }
}

                    // <div className='packages-maps'>
                    //     <div className='packages-us-map'>
                    //         <h3>United States</h3>
                    //         <img src={USMap} alt='US map' className='us-map'/>
                    //     </div>
                    //     <div className='packages-world-map'>
                    //         <h3>World</h3>
                    //         <img src={WorldMap} alt='world map' className='world-map'/>
                    //     </div>
                    // </div>