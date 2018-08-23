function ArmazenamentoHTTP(){
	function adicionar(objeto){
		var toJSON = JSON.stringify(objeto);
		$.ajax({
			type: "POST",
			url: 'http://matrix.avalie.net/api/participantes/',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: toJSON,
			async: false
		});	
	}	
	function remover(atributo, elemento){
		var toDELETE = obterItem(atributo, elemento);
		$.ajax({
			type: "DELETE",
			url: 'http://matrix.avalie.net/api/participantes/'+toDELETE.id,
			dataType: "json",
			async: true
		});
	}
	function editar(atributo, objManipulado){
		var toJSON = JSON.stringify(objManipulado);
		$.ajax({
			type: "PUT",
			url: 'http://matrix.avalie.net/api/participantes/'+objManipulado.id,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: toJSON,
			async: false
		});  
	}
	function obterItem(atributo, elemento){
		return recuperarDadosDosParticipantes().find(function(objeto){
			return objeto[atributo] === elemento;
		});
	}
	function obterItens(atributo, elemento){
		return recuperarDadosDosParticipantes().filter(function(objeto){
			return objeto[atributo] === elemento;
		});
	}
	function recuperarDadosDosParticipantes(){
		var arrayServer = [];
		$.ajax({
			type: "GET",
			url: 'http://matrix.avalie.net/api/participantes/',
			dataType: "json",
			async: false,
			success: function(data){
				arrayServer = data;
			}
		});
		return arrayServer;
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
