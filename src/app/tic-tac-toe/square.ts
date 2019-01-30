export class Square {
    id: number;
    value: string;
    coordinates: string;
    isWinningSquare: boolean;
    
    constructor(id: number, value: string, coordinates: string) {
        this.id = id;
        this.value = value;
        this.coordinates = coordinates;
        this.isWinningSquare = false
    }
}