//Objeto Participante
function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0
    this.sexo = 0
    this.nota = 0
    this.aprovado = false
}
/*
 * Representa o sistema
 * Uma vez instanciado, deve-se usar essa mesma
 * instancia em todas as operações.
 */
function SistemaCadastro() {
    //Onde os participantes ficarão armazenados
    var participantes = [];
    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        //implemente o código necessário
		if(procurarEmailNoSistema(email)===-1){
			var p = new Participante();
			p.nome = nome;
			p.sobrenome = sobrenome;
			p.email = email;
			p.idade = idade;
			p.sexo = sexo;

			participantes.push(p);
		}else{
			throw new Error('Já existe um participante com o email: '+email+' dentro da base');	
		}
    }
	function procurarEmailNoSistema(email){
		for(var i=0; i<participantes.length; i++){
			if(participantes[i].email===email){
				return i;
			}
		}
		return -1;
	}
    function removerParticipante(email) {
        //implemente o código necessário
		var index=procurarEmailNoSistema(email);
		if(index>-1){
			participantes.splice(index,1);
		}
    }
    function buscarParticipantesPorNome(nome){
		//implemente o código necessário
		var resultados = [];
		for(var i=0; i<participantes.length; i++){
			if(participantes[i].nome===nome){
				resultados.push(participantes[i]);
			}
		}
		return resultados;
    }  
    function buscarParticipantesPorSexo(sexo){
		//implemente o código necessário
		var resultados=[];
		for(var i=0; i<participantes.length; i++){
			if(participantes[i].sexo===sexo){
				resultados.push(participantes[i]);
			}
		}
		return resultados;
    }
    function buscarParticipantesAprovados(){
        //implemente o código necessário
		var resultados=[];
		for(var i=0; i<participantes.length; i++){
			if(participantes[i].aprovado){
				resultados.push(participantes[i]);
			}
		}
		return resultados;
    }
    function buscarParticipantesReprovados(){
        //implemente o código necessário
		var resultados=[];
		resultados.length;
		for(var i=0; i<participantes.length; i++){
			if(participantes[i].aprovado===false){
				resultados.push(participantes[i]);
			}
		}
		return resultados;
    }
    function obterParticipante(email){
        //implemente o código necessário
		var index=procurarEmailNoSistema(email);
		if(index>-1){
			return participantes[index];
		}
    }
    function adicionarNotaAoParticipante(email, nota){
        //implemente o código necessário
		var index=procurarEmailNoSistema(email);
		if(index>-1){
			participantes[index].nota=nota;
			if(participantes[index].nota>=70){
				participantes[index].aprovado=true;
			}else{
				participantes[index].aprovado=false;
			}
		} 
    }
    function obterMediaDasNotasDosParticipantes(){
        //implemente o código necessário
		var soma=0;
		for(var i=0; i<participantes.length; i++){
			soma+=participantes[i].nota;
		}
		return soma/participantes.length;
    }
    function obterTotalDeParticipantes(){
        return participantes.length;
    }
    function verificarSeParticipanteEstaAprovado(email){
        //implemente o código necessário
		var index=procurarEmailNoSistema(email);
		if(index>-1){ 
			return participantes[index].aprovado===true;
		}
    }
    function obterQuantidadeDeParticipantesPorSexo(sexo){
        //implemente o código necessário
		var resultado=0;
		for(var i=0; i<participantes.length; i++){
			participantes[i].sexo===sexo? resultado++ : resultado;
		}	
		return resultado;
	}
    return {
        adicionarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo    
    };
}
