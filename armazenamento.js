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
	function editar(atributo, objManupulado){
		var arrayLocal = recuperarLocalStorage();
		var index = arrayLocal.findIndex(function(objeto){
			return objeto[atributo] === objManupulado[atributo];
		});
		arrayLocal[index] = objManupulado;
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
	function recuperarLocalStorage(){
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
		recuperarLocalStorage,
		armazenarLocalStorage	
	};
}


