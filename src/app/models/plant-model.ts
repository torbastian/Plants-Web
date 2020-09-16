import { Model } from './model-interface';

export class PlantObj implements Model {
    id: number;
    info: string;
    type: string;
    climate: string;
    edible: string;
    username: string;
    approved: string;
    image: string;

    constructor() {}
}