import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ColoredPaper = styled(Paper)(({ color }) => ({
    backgroundColor: color ? color : '#fff',
}));

export default ColoredPaper;