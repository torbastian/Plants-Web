import { Model } from './model-interface';

export class PlantObj implements Model {
    public id: number;
    public info: string;
    public type: string;
    public climate: string;
    public edible: string;
    public username: string;
    public approved: string;
    public image: string;
}