import { Difficulty } from '../difficulty/difficulty';

export class Player {
    id: number;
    symbol: string;
    isHuman: boolean;
    difficulty: Difficulty

    constructor(id: number, value: string, isHuman: boolean, difficulty: Difficulty) {
        this.id = id;
        this.symbol = value;
        this.isHuman = isHuman;
        this.difficulty = difficulty;
    }
}