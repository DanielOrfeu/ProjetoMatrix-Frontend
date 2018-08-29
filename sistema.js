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
	function adicionarParticipante(nome, sobrenome, email, idade, sexo, nota) {
		
		var p = new Participante();
		p.nome = nome;
		p.sobrenome = sobrenome;
		p.email = email;
		p.idade = idade;
		p.sexo = sexo;
		p.nota = nota;
		p.aprovado = p.nota >= 70
		
		
		return armazenamento.adicionar(p);
	}
	function removerParticipante(id) {
		return armazenamento.remover(id);
	}
	function editarParticipante(id, nome, sobrenome, email, idade, sexo, nota){
		return obterParticipante(id)
			.then(function(objeto){
				objeto.nome = nome;
				objeto.sobrenome = sobrenome;
				/*
				* objeto.email e objeto.id não declarados para assegurar que as primary key (pk)
				* não sofram alterações, mesmo que o usuário consiga o acesso à 
				* modificação pelo formulário HTML.
				*/
				objeto.idade = idade;
				objeto.sexo = sexo;
				objeto.nota = nota;
				objeto.aprovado = objeto.nota >= 70
				return armazenamento.editar(objeto);
			});
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
	function obterParticipante(id){
		return armazenamento.obterItem(id);
	}
	function obterMediaDasNotasDosParticipantes(){
		return recuperarParticipantes().reduce(function(acumulador,objeto){
			return acumulador + objeto.nota;
		},0) / obterTotalDeParticipantes();
	}
	function obterTotalDeParticipantes(){
	return armazenamento.recuperarDadosDosParticipantes().length;
	}
	function recuperarParticipantes(){
		return armazenamento.recuperarDadosDosParticipantes();
	}
	function verificarSeParticipanteEstaAprovado(id){
		return obterParticipante(id).aprovado;
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
