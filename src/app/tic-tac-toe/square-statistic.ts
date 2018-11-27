export class SquareStatistic {
    squareId: number;
    winningGameCount: number;
    gameCount: number;

    constructor(squareId: number, winningGameCount: number, gameCount: number) {
        this.squareId = squareId;
        this.winningGameCount = winningGameCount;
        this.gameCount = gameCount;
    }
}