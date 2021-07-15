import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/', function (req: express.Request, res: express.Response) {
  console.log("Req: GET received - " + req.url);
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  console.log("Req: GET received - " + req.url);
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se � mesmo Aluno!
  console.log("Req: POST received - " + aluno.nome);
  aluno = cadastro.cadastrar(aluno);
  if (aluno) {
    var prepareRes: string = "O aluno " + aluno.nome + " foi cadastrado com sucesso";
    res.send({"success": prepareRes});
  } else {
    console.log(cadastro.getGitHubCadastrado(), ",", cadastro.getCpfCadastrado())
    var prepareRes: string = "O aluno " + aluno.nome + " não pode ser cadastrado. ";
    if (cadastro.getCpfCadastrado() && cadastro.getGitHubCadastrado()) {
      prepareRes = prepareRes + "Errype: 0";
      res.send({"failure": prepareRes});
    } else if (cadastro.getGitHubCadastrado()) {
      prepareRes = prepareRes + "Errype: 1";
      res.send({"failure": prepareRes});
    } else if (cadastro.getCpfCadastrado()){
      prepareRes = prepareRes + "Errype: 2";
      res.send({"failure": prepareRes});
    } else {
      prepareRes = prepareRes + "Errype: 3";
      res.send({"failure": prepareRes});
    }
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  console.log("Req: PUT received - " + aluno);
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    var prepareRes: string = "O aluno " + aluno.nome + " foi atualizado com sucesso";
    res.send({"success": prepareRes});
  } else {
    var prepareRes: string = "O aluno " + aluno.nome + " não pode ser atualizado";
    res.send({"failure": prepareRes});
  }
})

taserver.delete('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  console.log("Req: DELETE received - " + aluno.nome);
  aluno = cadastro.remover(aluno);
  if (aluno) {
    var prepareRes: string = "O aluno " + aluno.nome + " foi removido com sucesso";
    res.send({"success": prepareRes});
  } else {
    var prepareRes: string = "O aluno " + aluno.nome + " não pode ser removido com sucesso";
    res.send({"failure": prepareRes});
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})