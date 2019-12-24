# Rectangles task
Play dice game n times and returns statistic

## How to run
```
npm run dices
```

##Note
This task doesn't require any code to solve it actually.

`n - number of games`

`x - bet`

- In average we lost `15*x*n/36`
- In average we win additional `10*n*x/36`
- In average total income is `-5*n*x/36`

So most likely we will lost about `5*1000*0.5/36 = 69.4` Euro after 1000 games