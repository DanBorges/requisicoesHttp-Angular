import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;

  constructor(public service: UploadFileService) { }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList> event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;


    const filenames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      filenames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = filenames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress(progress => {
            console.log('progress'),
            this.progress = progress;
          }),
          filterResponse()
        )

        .subscribe(response => console.log('Upload Concluído'));

        // .subscribe((event:HttpEvent<Object>) => {
        //   if (event.type == HttpEventType.Response) {

        //   } else if(event.type == HttpEventType.UploadProgress) {
        //     const percentDone = Math.round((event.loaded*100)/event.total);
        //     console.log('progresso:', percentDone);
        //     this.progress = percentDone;
        //   }


        // } );
    }
  }

  onDownloadPdf() {
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe((res: any)=> {
      console.log(res, 'baixou pdf')
      this.service.handleFile(res, 'report.PDF')
    });
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe((res: any)=> {
      console.log(res, 'baixou Excel')
      this.service.handleFile(res, 'report.xlsx')
    });
  }


}
