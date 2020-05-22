import React, {useContext, useEffect, useState} from 'react';
import FullScreenLoader from "../../utils/FullScreenLoader";
import {list, reset} from "../../../actions/user/list";
import {connect} from "react-redux";
import AppContext from "../../../config/context/appContext";
import NoDataSvg from "../../../utils/svg/NoDataSvg";
import {Animate} from "react-simple-animate";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Card, CardContent} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {del} from "../../../actions/user/delete";

const DiscoverOrganizers = props => {
  const [allOrganizers, setAllOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  const appContext = useContext(AppContext);

  useEffect(() => {
    props.list(
      props.match.params.page &&
      decodeURIComponent(props.match.params.page))
  }, []);

  if (props.retrieved) {
    if (props.retrieved['hydra:member'].length !== allOrganizers.length) {
      setAllOrganizers(props.retrieved['hydra:member']);
    }

    if (loading) {
      setTimeout(() => {setLoading(false)}, 800);
    }
  }

  let organizers = allOrganizers.filter(organizer => organizer.status === "association");
  if (search && search !== '') {
    organizers = organizers.filter(organizer => organizer.name.toLowerCase().includes(search));
  }

  return (
    <>
      {(loading || props.loading) &&
      <FullScreenLoader/>
      }
      {(!props.loading && !loading) &&
        <div className="container">
          <div className="row">
            <div className="col justify-content-center">
              <Autocomplete
                id="combo-box-demo"
                options={organizers}
                onInputChange={(event, value) => {
                  setSearch(value)
                }}
                className={"mx-auto"}
                getOptionLabel={(option) => option.name}
                style={{ maxWidth: 300 }}
                renderInput={(params) => <TextField {...params} label="Rechercher" variant="filled" />}
              />
            </div>
          </div>
        </div>
     }
      {(!props.loading && !loading) &&
      <>
        <div className="container mt-3 mt-md-5">
          {organizers && organizers > 0 &&
          <div className="row">
            <div className="col text-center">
              <p>
                <span className="font-weight-bold">
                  {organizers.length}
                </span> {organizers.length === 1 ? 'association trouvée' : 'associations trouvées'}
              </p>
            </div>
          </div>
          }
          <div className="row">
            {organizers.length === 0 &&
            <>
              <div className="col-12 text-center mt-3">
                <NoDataSvg/>
              </div>
              <div className="col-12 text-center mt-3">
                <p>Il n'y a pas encore d'associations enregistrées</p>
              </div>
            </>
            }
          </div>
        </div>
        <div className="container">
          <div className="row mt-3">
            {organizers && organizers.map((organizer, index) => (
              <React.Fragment key={index}>
                <div className={"col-12 col-md-4 mt-3"} key={index}>
                  <Animate
                    play={true} // set play true to start the animation
                    duration={0.6} // how long is the animation duration
                    delay={index * 0.1} // how many delay seconds will apply before the animation start
                    start={{ transform: 'translate(0, 400px)' }}
                    end={{ transform: 'translate(0, 0)' }}
                    easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
                    onComplete={() => {}} // call back function when animation is completed
                  >
                    <Card >
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {organizer.name}
                          </Typography>
                          <Typography className={"textSecondary"}>
                            email: {organizer.contactEmail}
                          </Typography>
                          <Typography className={"textSecondary"}>
                            tel: {organizer.contactPhone}
                          </Typography>
                        </CardContent>
                    </Card>
                    <p></p>
                  </Animate>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
      }
    </>
  )
};


const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.user.list;
  return { retrieved, loading, error, eventSource, deletedItem };
};
const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource)),
  delete: event => dispatch(del(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverOrganizers);
