import { environment } from 'src/environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { UploadFileService } from './upload-file.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

  files: Set<File>;
  progress = 0;
  upload$: Subscription;

  constructor(private service: UploadFileService) { }

  ngOnDestroy() {
    this.upload$.unsubscribe();
  }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);

    const selectedFiles = event.srcElement.files as FileList;
    const fileNames = [];
    this.files = new Set();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectedFiles.length; i ++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.upload$ = this.service.upload(this.files, `${environment.BASE_URL}/upload`).subscribe(
        (event: HttpEvent<any>) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload Concluído!');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso', percentDone);
            this.progress = percentDone;
          }
        }
      );
    }
  }

}
