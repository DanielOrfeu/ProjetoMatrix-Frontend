function ArmazenamentoHTTP(){
	recuperarDadosDoServidor();
	function adicionar(objeto){
		var toJSON = JSON.stringify(objeto);
		$.ajax({
			type: "POST",
			url: 'http://matrix.avalie.net/api/participantes/',
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: toJSON,
			async: false,
			success: function(){
				window.alert("Participante: "+objeto.nome+" "+objeto.sobrenome+" adicionado com sucesso");
			},
			error: function(data){
				alert(data.responseText);
				history.go(0);
			}
		});	
	}	
	function remover(atributo, elemento){
		var toDELETE = obterItem(atributo, elemento);
		$.ajax({
			type: "DELETE",
			url: 'http://matrix.avalie.net/api/participantes/'+toDELETE.id,
			dataType: "json",
			async: true,
			success: function() {
				window.alert("Participante: "+toDELETE.nome+" "+toDELETE.sobrenome+" removido com sucesso");
				history.go(0);
			}
		});
	}
	function editar(objManipulado){
		var toJSON = JSON.stringify(objManipulado);
		$.ajax({
			type: "PUT",
			url: 'http://matrix.avalie.net/api/participantes/'+objManipulado.id,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: toJSON,
			async: false,
			success: function(){
				window.alert("Participante N?:"+objManipulado.id+" editado com sucesso");
				history.go(0);
			}
		});  
	}
	function obterItem(atributo, elemento){
		return recuperarDadosDoServidor().find(function(objeto){
			return objeto[atributo] === elemento;
		});
	}
	function obterItens(atributo, elemento){
		return recuperarDadosDoServidor().filter(function(objeto){
			return objeto[atributo] === elemento;
		});
	}
	function recuperarDadosDoServidor(){
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
		recuperarDadosDoServidor
	};
}