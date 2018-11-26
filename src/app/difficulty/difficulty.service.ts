import { Injectable } from '@angular/core';
import { Difficulty } from './difficulty';
import { DifficultyLevel } from './difficulty-level';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  constructor() { }

  getDifficulties(): Difficulty[] {
    let difficulties: Difficulty[] = [];
    difficulties.push(new Difficulty(0, 'Facile', DifficultyLevel.Easy));
    difficulties.push(new Difficulty(1, 'Moyen', DifficultyLevel.Medium));
    difficulties.push(new Difficulty(2, 'Difficile', DifficultyLevel.Hard));
    difficulties.push(new Difficulty(3, 'Très difficile', DifficultyLevel.VeryHard));
    difficulties.push(new Difficulty(4, 'Apprentissage automatique', DifficultyLevel.MachingLearning));
    return difficulties;
  }
}
