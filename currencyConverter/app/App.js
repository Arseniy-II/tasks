import { hot }             from 'react-hot-loader';
import React, { Fragment } from 'react';
import FormWithValidation  from './ui/FormWithValidation';
import ExchangeRates       from './ui/ExchangeRates';
import './styles.scss';


const BaseApp = () => {
    return <Fragment>
        <ExchangeRates />
        <FormWithValidation />
    </Fragment>;
};

export default hot(module)(BaseApp);
