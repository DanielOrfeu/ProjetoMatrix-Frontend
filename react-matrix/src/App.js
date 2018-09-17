import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    participantes: [],
    editor: false
  }
  
  p = {
    nome: null,
    sobrenome: null,
    email: null,
    idade: null,
    sexo: null,
    nota: null,
    aprovado: null
  }

  render() {
    return (
      <div className="container">
        {this.gerarform()}
        {this.gerarTabela()}
      </div>
    );
  }

  componentDidMount() {
    axios.get('http://matrix.avalie.net/api/participantes/')
      .then(result => {
        const participantes = result.data;
        this.setState({ participantes });
      })
  }

  requestPOST(objeto) {
    axios.post('http://matrix.avalie.net/api/participantes', objeto)
      .then(result => {
        alert("Participante " + objeto.nome + " " + objeto.sobrenome + " adicionado!");
      })
      .catch(result => {
        alert(result.response.data.message);
      })
      .then(function () {
        window.location.reload(true);
      });
  }

  requestPUT(objeto) {
    axios.put('http://matrix.avalie.net/api/participantes/' + objeto.id, objeto)
      .then(result => {
        alert("Participante " + objeto.nome + " " + objeto.sobrenome + " editado!");
      })
      .then(function () {
        window.location.reload(true);
      });
  }

  requestDELETE(id) {
    axios.delete('http://matrix.avalie.net/api/participantes/' + id)
      .then(function () {
        alert("Participante Nº " + id + " excluído");
      })
      .then(function () {
        window.location.reload(true);
      });
  }

  requestGET(id) {
    return axios.get('http://matrix.avalie.net/api/participantes/' + id)
      .then(result => {
        return (result.data);
      });
  }

  setNome(event) {
    this.p.nome = event.target.value;
    this.verificarFormVazio();
  }

  setSobrenome(event) {
    this.p.sobrenome = event.target.value;
    this.verificarFormVazio();
  }

  setEmail(event) {
    this.p.email = event.target.value;
    this.verificarFormVazio();
  }

  setIdade(event) {
    this.p.idade = event.target.value;
    this.verificarFormVazio();
  }

  setNota(event) {
    this.p.nota = event.target.value;
    this.p.aprovado = event.target.value >= 70;
    this.verificarFormVazio();
  }

  setSexo(event) {
    this.p.sexo = event.target.value;
    this.verificarFormVazio();
  }

  gerarform() {
    return (
      <div className="col-sm">
        <h5>Cadastro de participante</h5>
        <form id="formularioParticipantes" className="needs-validation was-validated" noValidate="" onSubmit={event => this.clickSalvar(event)}>
          <div className="form-group">
            <label htmlFor="formGroupNomeInput">Nome:</label>
            <input type="text" className="form-control" id="nomeInput" placeholder="Exemplo: Daniel" required="" value={this.state.nome} onInput={event => { this.setNome(event); }} ref="nomeInput" />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupSobrenomeInput">Sobrenome: </label>
            <input type="text" className="form-control" id="sobrenomeInput" placeholder="Exemplo: Orfeu" required="" value={this.state.sobrenome} onInput={event => { this.setSobrenome(event); }} ref="sobrenomeInput" />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupEmailInput ">E-mail:</label>
            <input type="email" className="form-control" id="emailInput" placeholder="Exemplo: dorfeu@matrix.com" required="" value={this.state.email} onInput={event => { this.setEmail(event); }} ref="emailInput" />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupIdadeInput">Idade</label>
            <input type="number" className="form-control" id="idadeInput" placeholder="Exemplo: 21" required="" value={this.state.idade} onInput={event => { this.setIdade(event); }} ref="idadeInput" />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupNotaInput">Nota:</label>
            <input type="number" className="form-control" id="notaInput" placeholder="Exemplo: 90" required="" value={this.state.nota} onInput={event => { this.setNota(event); }} ref="notaInput" />
          </div>
          <div className="form-group" >
            <label htmlFor="formGroupSexoInput">Sexo:</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name=" " id="sexomInput" value="1" onInput={event => { this.setSexo(event); }} ref="sexomInput" />
              <label className="form-check-label" htmlFor="inlineRadio1">Masculino</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name=" " id="sexofInput" value="2" onInput={event => { this.setSexo(event); }} ref="sexofInput" />
              <label className="form-check-label" htmlFor="inlineRadio2">Feminino</label>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-danger" id="botaoSalvar" ref="botaoSalvar" disabled>Salvar</button>
          </div>
        </form>
      </div>
    );
  }

  gerarTabela() {
    return (
      <div className="col-sm">
        <h5><p>Participantes Cadastrados</p></h5>
        <table className="table table-bordered" id="tabelaCadastrados">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome Completo</th>
              <th scope="col">Idade</th>
              <th scope="col">Sexo</th>
              <th scope="col">Nota</th>
              <th scope="col">Aprovado?</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          {this.popularTabela()}
        </table>
      </div>
    );
  }

  popularTabela() {
    return (
      <tbody id="bodyCadastros">
        {this.state.participantes.map(objeto => {
          var radioString = objeto.sexo === 1 ? "Masculino" : "Feminino";
          var aprovadoString = objeto.aprovado ? "Sim" : "Não";
          return (
            <tr>
              <td>{objeto.id}</td>
              <td>{objeto.nome} {objeto.sobrenome}</td>
              <td>{objeto.idade}</td>
              <td>{radioString}</td>
              <td>{objeto.nota}</td>
              <td>{aprovadoString}</td>
              <td>
                <a href="javascript:void(0)" onClick={event => { this.clickEditar(objeto.id); }}>Editar</a> <a href="javascript:void(0)" onClick={event => { this.clickExcluir(objeto.id); }}>Excluir</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  verificarFormVazio() {
    if (
      !this.p.nome ||
      !this.p.sobrenome ||
      !this.p.email ||
      !this.p.idade ||
      !this.p.nota ||
      !this.p.sexo
    )
      this.refs.botaoSalvar.disabled = true;
    else
      this.refs.botaoSalvar.disabled = false;
  }

  clickSalvar(event) {
    event.preventDefault();
    if (this.state.editor)
      this.requestPUT(this.p);
    else
      this.requestPOST(this.p)
  }

  clickEditar(id) {
    this.requestGET(id)
      .then(objeto => {
        this.state.editor = true;
        this.p = objeto;
        this.refs.nomeInput.value = objeto.nome;
        this.refs.sobrenomeInput.value = objeto.sobrenome;
        this.refs.emailInput.value = objeto.email;
        this.refs.emailInput.disabled = true;
        this.refs.idadeInput.value = objeto.idade;
        this.refs.notaInput.value = objeto.nota;
        objeto.sexo === 1 ? this.refs.sexomInput.checked = true : this.refs.sexofInput.checked = true;
        this.verificarFormVazio();
      });
  }

  clickExcluir(id) {
    this.requestDELETE(id);
  }
}

export default App;