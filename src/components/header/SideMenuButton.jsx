import './SideMenuButton.css';
import { Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const styleButtonActive = {
    textTransform: 'none',
    backgroundColor: '#feefc3',
    color: '#202124',
    '&:hover': {
        backgroundColor: '#feefc3',
        color: '#202124',
    },
    borderRadius: '0 25px 25px 0',
    height: '48px',
};

const styleButtonNormal = {
    textTransform: 'none',
    backgroundColor: '#fff',
    color: '#202124',
    borderRadius: '0 25px 25px 0',
    height: '48px',
};

const SideMenuButtonActive = styled(Button)(styleButtonActive);

const SideMenuButtonNormal = styled(Button)(styleButtonNormal);

const SideMenuIconButtonActive = styled(IconButton)(styleButtonActive);

const SideMenuIconButtonNormal = styled(IconButton)(styleButtonNormal);

export default function SideMenuButton(props) {
    if(props.drawerOpen) {
        if(props.active){
            return (
                <SideMenuButtonActive>
                    <div className='main-page-side-menu-button'>
                        {props.children}
                        {props.menuName}
                    </div>
                </SideMenuButtonActive>
            );
        } else {
            return (
                <SideMenuButtonNormal onClick={() => props.onMenuClick(props.menuName)}>
                    <div className='main-page-side-menu-button'>
                        {props.children}
                        {props.menuName}
                    </div>
                </SideMenuButtonNormal>
            );
        }
    } else {
        if(props.active){
            return (
                <SideMenuIconButtonActive>
                    {props.children}
                </SideMenuIconButtonActive>
            );
        } else {
            return (
                <SideMenuIconButtonNormal onClick={() => props.onMenuClick(props.menuName)}>
                    {props.children}
                </SideMenuIconButtonNormal>
            );
        }
    }
}