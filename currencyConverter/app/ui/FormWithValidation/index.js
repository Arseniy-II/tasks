import { hot }               from 'react-hot-loader';
import React, { useState }   from 'react';
import FormsyComponent       from '../components/Formsy/FormsyComponent';
import FormsyInputComponent  from '../components/Formsy/FormsyInputComponent';
import FormsySubmitComponent from '../components/Formsy/FormsySubmitComponent';
import styles                from './styles.scss';

const BaseApp = () => {
    const formId = 'formId';
    const [ isLoading, setIsLoading ] = useState(false);
    const [ errors, setErrors ] = useState(null);
    const [ correct, setCorrect ] = useState(false);

    const handleSubmit = (input) => {
        setIsLoading(true);
        setErrors(null);
        if (!correct) {
            setTimeout(() => {
                console.log('%c Success! ', 'color: #91FFA0');
                setCorrect(true);
                setIsLoading(false);
            }, 1000);
        } else {
            setTimeout(() => {
                console.log('%c Error! ', 'color: #ff0000');
                setIsLoading(false);
                setCorrect(false);
                setErrors([ { key: 'email', value: 'Already used' } ]);
            }, 1000);
        }
    };

    return (
        <FormsyComponent
            onValidSubmit={ handleSubmit }
            formId={ formId }
            className={ styles.form }
            errorMessage={ errors }
        >
            <FormsyInputComponent
                name="firstName"
                required
                placeholder="Enter first name"
                label="First name"
            />
            <FormsyInputComponent
                name="email"
                required
                placeholder="Enter your email"
                label="Email"
                validations="isEmail"
                validationError="This is not a valid email"
            />
            <FormsySubmitComponent
                formId={ formId }
                disabled={ isLoading }
                className={ styles.submit }
            >
                Send
            </FormsySubmitComponent>
        </FormsyComponent>
    );
};

export default hot(module)(BaseApp);
