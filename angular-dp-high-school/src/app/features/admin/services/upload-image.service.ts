import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/core/model/FileUpload';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private basePath:string='';
  public imageUrl:string

  constructor(private database:AngularFireDatabase, private storage:AngularFireStorage) { }

  pushFileToStorage(file:FileUpload,baseUrl:string):Observable<number>
  {
    //Defining url to upload 
    this.basePath=baseUrl
    const filePath=`${this.basePath}/${file.file.name}`

    //Defining storage ref to call upload 
    const storageRef=this.storage.ref(filePath)
    const uploadTask=this.storage.upload(filePath,file.file)

    //Saving File
    uploadTask.snapshotChanges().pipe(
      finalize(()=>{
        storageRef.getDownloadURL().subscribe(downloadUrl=>{
          file.url=downloadUrl
          this.imageUrl=downloadUrl
          file.name=file.file.name
          this.saveFile(file)
          console.log(file.url);
          if(localStorage.getItem("imageURL")!=null)
          {
            console.log(localStorage.getItem("imageURL")+"removed successfully");
            localStorage.removeItem("imageURL")
          }
          localStorage.setItem("imageURL",file.url);

          console.log(localStorage.getItem("imageURL"))
          
        })
      })
    ).subscribe()
      console.log(uploadTask.percentageChanges());
      
    return uploadTask.percentageChanges();
  }

  //Save file in database
  private saveFile(file:FileUpload)
  {
      this.database.list(this.basePath).push(file)
  }

  deleteFile(file:FileUpload)
  {
    this.deleteFileDatabase(file.key).then(()=>{
      this.deleteFileDatabase(file.file.name)
    }).catch(error=>console.log(error))
  }

  //delete file from database
  private deleteFileDatabase(key:string):Promise<void>
  {
      return this.database.list(this.basePath).remove(key)
  }

  // private deleteFileStorage(name: string): void {
  //   const storageRef = this.storage.ref(this.basePath);
  //   storageRef.child(name).delete();
  // }

  getFiles(numberItems): AngularFireList<FileUpload> {
    return this.database.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  delete(downloadUrl){
    console.log("download url : "+downloadUrl);
    return this.storage.storage.refFromURL(downloadUrl).delete();
    console.log("deleted url : "+downloadUrl);
  }
}
