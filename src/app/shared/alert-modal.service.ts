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

  private showAlert(message: string, type: string) {
    const bsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  showErroDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showErroSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS);
  }


}
