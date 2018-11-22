export class Square {
    id: number;
    value: string;
    isWinningSquare: boolean;
    
    constructor(id: number, value: string) {
        this.id = id;
        this.value = value;
        this.isWinningSquare = false
    }
}