import './SignIn.css';
import OuterLayout from '../../components/outer_layout/OuterLayout';
import Logo from '../../components/logo/Logo';
import TextField from '@mui/material/TextField';
import FormButtonLayout from '../../components/form_button_layout/FormButtonLayout';
import NormalButton from '../../components/form_button_layout/NormalButton';
import { useState } from 'react';
import { SignInApi } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;
    
    const navigate = useNavigate()
    
    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(
            {...state, [name]: value},
        );
    }

    const validateUserInput = (inputName = '') => {
        const validation = {};
        switch (inputName) {
            case '':                
            case 'email':
                if(emailRegex.test(state.email)){
                    validation['validEmail'] = true;
                    validation['emailHelperText'] = '';
                } else {
                    validation['validEmail'] = false;
                    validation['emailHelperText'] = 'Plaese enter valid email.';
                }
                if(inputName != ''){
                    break;
                }
            case 'password':
                if(passwordRegex.test(state.password)){
                    validation['validPassword'] = true;
                    validation['passwordHelperText'] = '';
                } else {
                    validation['validPassword'] = false;
                    validation['passwordHelperText'] = 'Please enter valid password.';
                }
                break;
            default:
                break;
        }
        setState(prevState => ({
            ...prevState,
            ...validation
        }));
    }

    const nextButtonClick = () => {
        validateUserInput();
        if(state.validEmail === true && state.validPassword === true){
            SignInApi({
                email: state.email,
                password: state.password 
            })
            .then(response => {
                if(response.status == '200') {
                    localStorage.setItem('authentication_token', response.data.token);
                    navigate('/dashboard');
                }
            })
            .catch(error => {
                console.log(error)
            });
        }
    };

    return (
        <OuterLayout>
            <div className="sign-in-box">
                <div className='sign-in-branding'>
                    <div className="sign-in-logo">
                        <Logo />
                    </div>
                    <div className="sign-in-page-heading">
                        Sign In
                    </div>
                    <div className="sign-in-page-sub-heading">
                        to continue to fun do notes
                    </div>
                </div>
                <div className='sign-in-inputs'>
                    <div className='sign-in-input-field sign-in-email-input'>
                        <TextField id="outlined-basic" variant="outlined" fullWidth={true} size="small" 
                            value={state.email}
                            label="Email"
                            name="email"
                            type="email"
                            error={state.validEmail === false}
                            helperText={state.validEmail === false ? state.emailHelperText : null}
                            onChange={(e) => handleUserInput(e)}
                            onBlur={(e) => validateUserInput(e.target.name)}
                        />
                    </div>
                    
                    <div className='sign-in-input-field sign-in-password-input'>
                        <TextField id="outlined-basic" variant="outlined" fullWidth={true} size="small" 
                            value={state.password}
                            label="Password"
                            name="password"
                            type="password"
                            error={state.validPassword === false}
                            helperText={state.validPassword === false ? state.passwordHelperText : null}
                            onChange={(e) => handleUserInput(e)}
                            onBlur={(e) => validateUserInput(e.target.name)}
                        />
                        <NormalButton variant="text">
                            Forget password?
                        </NormalButton>
                    </div>
                </div>
                <div className='sign-in-note'>
                    <div className='sign-in-note-text'>
                        Not your computer? Use Guest mode to sign in privately.
                    </div>    
                </div>
                <div className='sign-in-buttons'>
                    <FormButtonLayout>
                        <NormalButton variant="text"
                            onClick={() => {navigate('/signup')}}
                        >
                            Create account
                        </NormalButton>
                        <NormalButton variant="contained"
                            onClick={nextButtonClick}
                        >
                            Next
                        </NormalButton>
                    </FormButtonLayout>
                </div>
            </div>
        </OuterLayout>
    );
}