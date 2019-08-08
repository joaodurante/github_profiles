export default class DefaultError extends Error{
    status: number;
    message: string;
    stack: string;

    constructor(status: number, message: string, stack:string){
        super(message);
        this.status = status;
        this.message = message;
        this.stack = stack;
    }
}