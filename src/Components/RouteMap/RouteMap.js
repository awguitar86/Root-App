import React, { Component } from 'react';
import './routeMap.css';
// import { GoogleApiWrapper, Map, Marker, InfoWindow, HeatMap, Polygon, Polyline } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
import {mapStyles, deliveredGradient, OFDgradient, inTransitGradient, ExceptionGradient} from './MapStyles';
import { deliveredPoints, OFDpoints, inTransitPoints, ExceptionPoints } from './MapPoints';

class RouteMap extends Component {
    constructor(props){
      super(props);
      this.state = {
          deliveredPoints: '',
          outForDeliveryPoints: '',
          inTransitPoints: '',
          ExceptionPoints: ''
      }
    }



    render(){
        return(
            <div className="map-example-body">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyC04NXRSAmVV51ZwvniCbn5N1fyOSTgxoc', libraries: 'visualization' }}
                  defaultCenter={{ lat: 40.854885, lng: -88.081807 }}
                  defaultZoom={4}
                  options={{ styles: mapStyles, minZoom: 3, maxZoom: 18 }}
                  // heatmapLibrary={true}
                  // heatmap={{data}}
                  yesIWantToUseGoogleMapApiInternals={true}
                  onGoogleApiLoaded={({map, maps}) => {
                    // console.log(points[0]);
                    const deliveredHeatmap = new maps.visualization.HeatmapLayer({
                      data: deliveredPoints.map(point => (
                        {location: new maps.LatLng(point['location'][1], point['location'][0]),
                        weight: point['weight']})),
                      gradient: deliveredGradient,
                      maxIntensity: 10,
                      radius: 20
                    });
                    const OFDheatmap = new maps.visualization.HeatmapLayer({
                      data: OFDpoints.map(point => (
                        {location: new maps.LatLng(point['location'][1], point['location'][0]),
                        weight: point['weight']})),
                      gradient: deliveredGradient,
                      maxIntensity: 10,
                      radius: 20
                    });
                    const inTransitHeatmap = new maps.visualization.HeatmapLayer({
                      data: inTransitPoints.map(point => (
                        {location: new maps.LatLng(point['location'][1], point['location'][0]),
                        weight: point['weight']})),
                      gradient: deliveredGradient,
                      maxIntensity: 10,
                      radius: 20
                    });
                    const ExceptionHeatmap = new maps.visualization.HeatmapLayer({
                      data: ExceptionPoints.map(point => (
                        {location: new maps.LatLng(point['location'][1], point['location'][0]),
                        weight: point['weight']})),
                      gradient: deliveredGradient,
                      maxIntensity: 10,
                      radius: 20
                    });
                    deliveredHeatmap.setMap(map);
                    OFDheatmap.setMap(map);
                    inTransitHeatmap.setMap(map);
                    ExceptionHeatmap.setMap(map);
                  }}
                >

                </GoogleMapReact>
            </div>
          )
    }
}

export default RouteMap;