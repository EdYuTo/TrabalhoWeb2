/*Script que da funcionalidade a tela de Login*/
$(document).ready(function(){
	$("#bt").click(function(){
		$(".main").load("accountScreen.html");
		
		$("#loginScreen").text("Conta");

		$("#loginScreen").click(function(){
			$(".main").load("accountScreen.html");
		});
	});
});