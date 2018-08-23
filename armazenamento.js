function Armazenamento(key){
	if(recuperarDadosDosParticipantes() === null){
		window.localStorage.setItem(key,"[]");
	}
	function adicionar(objeto){
		var arrayLocal = recuperarDadosDosParticipantes();
		arrayLocal.push(objeto);
		armazenarLocalStorage(arrayLocal);	
	}
	function remover(atributo, elemento){
		var arrayLocal = recuperarDadosDosParticipantes();
		arrayLocal.splice(arrayLocal.findIndex(function(objeto){
			return objeto[atributo] === elemento;
		}),1) ;
		armazenarLocalStorage(arrayLocal);
	}
	function editar(atributo, objManipulado){
		var arrayLocal = recuperarDadosDosParticipantes();
		var index = arrayLocal.findIndex(function(objeto){
			return objeto[atributo] === objManipulado[atributo];
		});
		arrayLocal[index] = objManipulado;
		armazenarLocalStorage(arrayLocal);
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
