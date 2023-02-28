import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewListIcon from '@mui/icons-material/ViewList';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const GrayInputBase = styled(InputBase)({
    background: '#f1f3f4',
    height: '50px',
    border: '1px solid #f1f3f4',
    borderRadius: '8px'
});

export default function Header() {
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-left-menu'>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>                
                    <img src='./keep_note.png'/>
                    <div className='header-heading'>
                        Keep
                    </div>
                </div>
                <div className='header-center'>
                    <div className='header-center-text-field'>
                        <GrayInputBase placeholder='Search' fullWidth="true"/>
                    </div>
                </div>
                <div className='header-right-menu'>
                    <div className='header-right-1-menu'>
                        <IconButton>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton>
                            <ViewListIcon />
                        </IconButton>                    
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </div>
                    <div className='header-right-2-menu'>
                        <IconButton>
                            <AppsIcon />
                        </IconButton>
                        <IconButton>
                            <PersonIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}