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
		if(obterParticipante(email) === undefined){
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
    function removerParticipante(email) {
        //implemente o código necessário
		participantes.splice(participantes.findIndex(function(objeto){
			return objeto.email === email;
		}),1) ;
    }
    function buscarParticipantesPorNome(nome){
		//implemente o código necessário
		return participantes.filter(function(objeto){
			return objeto.nome === nome;
		});
    }  
    function buscarParticipantesPorSexo(sexo){
		//implemente o código necessário
		return participantes.filter(function(objeto){
			return objeto.sexo === sexo;
		});
    }
    function buscarParticipantesAprovados(){
		//implemente o código necessário
		return participantes.filter(function(objeto){
			return objeto.aprovado;
		});
    }
    function buscarParticipantesReprovados(){
		//implemente o código necessário
		return participantes.filter(function(objeto){
			return !(objeto.aprovado);
		});
    }
    function obterParticipante(email){
        //implemente o código necessário
		return participantes.find(function(objeto){
			return objeto.email === email;
		});
    }
    function adicionarNotaAoParticipante(email, nota){
        //implemente o código necessário
		var index = participantes.findIndex(function(objeto){
			return objeto.email === email;
		});
		participantes[index].nota = nota;
		if(participantes[index].nota >= 70){
			participantes[index].aprovado = true;
		}else{
			participantes[index].aprovado = false;
		} 
    }
    function obterMediaDasNotasDosParticipantes(){
        //implemente o código necessário
		var soma = participantes.reduce(function(acumulador,objeto){
			return acumulador + objeto.nota;
			
		},0);
		return soma/participantes.length;
    }
    function obterTotalDeParticipantes(){
        return participantes.length;
    }
    function verificarSeParticipanteEstaAprovado(email){
        //implemente o código necessário
		return obterParticipante(email).aprovado;
    }
    function obterQuantidadeDeParticipantesPorSexo(sexo){
        //implemente o código necessário
		var contador = 0;
		participantes.forEach(function(objeto){
			if(objeto.sexo === sexo){
				contador++;
			}
		});
		return contador;
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
