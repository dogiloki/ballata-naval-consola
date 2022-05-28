class Main{

	constructor(){
		this.dimencionar();
		this.iniciarJuego();
	}

	dimencionar(){
		this.filas=prompt("Ingrese la cantidad de filas");
		this.columnas=prompt("Ingrese la cantidad de columnas");
		if(this.filas<Diccionario.total_barcos || this.columnas<Diccionario.total_barcos){
			alert(`Las filas o columnas deben ser mayores o iguales a ${Diccionario.total_barcos}`);
			this.dimencionar();
		}
	}


	iniciarJuego(){
		this.tableros=[new Tablero(this.filas,this.columnas),new Tablero(this.filas,this.columnas)];
		this.turnoInicial();
		this.tableros[0].vaciar();
		this.tableros[1].vaciar();
		this.posicionarBarcos();
		this.cambiarTurno();
		this.posicionarBarcos();
		this.turnoInicial();
		alert("juagr");
	}

	obtenerCoordenada(titulo){
		let posicion;
		let mensaje=`${titulo} - ${this.jugador()}\n${this.tableros[this.turno].mostrar()}`;
		if(this.turno==1){
			mensaje+=`\nIngrese la fila(max ${this.filas}) y columna(max ${this.columnas}). Separado con una coma`;
			posicion=Util.entradaDato(mensaje).replaceAll(" ","").split(",");
			return {
				fila: (posicion[0]??-1)-1,
				columna: (posicion[1]??-1)-1
			}
		}else{
			return {
				fila: Util.numeroAleatorio(1,this.filas-1),
				columna: Util.numeroAleatorio(1,this.columnas-1)
			}
		}
	}

	turnoInicial(){
		if(Diccionario.turno_inicial==2){
			this.turno=Util.numeroAleatorio(0,1);
		}else{
			this.turno=Diccionario.turno_inicial;
		}
	}

	cambiarTurno(){
		this.turno=this.turno==1?0:1;
	}

	jugador(){
		return (this.turno==1)?"Turno del jugador":"Turno del CPU";
	}

	posicionarBarcos(conta=0){
		let coordenadas=this.obtenerCoordenada("Posicionando barco "+(conta+1));
		let fila=coordenadas.fila;
		let columna=coordenadas.columna;
		let estado=this.tableros[this.turno].ponerBarco(fila,columna);
		if(estado==-1){
			if(this.turno==0){
				alert("Posición no válida");
			}
			this.posicionarBarcos(conta);
		}else
		if(estado==0){
			if(this.turno==0){
				alert("La posición ya tiene un barco");
			}
			this.posicionarBarcos(conta);
		}else
		if(conta<Diccionario.total_barcos-1){
			this.posicionarBarcos(conta+1);
		}
	}

}