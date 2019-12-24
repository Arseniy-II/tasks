/* eslint-disable */
import { ClientFunction, Selector, Role } from 'testcafe';
import TEST_IDS                           from './testIds';

fixture`Getting Started`;

const selectDataTest = (dataTest, index) => index === undefined ? `[data-test="${ dataTest }"]` : `[data-test="${ dataTest }-${ index }"]`;

const getPathName = ClientFunction(() => document.location.pathname);


const urlToTest = 'http://localhost:8080';

test('Convert from one currency to another', async t => {

    const currencyFromSelect = Selector(`[data-test="${ TEST_IDS.CURRENCY_FROM }"]`);
    const currencyFromOptions = currencyFromSelect.find('option');


    await t
        .navigateTo(urlToTest)
        .click(currencyFromSelect)
        .click(currencyFromOptions.withText('USD'))
        .expect(currencyFromSelect.value)
        .eql('USD');

    const currencyToSelect = Selector(`[data-test="${ TEST_IDS.CURRENCY_TO }"]`);
    const currencyToOptions = currencyToSelect.find('option');
    await t
        .click(currencyToSelect)
        .click(currencyToOptions.withText('JPY'))
        .expect(currencyToSelect.value)
        .eql('JPY');

    await t
        .typeText('#amount', '1000', { paste: true })
        .expect(Selector(`[data-test="${ TEST_IDS.CONVERTED }"]`).exists)
        .ok('Converted amount doesn\'t exist')
});
