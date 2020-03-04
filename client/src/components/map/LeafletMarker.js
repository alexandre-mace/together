import React, { Component } from 'react'
import { Marker } from 'react-leaflet'
import L from 'leaflet';

export default class LeafletMarker extends Component {
  constructor(props){
    super(props);
    this.state = {
      marker: [],
      bounce: false
    }
  }

  handleClick = event => {
    if (this.state.bounce === true) {
      this.setState({bounce: false});
      const foodstuff = document.getElementsByClassName('foodstuff-' + this.props.marker[0]);
      foodstuff[0].classList.remove('selected');
    } else {
      this.setState({bounce: true});
      Array.from(document.getElementsByClassName('foodstuff-list-item')).forEach(function(element) {
        if (element.parentNode.className.includes('selected')) {
          element.parentNode.classList.remove('selected');
          const foodstuffId = /[^-]*$/.exec(element.parentNode.className.replace(/ .*/,''))[0];
          let marker = document.getElementsByClassName('marker-' + foodstuffId)[0];
          if (marker.className.includes('bounce-infinite')) {
            marker.classList.remove('bounce-infinite');
          } else if (marker.className.includes('bounce')){
            marker.classList.remove('bounce');
          }
        }
      });
      const foodstuff = document.getElementsByClassName('foodstuff-' + this.props.marker[0]);
      foodstuff[0].classList.add('selected');
    }
  };

  render() {
    let renderedMarker = new L.Icon({
      iconUrl: require('../../assets/img/marker-icon.png'),
      iconRetinaUrl: require('../../assets/img/marker-icon.png'),
      iconAnchor: [20,55],
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: new L.Point(25, 41),
      className: ''
    });
    if (this.state.bounce === true) {
      renderedMarker = new L.Icon({
        iconUrl: require('../../assets/img/marker-icon.png'),
        iconRetinaUrl: require('../../assets/img/marker-icon.png'),
        iconAnchor: [20, 55],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(25, 41),
        className: 'bounce'
      });
    }
    return (<Marker onClick={this.handleClick} position={[this.props.event.latitude, this.props.event.longitude]}>
      </Marker>
    )
  }
}
