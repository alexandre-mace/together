import MobileStepper from "@material-ui/core/MobileStepper";
import React from "react";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    padding: "0",
    flexGrow: 1,
    backgroundColor: "#fff"
  },
  progress: {
    height: "10px",
    width: '100%',
    color: "#38d39f",
    borderRadius: '8px'
  },
  bar: {
    borderRadius: '8px'
  }
});

const EventMaxPlacesIndicator = ({ maxPlaces, current}) => {
  const classes = useStyles();

  return (
    <div id="step-indicator">
      <div className="row my-3 px-3">
        <div className="col">
          <MobileStepper
            variant="progress"
            steps={maxPlaces}
            position="static"
            activeStep={current}
            LinearProgressProps={{
              classes: {
                bar: classes.bar,
              }
            }}
            classes={{
              root: classes.root,
              progress: classes.progress,
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default EventMaxPlacesIndicator;
