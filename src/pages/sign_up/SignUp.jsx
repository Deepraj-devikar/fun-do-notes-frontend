import './SignUp.css';
import OuterLayout from '../../components/outer_layout/OuterLayout';
import Logo from '../../components/logo/Logo';
import TextField from '@mui/material/TextField';
import FormButtonLayout from '../../components/form_button_layout/FormButtonLayout';
import NormalButton from '../../components/form_button_layout/NormalButton';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpApi } from '../../services/UserService';

export default function SignUp() {
    const [state, setState] = useState({
        showPassword: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const nameRegex = /^([A-Z]{1}[a-z,A-Z]{2,})$/;
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

    const navigate = useNavigate();

    const handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(
            {...state, [name]: value},
        );
    }

    const validateUserInput = (inputName = '') => {
        const validation = {};
        let isCorrectValidation = true;
        switch (inputName) {
            case '':
            case 'firstName':
                if(nameRegex.test(state.firstName)){
                    validation['validFirstName'] = true;
                    validation['firstNameHelperText'] = '';
                } else {
                    validation['validFirstName'] = false;
                    validation['firstNameHelperText'] = 'Plaese enter valid first name.';
                    isCorrectValidation = false;
                }
                if(inputName != ''){
                    break;
                }
            case 'lastName':
                if(nameRegex.test(state.lastName)){
                    validation['validLastName'] = true;
                    validation['lastNameHelperText'] = '';
                } else {
                    validation['validLastName'] = false;
                    validation['lastNameHelperText'] = 'Plaese enter valid last name.';
                    isCorrectValidation = false;
                }
                if(inputName != ''){
                    break;
                }
            case 'email':
                if(emailRegex.test(state.email)){
                    validation['validEmail'] = true;
                    validation['emailHelperText'] = '';
                } else {
                    validation['validEmail'] = false;
                    validation['emailHelperText'] = 'Plaese enter valid email.';
                    isCorrectValidation = false;
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
                    isCorrectValidation = false;
                }
                if(inputName != ''){
                    break;
                }
            case 'confirmPassword':
                if(state.password == state.confirmPassword){
                    validation['validConfirmPassword'] = true;
                    validation['confirmPasswordHelperText'] = '';
                } else {
                    validation['validConfirmPassword'] = false;
                    validation['confirmPasswordHelperText'] = 'Please confirm password.';
                    isCorrectValidation = false;
                }
                break;
            default:
                break;
        }
        setState(prevState => ({
            ...prevState,
            ...validation
        }));
        return isCorrectValidation;
    }
    
    const nextButtonClick = () => {
        let isCorrectValidation = validateUserInput();
        if(
            isCorrectValidation === true
        ){
            SignUpApi({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password 
            })
            .then(response => {
                if(response.status == '201') {
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error)
            });
        }
    };

    const showPasswordToggle = () => {
        setState(prevState => ({
            ...prevState,
            showPassword: !prevState.showPassword
        }));
    }

    return (
        <OuterLayout>
            <div className="sign-up-box">
                <div className='sign-up-form-box'>
                    <div className='sign-up-branding'>
                        <div className="sign-up-logo">
                            <Logo />
                        </div>
                        <div className="sign-up-page-heading">
                            Create your FunDoNotes Account
                        </div>
                        <div className="sign-up-page-sub-heading">
                            to continue to FunDoNotes
                        </div>
                    </div>
                    <div className='sign-up-inputs'>
                        <div className='sign-up-person-name'>
                            <div className='sign-up-input-field sign-up-first-name-input'>
                                <TextField id="outlined-basic" variant="outlined" fullWidth={true} size="small"
                                    value={state.firstName}
                                    label="First Name"
                                    name="firstName"
                                    error={state.validFirstName === false}
                                    helperText={state.validFirstName === false ? state.firstNameHelperText : null}
                                    onChange={(e) => handleUserInput(e)}
                                    onBlur={(e) => validateUserInput(e.target.name)}
                                />
                            </div>

                            <div className='sign-up-input-field sign-up-last-name-input'>
                                <TextField id="outlined-basic" variant="outlined" fullWidth={true} size="small" 
                                    value={state.lastName}
                                    label="Last Name"
                                    name="lastName"
                                    error={state.validLastName === false}
                                    helperText={state.validLastName === false ? state.lastNameHelperText : null}
                                    onChange={(e) => handleUserInput(e)}
                                    onBlur={(e) => validateUserInput(e.target.name)}
                                />
                            </div>
                        </div>

                        <div className='sign-up-email'>
                            <div className='sign-up-input-field sign-up-email-input'>
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
                            <div className='sign-up-input-hint'>
                                You can use email
                            </div>
                        </div>

                        <div className='sign-up-password'>
                            <div className='sign-up-password-inputs'>
                                <div className='sign-up-input-field sign-up-password-input'>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth={true} size="small"
                                        value={state.password}
                                        label="Password"
                                        name="password"
                                        type={state.showPassword ? 'text' : 'password'}
                                        error={state.validPassword === false}
                                        helperText={state.validPassword === false ? state.passwordHelperText : null}
                                        onChange={(e) => handleUserInput(e)}
                                        onBlur={(e) => validateUserInput(e.target.name)}
                                    />
                                </div>

                                <div className='sign-up-input-field sign-up-confirm-password-input'>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth={true} size="small"
                                        value={state.confirmPassword}
                                        label="Confirm Password" 
                                        name="confirmPassword"
                                        type={state.showPassword ? 'text' : 'password'}
                                        error={state.validConfirmPassword === false}
                                        helperText={state.validConfirmPassword === false ? state.confirmPasswordHelperText : null}
                                        onChange={(e) => handleUserInput(e)}
                                        onBlur={(e) => validateUserInput(e.target.name)}
                                    />
                                </div>
                            </div>
                            <div className='sign-up-input-hint'>
                                Use 8 or more characters with mix of letters, numbers &<br/>symbols
                            </div>
                            <div className='sign-up-input-field sign-up-show-password'>
                                <Checkbox 
                                    checked={state.showPassword}
                                    onChange={showPasswordToggle}
                                />
                                <div className='sign-up-show-password-text'>
                                    Show password
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sign-up-buttons'>
                        <FormButtonLayout>
                            <NormalButton variant="text"
                                onClick={() => {navigate('/')}}
                            >
                                Sign in insted
                            </NormalButton>
                            <NormalButton variant="contained"
                                onClick={nextButtonClick}
                            >
                                Next
                            </NormalButton>
                        </FormButtonLayout>
                    </div>
                </div>
                <div className='sign-up-image-box'>
                    <img src='./account.svg'/>
                    <div className='sign-up-image-box-text'>
                        One account. All of FunDoNotes<br />working for you.
                    </div>
                </div>
            </div>
        </OuterLayout>
    );
}