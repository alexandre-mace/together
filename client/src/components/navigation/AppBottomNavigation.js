import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {navigationLinks} from "../../config/navigation/navigationLinks";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {authentication} from "../../utils/auth/authentication";
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import FolderSharedRoundedIcon from '@material-ui/icons/FolderSharedRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import {COLOR_SECONDARY} from "../../config/project";

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100vw',
        zIndex: '10000',
        height: '66px',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px"
    },
    bottomNavAction: {
        color: '#a3a3a3',
        fontWeight: 500,
        '& .Mui-selected, &.Mui-selected .MuiSvgIcon-root': {
            color: COLOR_SECONDARY,
        },
        padding: "3px 10px"
    }
});

// const renderBottomNavigationActionWithBadge = (props) => {
//     return (
//         <Badge
//                color="primary"
//                badgeContent={"zer"}>
//         </Badge>
//     )
// };

const bottomNavigationIcons = {
    'list':  ListIcon,
    'related': BookmarksRoundedIcon,
    'add': AddIcon,
    'account': AccountCircleIcon,
    'folder' : FolderSharedRoundedIcon,
    'agenda' : EventRoundedIcon
};

const AppBottomNavigation = (props) => {
    const classes = useStyles();

    let defaultValue = 0;
    navigationLinks.forEach(bottomNavigationLink => {
        if (('/' + bottomNavigationLink.route === props.history.location.pathname) || ('/se-connecter' === props.history.location.pathname)) {
            defaultValue = props.history.location.pathname;
        }
    });
    const [value, setValue] = React.useState(defaultValue);


    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                props.history.push(newValue);
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            {navigationLinks.map((bottomNavigationLink, index) => {
                const SpecificIcon = bottomNavigationIcons[bottomNavigationLink.icon];

                if ((!authentication.currentUserValue && bottomNavigationLink.private === false) || authentication.currentUserValue) {
                    return (<BottomNavigationAction key={index} className={classes.bottomNavAction} value={'/' + bottomNavigationLink.route} label={bottomNavigationLink.label}
                                                    icon={<SpecificIcon/>}/>)
                }
            })}
            {!authentication.currentUserValue &&
            <BottomNavigationAction
                className={classes.bottomNavAction}
                value={'/se-connecter'}
                label={'Se connecter'}
                icon={<MeetingRoomIcon/>}
            />
            }
        </BottomNavigation>
    );
}
export default AppBottomNavigation;
