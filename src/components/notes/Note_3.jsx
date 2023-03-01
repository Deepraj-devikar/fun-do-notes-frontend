import './Note_3.css';
import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Popper from '@mui/material/Popper';
import { useState } from 'react';
import ColorPalette from '../color/ColorPalette';
import ColoredPaper from '../color/ColoredPaper';
import Modal from '@mui/material/Modal';
import Note_2 from './Note_2';

const styleModal = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export default function Note_3(props) {
    const [state, setState] = useState({anchorElColorPalette: null});

    const colorPaletteOnClick = (e) => {
        setState(prevState => ({ 
            ...prevState, 
            anchorElColorPalette: (prevState.anchorElColorPalette ? null : e.currentTarget) 
        }));
    };
    const openColorPalette = Boolean(state.anchorElColorPalette);
    const id = openColorPalette ? 'simple-popper' : undefined;

    const chooseColor = (color) => {
        if(!props.trashNote) props.noteColor(props.note._id, color);
        setState(prevState => ({ 
            ...prevState, 
            anchorElColorPalette: null 
        }));
    };

    const handleOpen = () => setState(prevState => ({
        ...prevState,
        open: true
    }));
    const handleClose = () => setState(prevState => ({
        ...prevState,
        open: false
    }));

    const note2CloseOnClick = (data) => {
        if(!props.trashNote) props.note3CloseOnClick(props.note._id, data);
        handleClose();
    };

    return (
        <div>
            <ColoredPaper elevation={4} color={props.note.color}>
                <div className='note-3'>
                    <div className='note-3-title' onClick={handleOpen}>
                        <div className='note-3-title-text'>
                            {props.note.title}
                        </div>
                    </div>
                    <div className='note-3-description' onClick={handleOpen}>
                        <div className='note-3-description-text'>
                            {props.note.description}
                        </div>
                    </div>
                    {
                        props.trashNote ? 
                            <div className='note-3-icon-btns'>
                                <div>
                                    <IconButton onClick={() => props.note3Delete(props.note._id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton onClick={() => props.note3Trash(props.note._id)}>
                                        <RestoreFromTrashIcon />
                                    </IconButton>
                                </div>
                            </div>
                        :
                            <div className='note-3-icon-btns'>
                                <div>
                                    <IconButton onClick={colorPaletteOnClick}>
                                        <ColorLensIcon />
                                    </IconButton>
                                    <Popper id={id} open={openColorPalette} anchorEl={state.anchorElColorPalette} >
                                        <ColorPalette chooseColor={chooseColor} />
                                    </Popper>
                                </div>
                                <div>
                                    <IconButton onClick={() => props.note3Trash(props.note._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton onClick={() => props.note3Archive(props.note._id)}>
                                        <ArchiveIcon />
                                    </IconButton>
                                </div>
                            </div>  
                    }
                </div>
            </ColoredPaper>
            <Modal sx={styleModal}
                open={state.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Note_2
                    note2CloseOnClick={note2CloseOnClick} 
                    title={props.note.title} 
                    description={props.note.description}
                    color={props.note.color}
                />
            </Modal>
        </div>
    );
}