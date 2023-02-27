import './Note_2.css';
import { InputBase, IconButton } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ImageIcon from '@mui/icons-material/Image';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import NormalButton from '../form_button_layout/NormalButton';
import { useState } from 'react';
import ColorPalette from '../color/ColorPalette';
import Popper from '@mui/material/Popper';
import ColoredPaper from '../color/ColoredPaper';

export default function Note_2(props) {
    const [state, setState] = useState({
        title: '',
        description: '',
        color: '#ffffff',
        anchorElColorPalette: null
    });

    const colorPaletteOnClick = (e) => {
        setState(prevState => ({ 
            ...prevState, 
            anchorElColorPalette: (prevState.anchorElColorPalette ? null : e.currentTarget) 
        }));
    };
    const open = Boolean(state.anchorElColorPalette);
    const id = open ? 'simple-popper' : undefined;

    const chooseColor = (color) => {
        setState(prevState => ({ 
            ...prevState, 
            color: color,
            anchorElColorPalette: null 
        }));
    }

    return (
        <div className='note-2'>
            <ColoredPaper elevation={4} color={state.color}>
                <div className='note-2-content'>
                    <div className='note-2-title'>
                        <div className='note-2-title-text-field'>
                            <InputBase fullWidth={true} size="medium" 
                                name="title" 
                                placeholder="Title"
                                onChange={e => {
                                    setState(prevState => ({...prevState, title: e.target.value}));
                                }}
                            />
                        </div>
                        <div className='note-2-title-btns'>
                            <div className='note-1-on-btn'>
                                <IconButton >
                                    <PushPinIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className='note-2-description'>
                        <div className='note-2-description-text-field'>
                            <InputBase fullWidth={true} size="medium" 
                                name="description" 
                                placeholder="Description"
                                onChange={e => {
                                    setState(prevState => ({...prevState, description: e.target.value}));
                                }}
                            />
                        </div>
                    </div>
                    <div className='note-2-btns'>
                        <div className='note-2-icon-btns'>
                            <div>
                                <IconButton >
                                    <AddAlertIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton >
                                    <PersonAddAltIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton onClick={colorPaletteOnClick}>
                                    <ColorLensIcon />
                                </IconButton>
                                <Popper id={id} open={open} anchorEl={state.anchorElColorPalette} >
                                    <ColorPalette chooseColor={chooseColor} />
                                </Popper>
                            </div>
                            <div>
                                <IconButton >
                                    <ImageIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton >
                                    <ArchiveIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton >
                                    <MoreVertIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton >
                                    <UndoIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton >
                                    <RedoIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='note-2-close-btn'>
                            <NormalButton variant="text" onClick={() => props.note2CloseOnClick(
                                {
                                    title: state.title,
                                    description: state.description,
                                    color: state.color
                                }
                            )}>
                                Close
                            </NormalButton>
                        </div>
                    </div>
                </div> 
            </ColoredPaper>
        </div>
    );
}