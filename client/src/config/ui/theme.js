import {createMuiTheme} from "@material-ui/core/styles";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import React from 'react';
import {COLOR_PRIMARY, COLOR_SECONDARY} from "../project";

let theme = createMuiTheme({
  palette: {
    type: 'dark',
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
      },
      root: {
        maxWidth: '300px !important'
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        '&.Mui-checked': {
          color: COLOR_PRIMARY
        }
      }
    },
    MuiTab: {
      root: {
        position: 'relative',
        display: 'flex',
        borderRadius: '30px',
        textAlign: 'center',
        transition: 'all .5s',
        padding: '10px 20px',
        color: '#555555',
        height: 'auto',
        opacity: '1',
        margin: '10px 0',
        float: 'none',
        '& + button': {
          margin: '10px 0',
        },
        '&$selected': {
          '&, &:hover': {
            color: '#000',
            backgroundColor: COLOR_PRIMARY,
            boxShadow: '0 7px 10px -5px rgba(76, 175, 80, 0.4)',
          },
        },
      },
      selected: {},
      wrapper: {
        lineHeight: '24px',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: '500',
        position: 'relative',
        display: 'block',
        color: 'inherit',
      },
    },
    MuiTabs: {
      indicator: {
        display: "none",
        backgroundColor: "white"
      },
    }
  },
  shape: {
    borderRadius: 8
  }
});
theme = responsiveFontSizes(theme);
export default theme;
