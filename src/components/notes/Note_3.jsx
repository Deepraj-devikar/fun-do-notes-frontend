import './Note_3.css';
import IconButton from '@mui/material/IconButton';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ImageIcon from '@mui/icons-material/Image';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Popper from '@mui/material/Popper';
import { useState } from 'react';
import ColorPalette from '../color/ColorPalette';
import ColoredPaper from '../color/ColoredPaper';

export default function Note_3(props) {
    const [state, setState] = useState({anchorElColorPalette: null});

    const colorPaletteOnClick = (e) => {
        setState(prevState => ({ 
            ...prevState, 
            anchorElColorPalette: (prevState.anchorElColorPalette ? null : e.currentTarget) 
        }));
    };
    const open = Boolean(state.anchorElColorPalette);
    const id = open ? 'simple-popper' : undefined;

    const chooseColor = (color) => {
        props.noteColor(props.note._id, color);
        setState(prevState => ({ 
            ...prevState, 
            anchorElColorPalette: null 
        }));
    }

    return (
        <ColoredPaper elevation={4} color={props.note.color}>
            <div className='note-3'>
                <div className='note-3-title'>
                    <div className='note-3-title-text'>
                        {props.note.title}
                    </div>
                    <div className='note-3-title-btns'>
                        <div className='note-3-pin-btn'>
                            <IconButton >
                                <PushPinIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className='note-3-description'>
                    <div className='note-3-description-text'>
                        {props.note.description}
                    </div>
                </div>
                <div className='note-3-icon-btns'>
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
                        <IconButton onClick={() => props.note3Archive(props.note._id)}>
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
            </div>
        </ColoredPaper>
    );
}