import { DifficultyLevel } from '../difficulty/difficulty-level';

export class Difficulty {
    id: number;
    name: string;
    difficultyLevel: DifficultyLevel

    constructor(id: number, name: string, difficultyLevel: DifficultyLevel) {
        this.id = id;
        this.name = name;
        this.difficultyLevel = difficultyLevel;
    }
}