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
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se � mesmo Aluno!
  aluno = cadastro.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    console.log(cadastro.getGitHubCadastrado(), ",", cadastro.getCpfCadastrado())
    if (cadastro.getCpfCadastrado() && cadastro.getGitHubCadastrado()) {
      res.send({"failure": "O aluno não pode ser cadastrado. ErrType: 0"});
    } else if (cadastro.getGitHubCadastrado()) {
      res.send({"failure": "O aluno não pode ser cadastrado. ErrType: 1"});
    } else if (cadastro.getCpfCadastrado()){
      res.send({"failure": "O aluno não pode ser cadastrado. ErrType: 2"});
    } else {
      res.send({"failure": "O aluno não pode ser cadastrado. ErrType: 3"});
    }
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

taserver.delete('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.remover(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi removido com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser removido"});
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})