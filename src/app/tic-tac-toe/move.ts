export class Move {
    symbol: string;
    squareId: number;
    isWinningMove: boolean;

    constructor(symbol: string, squareId: number, isWinningMove: boolean) {
        this.symbol = symbol;
        this.squareId = squareId;
        this.isWinningMove = isWinningMove;
    }
}