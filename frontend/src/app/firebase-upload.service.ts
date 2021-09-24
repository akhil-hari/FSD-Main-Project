import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FirebaseUploadService {

  constructor(private storage: AngularFireStorage) { }
  
  
  uploadFile(event:any):any {
    let fb:any=null;
    const file = event.target.files[0];
    const filePath =String(Date.now());
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {
              fb = url;
            }
            console.log(fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
      return fb
    // this.progress=task.percentageChanges();
    // console.log(':-0')
    // console.log(task.getDownloadURL())
  }
}
