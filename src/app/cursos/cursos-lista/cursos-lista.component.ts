import { Cursos2Service } from './../cursos2.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { CursosService } from './../cursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../curso';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  // cursos: Curso[];

  // bsModalRef: BsModalRef;
  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', null) deleteModal;

  cursos$: Observable<Curso>;
  error$ = new Subject<boolean>();
  cursoSelecionadao: Curso;

  constructor(
              private service: Cursos2Service,
              private modalService:BsModalService,
              private alertModalService: AlertModalService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.onRefresh();
  }
  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertModalService.showErroDanger('Erro Ao carregar cursos, volte mais tarde');
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(curso) {
    this.cursoSelecionadao = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertModalService.showConfirm('Caonfirmacao', 'Tem Certeza que deseja remover esse curso?')
    result$.
    pipe(
      take(1),
      switchMap(result => result ?  this.service.remove(curso.id): EMPTY )
    ).subscribe(
      success => {
        this.onRefresh()
      },
      error =>  {
        this.alertModalService.showErroDanger('Erro Ao remover curso')
      }
    )
  }


  onConfirmDelete() {
    this.service.remove(this.cursoSelecionadao.id).subscribe(
      success => {
        this.onRefresh(),
        this.deleteModalRef.hide();
      },
      error =>  {
        this.alertModalService.showErroDanger('Erro Ao remover curso'),
        this.deleteModalRef.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
