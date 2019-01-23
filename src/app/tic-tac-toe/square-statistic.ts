export class SquareStatistic {
    squareId: number;
    winningGameCount: number;
    losingGameCount: number;
    gameCount: number;

    constructor(squareId: number, winningGameCount: number, losingGameCount: number, gameCount: number) {
        this.squareId = squareId;
        this.winningGameCount = winningGameCount;
        this.losingGameCount = losingGameCount;
        this.gameCount = gameCount;
    }
}