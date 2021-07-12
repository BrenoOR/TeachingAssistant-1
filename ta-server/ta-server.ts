import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var taserver = express();

var alunos: CadastroDeAlunos = new CadastroDeAlunos();

var msgType;

taserver.use(bodyParser.json());

taserver.get('', function (req, res){
  var aluno: string = JSON.stringify(alunos.getAlunos());
  msgType = "getAlunos";
  res.send(aluno);
  console.log(msgType, "message sent...");
})

taserver.get('/alunos', function (req, res) {
  var aluno: string = JSON.stringify(alunos.getAlunos());
  msgType = "getAlunos";
  res.send(aluno);
  console.log(msgType, "message sent...");
})

taserver.get('/aluno', function (req, res) {
  var aluno: Aluno = <Aluno> req.body;
  if (!alunos.cpfNaoCadastrado(aluno.cpf)) {
    var resp: string = JSON.stringify(aluno);
    res.send(resp);
  } else {
    res.send({"failure": "Aluno não encontrado"});
  }
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  msgType = "createAluno";
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = alunos.criar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
    console.log(msgType, "success message sent...");
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
    console.error(msgType, "failure message send...");
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  msgType = "updateAluno";
  var aluno: Aluno = <Aluno> req.body;
  aluno = alunos.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
    console.log(msgType, "success message sent...");
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
    console.error(msgType, "failure message send...");
  }
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})