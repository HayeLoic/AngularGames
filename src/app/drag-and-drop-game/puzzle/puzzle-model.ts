export class PuzzleModel {
    id: number;
    name: string;
    imageLocation: string;
    width: number;
    height: number;
    portionCountX: number;
    portionCountY: number;

    constructor(id: number, name: string, imageLocation: string, width: number, height: number, portionCountX: number, portionCountY: number) {
        this.id = id;
        this.name = name;
        this.imageLocation = imageLocation;
        this.width = width;
        this.height = height;
        this.portionCountX = portionCountX;
        this.portionCountY = portionCountY;
    }
}