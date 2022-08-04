import { Standard } from "./Standard";
import { Subject } from "./Subject";
import { TimeTable } from "./TimeTable";
import { User } from "./User";

export class Teacher
{
    public teacherId : number;
    public standard : Standard[];
    public subject : Subject[];
    public user : User;
    public gender : String;
    public joiningDate : String;
    public qualification : String;
    public address1 : String;
    public address2 : String;
    public pincode : number;
    public image : String;
}