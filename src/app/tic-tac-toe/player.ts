import { DifficultyLevel } from '../difficulty/difficulty-level';
import { Difficulty } from '../difficulty/difficulty';

export class Player {
    id: number;
    symbol: string;
    isHuman: boolean;
    difficultyLevel: DifficultyLevel
    difficulty: Difficulty

    constructor(id: number, value: string, isHuman: boolean, difficultyLevel: DifficultyLevel, difficulty: Difficulty) {
        this.id = id;
        this.symbol = value;
        this.isHuman = isHuman;
        this.difficultyLevel = difficultyLevel;
        this.difficulty = difficulty;
    }
}