/**
 * Random integer from 1 to 36
 *
 * @returns {number}
 */
const randomInteger = () => {
    let rand = 1 - 0.5 + Math.random() * (36 - 1 + 1);
    return Math.round(rand);
};

/**
 * Will run dice play n times. Returns statistic info
 *
 * @param {number} n
 * @returns {string}
 */
const play = (n) => {
    const bet = 0.5;
    const statistic = {
        spent: 0,
        lost: 0,
        additional: 0,
        total: 0,
    };

    for (let i = 0; i < n; i++) {
        statistic.spent = statistic.spent + bet;
        const dices = randomInteger();
        if (dices <= 15 && dices >= 1) {//we lost our bet
            statistic.lost = statistic.lost + bet;
        }
        if (dices <= 33 && dices >= 31) {// we get additional bet
            statistic.additional = statistic.additional + bet;
        }
        if (dices <= 35 && dices >= 34) {// we get additional 2 x bet
            statistic.additional = statistic.additional + 2*bet;
        }
        if (dices === 36) {// we get additional bet 3 x bet
            statistic.additional = statistic.additional + 3*bet;
        }
    }
    statistic.total = statistic.spent - statistic.lost + statistic.additional;
    const income = statistic.additional - statistic.lost;
    return `Your income is: ${income}. statistics: ${JSON.stringify(statistic)}`;
};

console.log(play(1000));
