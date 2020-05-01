export class Lesson{
    subject: string;
    blocks: Block[];
}

class Block{
    name: string;
    type: string;
    comment: string;
}