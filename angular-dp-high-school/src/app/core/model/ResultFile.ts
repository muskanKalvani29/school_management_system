import { Division } from "./Division";
import { ExamType } from "./ExamType";
import { Standard } from "./Standard";

export class ResultFile
{
    public resultFileId : number;
    public division : Division;
    public standard : Standard;
    public examType : ExamType;
    public description : String;
    public resultFile : String;
    public uploadDate: String;
}