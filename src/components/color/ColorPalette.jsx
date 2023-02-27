import './ColorPalette.css';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const ColorOption = styled(Paper)(({ color }) => ({
    backgroundColor: color ? color : '#fff',
    borderRadius: '40px',
    width: '40px',
    height: '40px',
}));

export default function ColorPalette(props) {
    const colors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];
    return (
        <Paper elevation={4}>
            <div className='color-palette-color-list'>
                {
                    colors.map(color => (
                        <ColorOption key={color} color={color} onClick={() => props.chooseColor(color)} />
                    ))
                }
            </div>
        </Paper>        
    );
} 