import React, {useState} from 'react'
import {Map, TileLayer, ZoomControl} from 'react-leaflet'
import LeafletMarker from "./LeafletMarker";
import CloseIcon from '@material-ui/icons/Close';
import { Animate }  from 'react-simple-animate';
import IconButton from "@material-ui/core/IconButton";

// defaults
let zoom = 13;

const LeafletMap = (props) => {
  const [playAnimation, setPlayAnimation] = useState(true);

  window.dispatchEvent(new Event('resize'));

  const handleCloseMapView = () => {
    setPlayAnimation(false);
    setTimeout(() => {
      props.handleCloseMapView()
    }, 900)
  }

  return (
    <div className="full-screen-map">
    <Animate
      play={playAnimation} // set play true to start the animation
      duration={0.9} // how long is the animation duration
      start={{ transform: 'translateX(100vw)' }}
      end={{ transform: 'translateX(0)' }}
      easeType="cubic-bezier(0.23, 1, 0.32, 1)"
    >
    <Map center={props.center} zoom={zoom} zoomControl={false}>
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        attribution='map data © [[http://osm.org/copyright|OpenStreetMap contributors]] under ODbL  - tiles OpenRiverboatMap'
      />
      <ZoomControl position="bottomright"/>
      {/*{props.events.map((event, index) => {*/}
      {/*  if (props.eventSelected && props.eventSelected.name === event.name) {*/}
      {/*    return (*/}
      {/*      <LeafletAnimatedMarker key={index} position={props.center}/>*/}
      {/*    )*/}
      {/*  } else {*/}
      {/*    return (*/}
      {/*      <LeafletMarker key={index} event={event}/>*/}
      {/*    )*/}
      {/*  }*/}
      {/*}*/}
      {/*)}*/}
      {props.event &&
        <LeafletMarker event={props.event}/>
      }
    </Map>
      <div className={"map-close"}>
        <IconButton
          className={'color-black'}
          onClick={() => handleCloseMapView()}
        >
          <CloseIcon fontSize={"large"}/>
        </IconButton>

    </div>
    </Animate>
  </div>
  )
}

export default LeafletMap;
