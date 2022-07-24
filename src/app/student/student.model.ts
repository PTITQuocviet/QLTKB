import { SubjectsModel } from "../shared/model/subjects.model";

export class StudentModel {
    subjects: SubjectsModel[];
    listTeacher: ListTeacherModel[];
    constructor() {

    }
}

export class ListTeacherModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number
    constructor() {

    }
}

export class PointModel {
    diligence: number;
    middlePoint: number;
    finalPoint: number;
    subjectCode: number;
    subjectName: number;
    constructor() {

    }
}