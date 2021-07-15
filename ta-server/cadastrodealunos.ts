import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];
   cpfCadastrado: boolean = false;
   gitHubCadastrado: boolean = false;

    cadastrar(aluno: Aluno): Aluno {
     var result = null;
     this.cpfCadastrado = false;
     this.gitHubCadastrado = false;

     if (!this.cpfNaoCadastrado(aluno.cpf)) {
      this.cpfCadastrado = true;
     }
     if (!this.githubNaoCadastrado(aluno.github)) {
      this.gitHubCadastrado = true;   
     }
     if (!this.cpfCadastrado) {
       if (!this.gitHubCadastrado) {
        result = new Aluno();
        result.copyFrom(aluno);
        this.alunos.push(result);
       }
     }
     return result;
   }
   
   atualizar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
     if (result) result.copyFrom(aluno);
     return result;
    }

    remover(aluno: Aluno): Aluno {
      var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
      if (result) {
        this.alunos.splice(this.alunos.indexOf(result), 1);
      }
      return result;
    }
    
    cpfNaoCadastrado(cpf: string): boolean {
      return !this.alunos.find(a => a.cpf == cpf);
   }
 
    githubNaoCadastrado(github: string): boolean {
      return !this.alunos.find(a => a.github == github);
   }

    getAlunos(): Aluno[] {
     return this.alunos;
   }

    getCpfCadastrado(): boolean {
      return this.cpfCadastrado;
    }

    getGitHubCadastrado(): boolean {
      return this.gitHubCadastrado;
    }
}