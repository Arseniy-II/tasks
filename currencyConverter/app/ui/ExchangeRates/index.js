import React, { useState, useEffect } from 'react';
import TEST_IDS                       from '../../../tests/testIds';
import InputComponent                 from '../components/Form/InputComponent';
import getNumberFromString            from '../../util/getNumberFromString';
import styles                         from './styles.scss';

const ExchangeRates = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ rates, setRates ] = useState(null);
    const [ base, setBase ] = useState(ExchangeRates.CURRENNCY.EUR);
    const [ convertTo, setConvertTo ] = useState(ExchangeRates.CURRENNCY.EUR);
    const [ amount, setAmount ] = useState(undefined);

    const currencies = [];
    for (let key in ExchangeRates.CURRENNCY) {
        const currencyCode = ExchangeRates.CURRENNCY[ key ];
        currencies.push(currencyCode);
    }

    useEffect(() => {
        const restCurrencies = currencies.filter(currency => currency !== base);
        setIsLoading(true);

        fetch(`https://api.exchangeratesapi.io/latest?symbols=${ restCurrencies.join(',') }&base=${ base }`)
            .then(response => response.json())
            .then(result => {
                setRates(result.rates);
                setIsLoading(false);
            });
    }, [ base ]);

    let convertedAmount = amount;
    if (base !== convertTo && !isLoading) {
        convertedAmount = convertedAmount * rates[ convertTo ];
    }
    console.log(convertTo);

    return (
        <div className={ styles.box }>
            <div className={ styles.currencies }>
                <div className={ styles.currencyBox }>
                    <div className={ styles.currencyLabel }>
                        From:
                    </div>
                    <select
                        value={ base }
                        className={ styles.select }
                        onChange={ (event) => {setBase(event.target.value);} }
                        data-test={ TEST_IDS.CURRENCY_FROM }
                    >
                        { currencies.map(currency => <option
                            key={ currency }
                            value={ currency }
                        >{ currency }</option>) }
                    </select>
                </div>
                <div className={ styles.currencyBox }>
                    <div className={ styles.currencyLabel }>
                        To:
                    </div>
                    <select
                        value={ convertTo }
                        className={ styles.select }
                        onChange={ (event) => {setConvertTo(event.target.value);} }
                        data-test={ TEST_IDS.CURRENCY_TO }
                    >
                        { currencies.map(currency => <option
                            key={ currency }
                            value={ currency }
                        >{ currency }</option>) }
                    </select>
                </div>
            </div>

            <InputComponent
                data
                name="amount"
                label="Amount"
                placeholder="Enter amount"
                setValue={ (value) => {setAmount(+value);} }
                value={ amount }
                modifyValueOnChange={ (rateValue) => getNumberFromString(rateValue, 2) }
            />

            { isLoading ? <div>isLoading...</div> : <div>
                Result: { convertedAmount ? <span data-test={ TEST_IDS.CONVERTED }>{ convertedAmount }</span> : '' }
            </div> }
        </div>
    );
};

ExchangeRates.CURRENNCY = {
    USD: 'USD',
    EUR: 'EUR',
    JPY: 'JPY',
};

export default ExchangeRates;
