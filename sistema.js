function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0
    this.sexo = 0
    this.nota = 0
    this.aprovado = false
}
function SistemaCadastro() {
	const armazenamento = new ArmazenamentoHTTP();
	function adicionarParticipante(nome, sobrenome, email, idade, sexo, nota){
		var p = new Participante();
		p.nome = nome;
		p.sobrenome = sobrenome;
		p.email = email;
		p.idade = idade;
		p.sexo = sexo;
		p.nota = nota;
		p.aprovado = nota >= 70;
		armazenamento.adicionar(p);
	}
	function removerParticipante(email) {
		armazenamento.remover("email",email);
	}
	function editarParticipante(nome, sobrenome, email, idade, sexo, nota){
		var objeto = obterParticipante(email);
		//objeto.id (inalterado)
		objeto.nome = nome;
		objeto.sobrenome = sobrenome;
		/*
		* objeto.email não declarado para assegurar que a primary key (pk)
		* não sofra alteração, mesmo que o usuário consiga o acesso à 
		* modificação pelo formulário HTML, levanto em conta que objeto.email já existe
		* pela chamada da função obterParticipante(email)
		*/
		objeto.idade = idade;
		objeto.sexo = sexo;
		objeto.nota = nota;
		objeto.aprovado = nota >= 70;
		armazenamento.editar(objeto);	
	}
	function buscarParticipantesPorNome(nome){
		return armazenamento.obterItens("nome", nome);
	}  
	function buscarParticipantesPorSexo(sexo){
		return armazenamento.obterItens("sexo", sexo);
	}
	function buscarParticipantesAprovados(){
		return armazenamento.obterItens("aprovado", true);
	}
	function buscarParticipantesReprovados(){
		return armazenamento.obterItens("aprovado", false);
	}
	function obterParticipante(email){
		return armazenamento.obterItem("email", email);
	}
	function obterMediaDasNotasDosParticipantes(){
		return recuperarParticipantes().reduce(function(acumulador,objeto){
			return acumulador + objeto.nota;
		},0) / obterTotalDeParticipantes();
	}
	function obterTotalDeParticipantes(){
		return recuperarParticipantes().length;
	}
	function recuperarParticipantes(){
		return armazenamento.recuperarDadosDoServidor();
	}
	function verificarSeParticipanteEstaAprovado(email){
		return obterParticipante(email).aprovado;
	}
	function obterQuantidadeDeParticipantesPorSexo(sexo){
		return buscarParticipantesPorSexo(sexo).length;
	}
	return {
		adicionarParticipante,
		removerParticipante,
		editarParticipante,
		buscarParticipantesPorNome,
		buscarParticipantesPorSexo,
		buscarParticipantesAprovados,
		buscarParticipantesReprovados,
		obterParticipante,
		obterMediaDasNotasDosParticipantes,
		obterTotalDeParticipantes,
		recuperarParticipantes,
		verificarSeParticipanteEstaAprovado,
		obterQuantidadeDeParticipantesPorSexo    
	};
}
