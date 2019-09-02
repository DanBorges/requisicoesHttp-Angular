import { AlertModalService } from './../../shared/alert-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  subbimited = false;

  constructor(
              private fb: FormBuilder,
              private cursosService: CursosService,
              private alertModalService: AlertModalService,
              private location: Location
            ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    })
  }

  onSubmit() {
    console.log(this.form.value);
    this.subbimited = true;
    if (this.form.valid) {
      console.log('Enviou');
      this.cursosService.create(this.form.value).subscribe(
        success => {
          this.location.back();
          this.alertModalService.showErroSuccess('Curso criado com sucesso!.')
        },
        error => this.alertModalService.showErroDanger('Erro ao criar cursos, tente novamente mais tarde.'),
        () => console.log('request OK')
      );
    }
  }

  onCancel() {
    this.subbimited = false;
    this.form.reset();
    console.log('onCancel');
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

}
