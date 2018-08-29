var sistema = new SistemaCadastro(),
idObjeto = -1,
radioString = "",
modoEditor = false,
aprovadoString = "";
(function primeiroLoad(){
	alterarTabela();
})();
function verificarFormVazio(){
	if(
		document.getElementById("nomeInput").value !== "" && 
		document.getElementById("sobrenomeInput").value !== "" && 
		document.getElementById("emailInput").value !== "" && 
		document.getElementById("idadeInput").value !== "" && 
		document.getElementById("notaInput").value !== ""
	 )
		document.getElementById("botaoCadastrar").disabled = false;
	else
		document.getElementById("botaoCadastrar").disabled = true;
}
function checarSexo(){
	return document.getElementById("sexomInput").checked ? 1 : 2;
}
function alterarTabela(){
	sistema.recuperarParticipantes()
		.then(function(participantes){
			participantes.forEach(function(objeto, index){
				objeto.sexo === 1 ? radioString = "Masculino" : radioString = "Feminino";
				objeto.aprovado ? aprovadoString = "Sim" : aprovadoString = "Não";
				document.getElementById("bodyCadastros").innerHTML += '<tr><td>'+objeto.id+'</td><td>'+objeto.nome+' '+objeto.sobrenome+'</td><td>'+objeto.idade+'</td><td>'+radioString+'</td><td>'+objeto.nota+'</td><td>'+aprovadoString+'</td><td>'+'<a href="javascript:void(0)" onclick="clickEditar(\''+objeto.id+'\')">Editar</a>'+' '+'<a href="javascript:void(0)" onclick="clickExcluir(\''+objeto.id+'\')">Excluir</a>'+'</td></tr>';

			});
		});
};
function salvarParticipante(){
	if(modoEditor){
		sistema.editarParticipante(
			idObjeto,
			document.getElementById("nomeInput").value,
			document.getElementById("sobrenomeInput").value,
			document.getElementById("emailInput").value,
			document.getElementById("idadeInput").value,
			checarSexo(),
			document.getElementById("notaInput").value
		)
			.then(function(){
				window.alert("Participante editado com sucesso!");
				window.location.reload(true);
			});	
	}else{
		sistema.adicionarParticipante(
			document.getElementById("nomeInput").value,
			document.getElementById("sobrenomeInput").value,
			document.getElementById("emailInput").value,
			document.getElementById("idadeInput").value,			
			checarSexo(),
			document.getElementById("notaInput").value
		)
			.then(function(){
				window.alert("Participante adicionado com sucesso!");
				window.location.reload(true);
			})
			.catch(function(result){
				window.alert(result);
				window.location.reload(true);
			});
	}
	modoEditor = false;
	document.getElementById("emailInput").disabled = false;
	idObjeto = -1;
}
function clickEditar(id){
	idObjeto = id;
	modoEditor = true;
	sistema.obterParticipante(id)
		.then(function(participante){
			document.getElementById("nomeInput").value = participante.nome;
			document.getElementById("sobrenomeInput").value = participante.sobrenome;
			document.getElementById("emailInput").value = participante.email;
			document.getElementById("emailInput").disabled = true;
			document.getElementById("idadeInput").value = participante.idade;
			document.getElementById("notaInput").value = participante.nota;
			participante.sexo === 1 ? document.getElementById("sexomInput").checked = true : document.getElementById("sexofInput").checked = true;
			verificarFormVazio();	
		});
};
function clickExcluir(id){
	sistema.removerParticipante(id)
		.then(function(){
			window.alert("Participante excluído com sucesso!");
			window.location.reload(true);
		});

};
