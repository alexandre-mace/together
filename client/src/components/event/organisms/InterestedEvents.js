import React, {useContext, useEffect} from "react";
import NoDataSvg from "../../../utils/svg/NoDataSvg";
import {reset, retrieve} from "../../../actions/user/show";
import {connect} from "react-redux";
import {authentication} from "../../../utils/auth/authentication";
import AppContext from "../../../config/context/appContext";
import {Loader} from "../../utils/Loader";
import EventsAgenda from "../molecules/EventsAgenda";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Layout from "../../Layout";
import DiscoverEvents from "./DiscoverEvents";
import DiscoverOrganizers from "./DiscoverOrganizers";
import Badge from "@material-ui/core/Badge";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const InterestedEvents = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    props.retrieve(authentication.currentUserValue['@id']);
  }, []);

  const user = props.retrieved;

  let events = false;
  if (user) {
    events = [...new Set([...user.interestedEvents, ...user.participatedEvents, ...user.pendingParticipatedEvents])]
  }

  const appContext = useContext(AppContext);

  return (
    <>
      {props.loading && (
        <div className={'mt-5'}>
          <Loader/>
        </div>      )}
      {props.error && (
        <div className="alert alert-danger" role="alert">
          <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
          {props.error}
        </div>
      )}

      {(!props.loading && user && events && events.length > 0) &&
        <div className="container mt-3 mt-md-5 pt-3">
          <div className="row">
            <div className="col mb-3">
              <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label={<><Badge variant={"dot"} badgeContent={user.participatedEvents.length} color={'primary'}>Participe</Badge></>} {...a11yProps(0)} />
                <Tab label={<><Badge variant={"dot"} badgeContent={user.pendingParticipatedEvents.length} color={'primary'}>Attente</Badge></>} {...a11yProps(1)} />
                <Tab label={<><Badge variant={"dot"} badgeContent={user.interestedEvents.length} color={'primary'}>Intérêt</Badge></>} {...a11yProps(2)} />
              </Tabs>
            </div>
          </div>
        </div>
      }

      {!props.loading &&
      <>
        <div className="container mt-3">
          {user && events && events.length === 0 &&
          <div className="row">
            <div className="col-12 text-center mt-5">
              <NoDataSvg/>
            </div>
            <div className="col-12 text-center mt-3">
              <p>Vous n'avez pas encore indiqué que vous étiez intéressé ou que vous participez à un mission</p>
            </div>
          </div>
          }
          {events && events.length > 0 &&
          <>
            <div className="row">
              <div className="col text-center">
                <span className="font-weight-bold">
                  {events.length}
                </span> {events.length === 1 ? 'mission dans mon agenda' : 'missions dans mon agenda'}
              </div>
            </div>
            <TabPanel value={value} index={0}>
              <EventsAgenda
                events={user.participatedEvents}
                history={props.history}
                userPosition={appContext.userPosition}
                handleMapView={appContext.handleMapView}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <EventsAgenda
                events={user.pendingParticipatedEvents}
                history={props.history}
                userPosition={appContext.userPosition}
                handleMapView={appContext.handleMapView}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <EventsAgenda
                events={user.interestedEvents}
                history={props.history}
                userPosition={appContext.userPosition}
                handleMapView={appContext.handleMapView}
              />
            </TabPanel>
          </>
          }
        </div>

      </>
      }
    </>
  )
};

const mapStateToProps = state => ({
  retrieved: state.user.show.retrieved,
  error: state.user.show.error,
  loading: state.user.show.loading,
  eventSource: state.user.show.eventSource,
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(InterestedEvents);
