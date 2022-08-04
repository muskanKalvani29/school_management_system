import { Activity } from "./Activity";
import { Division } from "./Division";
import { FeePayment } from "./FeePayment";
import { Standard } from "./Standard";

export class Student 
{
    public grNo : number;
    public standard : Standard;
    public activity : Activity[];
    // public feePayment: FeePayment[];
    public division : Division;
    public firstName : String;
    public middleName : String;
    public lastName : String;
    public motherName : String;
    public fatherName : String;
    public rollNo : number;
    public admissionDate : string;
    public stream : String;
    public medium : String;
    public gender : String;
    public dateOfBirth : String;
    public bloodGroup : String;
    public address1 : String;
    public address2 : String;
    public pincode : number;
    public previousSchoolName : String;
    public feeStatus : String;
    public emailId : String;
    public image : String;
}
