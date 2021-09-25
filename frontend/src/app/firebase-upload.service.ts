import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from "rxjs/operators";
import { Observable,Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FirebaseUploadService {

  constructor(private storage: AngularFireStorage) { }
  uploadUrlAvailable:Subject<any>=new Subject<any>();
  
  
  uploadFile(event:any):any {
    let fb:any=null;
    const file = event.target.files[0];
    const filePath =String(Date.now());
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
      
      return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              fb = url;
              this.uploadUrlAvailable.next(fb);
             
            }
            console.log(fb);
          });
        })
      ).subscribe((url:any) => {
        if (url) {
          console.log('firebase:'+url);
          console.log('upload complete')
          
        }
      });
      
    // this.progress=task.percentageChanges();
    // console.log(':-0')
    // console.log(task.getDownloadURL())
  }
  deleteFile(url:string){
    if(url!='')return this.storage.storage.refFromURL(url).delete();
    return null;
    

        
  }
}
