import { Student } from "./Student";

export class Attendance
{
    public attendanceId: number;
    public student : Student;
    public totalDays: number;
    public presentDays : number;
    public absentDays : number;
    public month : String;
    public year : String; //Check datatype for calender
}