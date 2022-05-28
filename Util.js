class Util{

	static entradaDato(mensaje){
		return prompt(mensaje)??"";
	}

	static numeroAleatorio(min=0,max){
		return Math.round(Math.random()*(max-min)+min);
	}

}