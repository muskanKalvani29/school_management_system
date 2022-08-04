import { Student } from "./Student";


export class FeePayment
{
    public paymentId : number;
    public student : Student;
    public paymentMode : String;
    public feesAmount : number;
    // public latefeesAmount : number;
    // public totalfeesAmount : number;
    // public feeStatus : String;
    public paymentDate : String;
    public installmentNo : number;
}