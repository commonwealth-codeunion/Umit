import { Lesson } from './lesson.model';

export class Course{
    cid: string;
    lessons: Lesson[];
    name: string;
    description: string;
}