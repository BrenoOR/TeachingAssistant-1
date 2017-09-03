import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   aluno: Aluno = {nome: "", cpf: "", email: "", github: ""};
   alunoService = new AlunoService();
   alunos: Aluno[] = [];

   gravar(a: Aluno): void {
     if (this.alunoService.gravar(a)) {
       this.alunos.push(a);
       this.aluno = {nome: "", cpf: "", email: "", github: ""};
       console.log("Aluno:", a.nome, "cadastrado com sucesso!");
     } else {
       console.error("CPF", this.aluno.cpf, "já cadastrado!");
       this.aluno.cpf = "";
       alert("Já existe um aluno com esse CPF");
     }
  }
}
