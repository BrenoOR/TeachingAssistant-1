import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

  @Component({
   selector: 'app-root',
   templateUrl: './alunos.component.html',
   styleUrls: ['./alunos.component.css']
 })
 export class AlunosComponent implements OnInit {
    constructor(private alunoService: AlunoService) {}

    aluno: Aluno = new Aluno();
    alunos: Aluno[];
    cpfduplicado: boolean = false;

     criarAluno(a: Aluno): void {
      if (this.alunoService.criar(a)) {
        this.alunos.push(a);
        this.aluno = new Aluno();
        console.log("Aluno",a.nome, "cadastrado com sucesso!");
      } else {
        console.error("CPF", this.aluno.cpf, "já cadastrado!");
        this.cpfduplicado = true;
      }
    }

     onMove(): void {
       this.cpfduplicado = false;
    }

     ngOnInit(): void {
      this.alunos = this.alunoService.getAlunos();
    }

  }