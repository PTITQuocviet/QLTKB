export class SubjectsModel {
    subjectId: number;
    subjectCode: string;
    subjectName: string;
    groupCode: string;
    credit: number;
    dayInWeek: string;
    startTime: Date;
    endTime: Date;
    room: string;
    fee: number; // học phí
    constructor() {

    }
}