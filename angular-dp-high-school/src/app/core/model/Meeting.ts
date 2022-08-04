import { Division } from "./Division";
import { Standard } from "./Standard";
import { UserType } from "./UserType";

export class Meeting
{
    public meetingId : number;
    public usertype : UserType;
    public standard : Standard;
    public division : Division;
    public meetingName : String;
    public meetingDate : String;
    public meetingStartTime : String;
    public meetingEndTime : String;
    public meetingDescription : String; 
}