import { Course } from './course.model';


export class User implements firebase.UserInfo {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    displayName: string;
    courses: UserCourse[];
    phoneNumber: string;
    photoURL: string;
    providerId: string;

    constructor(){
        this.displayName = this.firstName + ' ' + this.lastName;
    }
}

class UserCourse{
    cid: string;
    lastLesson = 0;
    complete = false;
}