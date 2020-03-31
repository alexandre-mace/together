import React from 'react';
import Layout from "../components/Layout";
import DiscoverEvents from "../components/event/organisms/DiscoverEvents";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DiscoverOrganizers from "../components/event/organisms/DiscoverOrganizers";

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

const DiscoverPage = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Layout {...props}>
        <div className="container mt-3 mt-md-5">
          <div className="row">
            <div className="col mb-3">
              <Tabs centered value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Missions" {...a11yProps(0)} />
                <Tab label="Associations" {...a11yProps(1)} />
              </Tabs>
            </div>
          </div>
        </div>

      <TabPanel value={value} index={0}>
        <DiscoverEvents {...props}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DiscoverOrganizers {...props}/>
      </TabPanel>
    </Layout>
  )
};

export default DiscoverPage;
