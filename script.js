var horas="00";
var minutos = "00";
var segundos = "00";
var timerID = 0;
var totaltime=0;
var horaInicio=0;

var timerHoras = document.getElementById("timerHoras")
var timerMinutos = document.getElementById("timerMinutos")
var timerSegundos = document.getElementById("timerSegundos")
var music = document.getElementById('music')






function addHour(){
	var h = parseFloat(timerHoras.value);
	var h1 = h + 1;
	timerHoras.value = h1;
}

function addMinute(){
	var h = parseFloat(timerMinutos.value);
	var h1 = 59;
	if (h<59){
		h1 = h + 1;
	}
	timerMinutos.value = h1;
}

function addSecond(){
	var h = parseFloat(timerSegundos.value);
	var h1 = 59;
	if (h<59){
		h1 = h + 1;
	}
	timerSegundos.value = h1;
}

function subHour(){
	var h = parseFloat(timerHoras.value);
	var h1 = h - 1;
	if (h1<0){
		h1 = h;
	}
	timerHoras.value = h1;
}

function subMinute(){
	var h = parseFloat(timerMinutos.value);
	var h1 = h - 1;
	if (h1<0){
		h1 = h;
	}
	timerMinutos.value = h1;
}

function subSecond(){
	var h = parseFloat(timerSegundos.value);
	var h1 = h - 1;
	if (h1<0){
		h1 = h;
	}
	timerSegundos.value = h1;
}

function timer()
{	
    var timetemp = new Date()-horaInicio;
	timetemp = (totaltime-timetemp)/1000+1;
	
	if (timetemp<=0)
	{
		
		music.play()	
				
		timerHoras.disabled = false;
		timerMinutos.disabled = false;
		timerSegundos.disabled = false;	
		timerStop()
		return
	
	}
	
	var horas = Math.floor(timetemp/3600);
	var minutos = Math.floor((timetemp - 3600 * horas)/60);
	var segundos = Math.floor(timetemp - 3600 * horas - 60 * minutos);
			
	if (segundos < 10) {
		segundos = "0" + segundos;
	}
		
	if (minutos < 10) {
		minutos = "0" + minutos;
	}
		
	if (horas < 10) {
		horas = "0" + horas;
	}
		
	timerHoras.value = horas;
	timerMinutos.value = minutos;
	timerSegundos.value = segundos;
    timerID = setTimeout("timer()", 10)

} 
function timerStart(){
	horas = timerHoras.value;
	minutos = timerMinutos.value;
	segundos = timerSegundos.value;
	
	if ((horas==0)&&(minutos==0)&&(segundos==0))
	{
		alert("Você deve escolher um horário maior que 00:00:00");
		return
	}
	
	if((isNaN(horas) == true)||(isNaN(minutos) == true)||(isNaN(segundos) == true))
	{
		alert("Letras não são permitidas, apenas números.");
		return;
	}
	
	if (horas<0)
	{
		alert("O numero não pode ser menor que 0");
		timerMinutos.value="59";
		return;
	}
	
	if ((minutos>59)||(minutos<0))
	{
		alert("Você não pode usar um número negativo ou maior que 59 para minutos.");
		timerMinutos.value="59";
		return;
	}
	
	if ((segundos>59)||(segundos<0))
	{
		alert("Você não pode usar um número negativo ou maior que 59 para segundos.");
		timerSegundos.value="59";
		return;
	}
	
	document.timergo.startstop.value = "Stop";
	document.timergo.startstop.onclick = timerStop;
	document.timergo.reset.onclick = timerReset;
	timerHoras.disabled = "disabled";
	timerMinutos.disabled = "disabled";
	timerSegundos.disabled = "disabled";
	totaltime = (parseInt(timerHoras.value * 3600 + timerMinutos.value * 60 +  timerSegundos.value * 1))*1000;
	horaInicio = Date.now();
	timer();
}

function timerStop(){
	document.timergo.startstop.value = "Iniciar";
	document.timergo.startstop.onclick = timerContinue;
	document.timergo.reset.onclick = timerReset;
	document.timergo.reset.value = "Novo";
	clearTimeout(timerID);
	
}

function timerContinue(){
	document.timergo.startstop.value = "Stop";
	document.timergo.startstop.onclick = timerStop;
	document.timergo.reset.onclick = timerReset;
	totaltime = (parseInt(timerHoras.value * 3600 + timerMinutos.value * 60 +  timerSegundos.value * 1))*1000;
	horaInicio = Date.now();
	timer();
}
function timerReset(){
	timerHoras.disabled = false;
	timerMinutos.disabled = false;
	timerSegundos.disabled = false;
	timerHoras.value = "00";
	timerMinutos.value = "00";
	timerSegundos.value = "00";
	document.timergo.startstop.value = "Iniciar";
	document.timergo.startstop.onclick = timerStart;
	clearTimeout(timerID);
}



document.onkeydown = teclado
function teclado(e){
	if(e.keyCode == 73){
		timerStart()
	}
	if(e.keyCode== 80){
		timerStop()
	}
}