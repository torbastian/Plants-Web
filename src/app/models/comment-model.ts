import { Model } from './model-interface';

export class CommentObj implements Model {
    public id: number;
    public info: string;
    public username: string;
}