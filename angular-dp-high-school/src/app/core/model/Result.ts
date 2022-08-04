import { Division } from "./Division";
import { ExamType } from "./ExamType";
import { Standard } from "./Standard";
import { Student } from "./Student";

export class Result
{
    public resultId : number;
    public student : Student;
    public examType : ExamType;
    public year : String;
    public gujarati : number;
    public english : number;
    public environment : number;
    public science : number;
    public socialscience : number;
    public maths : number
    public hindi : number;
    public sanskrit : number;
    public pt : number;
    public drawing : number;
    public pathmala : number;
    public obtainedMarks : number;
    public passingmMarks : number;
    public totalMarks : number;
    public grade : String;
}