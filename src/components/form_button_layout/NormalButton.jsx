import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
    textTransform: 'none',
});

export default function NormalButton(props) {
    return (
        <StyledButton {...props} />
    );
}