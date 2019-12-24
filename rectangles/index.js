// rectangle is an array of (x,y) coordinates
const rectangle1 = [ // that is 1x1 square
    { x: 0, y: 0 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 2, y: 0 },
];
const rectangle2 = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 2, y: 1 },
];
const rectangle3 = [
    { x: 0, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 3, y: 0 },
];
const rectangle4 = [
    { x: 0, y: 0 },
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 3, y: 0 },
];

/**
 * Vector multiplication
 *
 * @param {number} ax - x vector coordinate of a vector
 * @param {number} ay - y vector coordinate of a vector
 * @param {number} bx - x vector coordinate of b vector
 * @param {number} by - y vector coordinate of b vector
 * @returns {number}
 */
const vectorMultiplication = (ax, ay, bx, by) => {
    return ax * by - ay * bx;
};

// Two  rectangles intersect if at least on rectangle side intersect another rectangle side.
/**
 * Will take coordinates of two sides. Return true if they intersect and false if they doesn't
 *
 * @param {number} x1 - start x coordinate of first side
 * @param {number} y1 - start y coordinate of first side
 * @param {number} x2 - end x coordinate of first side
 * @param {number} y2 - end y coordinate of first side
 * @param {number} x3 - start x coordinate of second side
 * @param {number} y3 - start y coordinate of second side
 * @param {number} x4 - end x coordinate of second side
 * @param {number} y4 - end y coordinate of second side
 * @returns {boolean}
 */
const doesSidesIntersect = ({ x1, y1, x2, y2 }, { x3, y3, x4, y4 }) => {
    const v1 = vectorMultiplication(x4 - x3, y4 - y3, x1 - x3, y1 - y3);
    const v2 = vectorMultiplication(x4 - x3, y4 - y3, x2 - x3, y2 - y3);
    const v3 = vectorMultiplication(x2 - x1, y2 - y1, x3 - x1, y3 - y1);
    const v4 = vectorMultiplication(x2 - x1, y2 - y1, x4 - x1, y4 - y1);

    if (v1 !== 0 && v2 !== 0 && v3 !== 0 && v4 !== 0) {
        return (v1 * v2 < 0) && (v3 * v4 < 0);
    } else { // sides on same line
        // check if at least one point of second side is part of first side
        const isPoint3Part = x3 >= x1 && x3 <= x2 && y3 >= y1 && y3 <= y2;
        const isPoint4Part = x4 >= x1 && x4 <= x2 && y4 >= y1 && y4 <= y2;
        return isPoint3Part || isPoint4Part;
    }
};

/**
 * Will take coordinates of two rectangles. Return true if they intersect and false if they doesn't
 *
 * @param {Array} rect1 - array of coordinates
 * @param {Array} rect2 - array of coordinates
 * @returns {boolean}
 */
const doesRectanglesIntersect = (rect1, rect2) => {
    const rect1Sides = [];
    const rect2Sides = [];
    for (let i = 0; i < rect1.length; i++) {
        const x1 = rect1[ i ].x;
        const y1 = rect1[ i ].y;
        const nextIndex = i + 1 === rect1.length ? 0 : i + 1;
        const x2 = rect1[ nextIndex ].x;
        const y2 = rect1[ nextIndex ].y;
        rect1Sides.push({ x1, y1, x2, y2 });
    }
    for (let i = 0; i < rect2.length; i++) {
        const x3 = rect2[ i ].x;
        const y3 = rect2[ i ].y;
        const nextIndex = i + 1 === rect2.length ? 0 : i + 1;
        const x4 = rect2[ nextIndex ].x;
        const y4 = rect2[ nextIndex ].y;
        rect2Sides.push({ x3, y3, x4, y4 });
    }
    let intersect = false;

    while (!intersect && rect1Sides.length) {
        const side1 = rect1Sides.pop();
        for (let i = 0; i < rect2Sides.length; i++) {
            const side2 = rect2Sides[ i ];
            intersect = doesSidesIntersect(side1, side2);
            if (intersect) {
                break;
            }
        }
    }

    return intersect;
};

console.log(doesRectanglesIntersect(rectangle2, rectangle4));