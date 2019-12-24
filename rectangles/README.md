# Rectangles task
Determine if 2 rectangles intersect

## How to run
Go to [index.js file](index.js)
And provide your rectangles here:
```javascript
console.log(doesRectanglesIntersect(rectangle2, rectangle4));
```
After that save and run
```
npm run rectangles
```

## Rectangle example
```javascript
const rectangle1 = [
    { x: 0, y: 0 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 2, y: 0 },
];
```

##Restrictions

Please note that app assumes you provide correct rectangles and you don't use crazy numbers.
And of course it still may have some errors due to **js** computational errors (like `0.3 !== 0.1 + 0.2`).
