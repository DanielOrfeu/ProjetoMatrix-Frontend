function Armazenamento(key){
	if(recuperarLocalStorage() === null){
		window.localStorage.setItem(key,"[]");
	}
	function adicionar(objeto){
		var arrayLocal = recuperarLocalStorage();
		arrayLocal.push(objeto);
		armazenarLocalStorage(arrayLocal);	
	}
	function remover(atributo, elemento){
		var arrayLocal = recuperarLocalStorage();
		arrayLocal.splice(arrayLocal.findIndex(function(objeto){
			return objeto[atributo] === elemento;
		}),1) ;
		armazenarLocalStorage(arrayLocal);
	}
	function editar(atributo, objManipulado){
		var arrayLocal = recuperarLocalStorage();
		var index = arrayLocal.findIndex(function(objeto){
			return objeto[atributo] === objManipulado[atributo];
		});
		arrayLocal[index] = objManipulado;
		armazenarLocalStorage(arrayLocal);
	}
	function obterItem(atributo, elemento){
		return recuperarLocalStorage().find(function(objeto){
			return objeto[atributo] === elemento;
		});
	}
	function obterItens(atributo, elemento){
		return recuperarLocalStorage().filter(function(objeto){
			return objeto[atributo] === elemento;
		});
	}
	function recuperarDadosDosParticipantes(){
		return JSON.parse(window.localStorage.getItem(key));
	}
	function armazenarLocalStorage(arrayModificado){
		window.localStorage.setItem(key,JSON.stringify(arrayModificado));
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
