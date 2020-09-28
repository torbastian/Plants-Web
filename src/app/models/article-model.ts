import { Model } from './model-interface';

export class ArticleObj implements Model {
    public id: number;
    public plantId: number;
    public approved: string;
    public text: string;
    public tips: string;
}