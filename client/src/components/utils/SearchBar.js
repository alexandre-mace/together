import AlgoliaPlaces from "algolia-places-react";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TuneIcon from '@material-ui/icons/Tune';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../../config/project";

let theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: COLOR_PRIMARY
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.15)"
    },
  },
  overrides: {
    MuiLink: {
      root: {
        fontWeight: "bold",
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white',
        color: "black"
      }
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "black"
      }
    },
    MuiIconButton: {
      colorSecondary: {
        color: "#e1e1e1"
      },
    },
    MuiButton: {
      textSecondary: {
        color: "black"
      },
      containedSecondary: {
        color: "#e6e6e6"
      },
      containedPrimary: {
        color: COLOR_SECONDARY,
        backgroundColor: COLOR_PRIMARY
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        '&.Mui-checked': {
          color: COLOR_PRIMARY
        }
      }
    },
  },
  shape: {
    borderRadius: 10
  }
})

const useStyles = makeStyles(theme => ({
  typography: {

  },
}));

const SearchBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    if (anchorEl !== null) {
      return handleClose()
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <ThemeProvider theme={theme}>

    <div className="container mt-2 mt-md-5">
      <div className="row">
        <div className="col-10 pr-0 col-md-7 offset-md-2">
          <AlgoliaPlaces
            placeholder="Je recherche des événements à "
            options={{
              appId: 'plXZW2RVWB96',
              apiKey: '8432eadb718c9d4714a8beb933d71483',
              language: 'fr',
              countries: ['fr'],
              type: 'address',
              useDeviceLocation: true
            }}

            onChange={({query, rawAnswer, suggestion, suggestionIndex}) => {
              props.handleUserPositionSelected(suggestion.latlng, suggestion.name + ', ' + suggestion.postcode + ' ' + suggestion.city)
            }}
            onSuggestions={({rawAnswer, query, suggestions}) => {}}
            onCursorChanged={({rawAnswer, query, suggestion, suggestonIndex}) => {}}
            onClear={() => {}}
            onLimit={({message}) => {}}
            onError={({message}) => {}}
          />
        </div>
        <div className="col-2 col-md-1 pl-0">
            <Button aria-describedby={id} className={"h-100 search-settings-button"} variant="contained" color="primary" onClick={handleClick}>
              <TuneIcon/>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              className={"mt-3"}
              anchorReference="anchorEl"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className={"search-settings-container p-3"}>
                <FormControl>
                  <InputLabel id="radius-select-label">Rayon</InputLabel>
                  <Select
                    labelId="radius-select-label"
                    id="radius-select"
                    value={props.radius}
                    onChange={(param) => {
                      handleClose();
                      props.handleChangeRadius(param)
                    }}
                  >
                    <MenuItem value={2000}>2km</MenuItem>
                    <MenuItem value={5000}>5km</MenuItem>
                    <MenuItem value={10000}>10km</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Popover>
          </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default SearchBar;
