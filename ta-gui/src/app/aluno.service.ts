import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Aluno } from '../../../common/aluno';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class AlunoService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private params = new HttpParams();
  private taURL = 'http://192.168.0.105:3000';
  public cpfCadastrado = false;
  public gitHubCadastrado = false;

  constructor(private http: HttpClient) {}

  criar(aluno: Aluno): Observable<Aluno> {
    if (this.cpfCadastrado) {
      this.cpfCadastrado = false;
    } else if (this.gitHubCadastrado) {
      this.gitHubCadastrado = false;
    }
    return this.http.post<any>(this.taURL + "/aluno", aluno, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {
                  console.log(res.success);
                  return aluno;
                } else {
                  console.error(res.failure);
                  if (res.failure == "O aluno não pode ser cadastrado. ErrType: 0") {
                    this.cpfCadastrado = true;
                    this.gitHubCadastrado = true;
                  } else if (res.failure == "O aluno não pode ser cadastrado. ErrType: 1") {
                    this.gitHubCadastrado = true;
                  } else if (res.failure == "O aluno não pode ser cadastrado. ErrType: 2") {
                    this.cpfCadastrado = true;
                  }
                  return null;
                }} )
              ); 
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<any>(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})          
              .pipe( 
                retry(2),
                map( res => {if (res.success) {return aluno;} else {return null;}} )
              ); 
  }

  remover(aluno: Aluno): Observable<Aluno> {
    var body: string = JSON.stringify(aluno);
    return this.http.delete<any>(this.taURL + "/aluno", {headers: this.headers, body, responseType: "json"})
              .pipe(
                retry(2),
                map( res => { if (res.success) {
                  console.log(res.success)
                  return aluno;
                } else {
                  return null;
                }} )
              );
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.taURL + "/alunos")
              .pipe(
                 retry(2)
               );
  }

}