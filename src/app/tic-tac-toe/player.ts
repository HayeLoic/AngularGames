import { DifficultyLevel } from '../difficulty/difficulty-level';

export class Player {
    id: number;
    symbol: string;
    isHuman: boolean;
    difficultyLevel: DifficultyLevel

    constructor(id: number, value: string, isHuman: boolean, difficultyLevel: DifficultyLevel) {
        this.id = id;
        this.symbol = value;
        this.isHuman = isHuman;
        this.difficultyLevel = difficultyLevel;
    }
}