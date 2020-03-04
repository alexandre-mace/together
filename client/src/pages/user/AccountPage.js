import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import Button from '@material-ui/core/Button';
import {authentication} from "../../utils/auth/authentication";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {Typography} from "@material-ui/core";
import logout from "../../utils/auth/logout";
import {retrieve} from "../../actions/user/show";
import {del} from "../../actions/event/delete";
import {connect} from "react-redux";
import {Loader} from "../../components/utils/Loader";

const AccountPage = props => {
  useEffect(() => {
    props.retrieve(authentication.currentUserValue['@id']);
  }, []);

  const user = props.retrieved;

  return (
    <Layout {...props}>

      {props.loading && (
        <div className={'mt-5'}>
          <Loader/>
        </div>
      )}

      {props.retrieved &&
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <Typography variant="h4" component="h4" gutterBottom className={'text-center'}>
              {authentication.currentUserValue.name}
            </Typography>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
          </div>
          <div className="col-12">
            <Typography variant="body1" gutterBottom>
              Email : {user.contactEmail ? user.contactEmail : "Non défini"}
            </Typography>
          </div>
          <div className="col-12">
            <Typography variant="body1" gutterBottom>
              Tel : {user.contactPhone ? user.contactPhone : "Non défini"}
            </Typography>
          </div>
        </div>
        <div className="container position-absolute-bottom-center">
          <div className="row">
            <div className="col text-center">
              <Button
                variant="contained"
                startIcon={<ExitToAppRoundedIcon />}
                onClick={() => logout(props.history)}
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>
      }
    </Layout>
  )
};

const mapStateToProps = state => ({
  retrieved: state.user.show.retrieved,
  error: state.user.show.error,
  loading: state.user.show.loading,
  eventSource: state.user.show.eventSource,
  deleteError: state.event.del.error,
  deleteLoading: state.event.del.loading,
  deleted: state.event.del.deleted,
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  del: item => dispatch(del(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
