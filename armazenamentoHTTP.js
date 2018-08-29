function ArmazenamentoHTTP(){
	function adicionar(objeto){
		return axios.post('http://matrix.avalie.net/api/participantes',objeto)
			.then(function(result){
				return result.data;
			})
			.catch(function(result){
				throw result.response.data.message;
			});
	}
	function remover(id){
		return axios.delete('http://matrix.avalie.net/api/participantes/'+id);	
	}
	function editar(objeto){
		return axios.put('http://matrix.avalie.net/api/participantes/'+objeto.id,objeto);
	}
	function obterItem(id){
		return axios.get('http://matrix.avalie.net/api/participantes/'+id)
			.then(function(result){
				return result.data;
			});
	}
	function obterItens(atributo, elemento){
		return recuperarDadosDosParticipantes().filter(function(objeto){
			return objeto[atributo] === elemento;
		});
	}
	function recuperarDadosDosParticipantes(){
		return axios.get('http://matrix.avalie.net/api/participantes/')
			.then(function(result){
				return result.data;
			});
	}
	return{
		adicionar,
		remover,
		editar,
		obterItem,
		obterItens,
		recuperarDadosDosParticipantes
	};
}
