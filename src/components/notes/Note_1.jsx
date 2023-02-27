import './Note_1.css';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BrushIcon from '@mui/icons-material/Brush';
import ImageIcon from '@mui/icons-material/Image';
import Paper from '@mui/material/Paper';

export default function Note_1(props) {
    return (
        <div className='note-1' onClick={() => props.note1OnClick()}>
            <Paper elevation={4}>
                <div className='note-1-content'>
                    <div className='note-1-text'>
                        Take a note...
                    </div>
                    <div className='note-1-btns'>
                        <div className='note-1-on-btn'>
                            <IconButton >
                                <CheckBoxIcon />
                            </IconButton>
                        </div>
                        <div className='note-1-off-btn'>
                            <IconButton >
                                <BrushIcon />
                            </IconButton>
                        </div>
                        <div className='note-1-close-btn'>
                            <IconButton >
                                <ImageIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}