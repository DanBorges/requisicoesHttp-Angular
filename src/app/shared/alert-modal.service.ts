import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

enum AlertTypes {
  SUCCESS = 'success',
  DANGER = 'danger'
}

@Injectable({
  providedIn: 'root'
})

export class AlertModalService {


  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: string, dismissTimeout?: number) {
    const bsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showErroDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER, 3000);
  }

  showErroSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }


}
