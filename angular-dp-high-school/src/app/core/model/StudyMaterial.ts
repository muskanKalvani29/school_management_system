import { Standard } from "./Standard";
import { StudyMaterialType } from "./StudyMaterialType";

export class StudyMaterial
{
    public studymaterialId : number;
    public standard : Standard;
    public studyMaterialType : StudyMaterialType;
    public description : String;
    public studymaterialFile : String;
    public uploadDate: String;
}