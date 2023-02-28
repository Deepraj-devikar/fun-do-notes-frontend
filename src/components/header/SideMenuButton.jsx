import './SideMenuButton.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const SideMenuButtonActive = styled(Button)({
    textTransform: 'none',
    backgroundColor: '#feefc3',
    color: '#202124',
    '&:hover': {
        backgroundColor: '#feefc3',
        color: '#202124',
    },
    borderRadius: '0 25px 25px 0',
    height: '48px',
});

const SideMenuButtonNormal = styled(Button)({
    textTransform: 'none',
    backgroundColor: '#fff',
    color: '#202124',
    borderRadius: '0 25px 25px 0',
    height: '48px',
});

export default function SideMenuButton(props) {
    if(props.active){
        return (
            <SideMenuButtonActive>
                <div className='main-page-side-menu-button'>
                    {props.children}
                </div>
            </SideMenuButtonActive>
        );
    } else {
        return (
            <SideMenuButtonNormal onClick={() => props.onMenuClick(props.menuName)}>
                <div className='main-page-side-menu-button'>
                    {props.children}
                </div>
            </SideMenuButtonNormal>
        );
    }
}