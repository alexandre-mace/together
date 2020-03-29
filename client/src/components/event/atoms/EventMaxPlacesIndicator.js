import MobileStepper from "@material-ui/core/MobileStepper";
import React from "react";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    padding: "0",
    flexGrow: 1,
    backgroundColor: "transparent"
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

const EventMaxPlacesIndicator = ({ maxPlaces, current }) => {
  const classes = useStyles();

  return (
    <>
        <div className="col">
          <MobileStepper
            variant="progress"
            steps={maxPlaces + 1}
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
        <div className={"col-auto pl-0 max-places-indicator"}>
            <span>
              {current} / {maxPlaces}
            </span>
        </div>
      </>
  )
}
export default EventMaxPlacesIndicator;
