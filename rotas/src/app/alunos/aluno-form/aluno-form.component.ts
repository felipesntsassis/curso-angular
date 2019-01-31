import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy {

  aluno: any;
  inscricao: Subscription;

  constructor(private route: ActivatedRoute,
    private alunosService: AlunosService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params:  any) => {
        const id = params['id'];
        this.aluno = this.alunosService.getAluno(Number(id));
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
