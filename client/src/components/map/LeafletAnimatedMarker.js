import React, { Component } from 'react'
import { Marker } from 'react-leaflet'
import L from 'leaflet';

export default class LeafletAnimatedMarker extends Component {
  constructor(props){
    super(props);
    this.state = {
      marker: [],
      bounce: false
    }
  }
  render() {
    window.dispatchEvent(new Event('resize'));

    let renderedMarker = new L.Icon({
      iconUrl: require('../../assets/img/marker-icon.png'),
      iconRetinaUrl: require('../../assets/img/marker-icon.png'),
      iconAnchor: [12,41],
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: new L.Point(25, 41),
      className: ''
    });
    if (!this.state.bounce === true) {
      renderedMarker = new L.Icon({
        iconUrl: require('../../assets/img/marker-icon.png'),
        iconRetinaUrl: require('../../assets/img/marker-icon.png'),
        iconAnchor: [12,41],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(25, 41),
        className: 'bounce-infinite'
      });
    }
    return (<Marker onClick={this.handleClick} icon={renderedMarker} position={this.props.position}>
      </Marker>
    )
  }
}
