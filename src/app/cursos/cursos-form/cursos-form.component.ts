import { Cursos2Service } from './../cursos2.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

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
              private cursosService: Cursos2Service,
              private alertModalService: AlertModalService,
              private location: Location,
              private route: ActivatedRoute
            ) { }

  ngOnInit() {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const curso$ = this.cursosService.loadByID(id);
    //     curso$.subscribe(curso$ => {
    //       this.updateForm(curso$);
    //     })
    //   }
    // )

    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id => this.cursosService.loadByID(id))
    // ).subscribe(
    //   (curso => this.updateForm(curso))
    // )

    const curso =this.route.snapshot.data['curso'];


    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    })
  }

  // updateForm(curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  onSubmit() {

    let msgSucesso = 'Curso criado com sucesso!.';
    let msgErro = 'Erro ao criar cursos, tente novamente mais tarde.';
    if (this.form.value.id) {
      msgSucesso = 'Curso atualizado com sucesso!.';
      msgErro = 'Erro ao editar cursos, tente novamente mais tarde.';
    }
    this.cursosService.save(this.form.value).subscribe(
      success => {
        this.location.back();
        this.alertModalService.showErroSuccess(msgSucesso);
      },
      error => this.alertModalService.showErroDanger(msgErro),
    )



    // console.log(this.form.value);
    // this.subbimited = true;
    // if (this.form.valid) {
    //   console.log('Enviou');
    //   if (this.form.value.id) {
    //     //update
    //     this.cursosService.update(this.form.value).subscribe(
    //       success => {
    //         this.location.back();
    //         this.alertModalService.showErroSuccess('Curso atualizado com sucesso!.')
    //       },
    //       error => this.alertModalService.showErroDanger('Erro ao atualizar cursos, tente novamente mais tarde.'),
    //       () => console.log('Update completo OK')
    //     )
    //   }else {

    //     this.cursosService.create(this.form.value).subscribe(
    //       success => {
    //         this.location.back();
    //         this.alertModalService.showErroSuccess('Curso criado com sucesso!.')
    //       },
    //       error => this.alertModalService.showErroDanger('Erro ao criar cursos, tente novamente mais tarde.'),
    //       () => console.log('request OK')
    //     );
    //   }
    // }
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
