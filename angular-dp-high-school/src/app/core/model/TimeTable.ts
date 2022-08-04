import { Division } from "./Division";
import { Standard } from "./Standard";
import { UserType } from "./UserType";

export class TimeTable
{
    public timetableId : number;
    public standard : Standard;
    public name : String;
    // public teacher : teacher | undefined;
    // public usertype : UserType | undefined;
    public division : Division;
    public timetableFile : String;
    public uploadDate: String;
}