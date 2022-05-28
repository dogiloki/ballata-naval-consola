class Main{

	constructor(fila,columna){
		this.tableros;
		this.turno;
		this.fila=fila;
		this.columna=columna;
		this.turno_inicial=(Diccionario.turno_inicial==2)?Util.numeroAleatorio(0,1):Diccionario.turno_inicial;
	}

	dimencionar(){
		this.filas=Util.entradaDato("Ingrese la cantidad de filas",2);
		this.columnas=Util.entradaDato("Ingrese la cantidad de columnas",2);
		if(this.filas<Diccionario.total_barcos || this.columnas<Diccionario.total_barcos){
			alert(`Las filas o columnas deben ser mayores o iguales a ${Diccionario.total_barcos}`);
			this.dimencionar();
		}
	}


	iniciarJuego(dimencionar){
		if(dimencionar){
			this.dimencionar();
		}
		this.tableros=[new Tablero(this.filas,this.columnas),new Tablero(this.filas,this.columnas)];
		this.turno=this.turno_inicial;
		this.tableros[0].vaciar();
		this.tableros[1].vaciar();
		this.posicionarBarcos();
		this.cambiarTurno();
		this.posicionarBarcos();
		this.turno=this.turno_inicial;
		alert("Comienza el juego!!!");
		let ganador;
		let invalido
		do{
			invalido=false;
			let coordenadas=this.obtenerCoordenada("Disparando\nTus barcos: "+this.tableros[this.turno].total_barcos+"\nBarcos del oponente: "+this.tableros[this.turnoOponente()].total_barcos,false);
			let fila=coordenadas.fila;
			let columna=coordenadas.columna;
			let estado=this.tableros[this.turnoOponente()].disparo(fila,columna);
			if(estado==-1){
				invalido=true;
				if(this.turno==1){
					alert("Posición no válida");
				}
			}else
			if(estado==0){
				alert(this.jugador()+" Fallo en el disparo "+(fila+1)+","+(columna+1));
			}else
			if(estado==1){
				alert(this.jugador()+" Destruyo el barco "+(fila+1)+","+(columna+1));
			}
			if(!invalido){
				this.cambiarTurno();
			}
			ganador=this.tableros[this.turnoOponente()].estaVacio()?this.turno:-1;
			if(ganador==-1){
				alert("El ganador es el "+(ganador==1?"Jugador":"CPU"));
			}
			//Mostrar tablero en consola
			console.log("CPU\n",this.tableros[0]);
			console.log("\nJUGADOR\n",this.tableros[1]);
		}while(ganador==-1 || invalido);
	}

	obtenerCoordenada(titulo,mostrarBarcos){
		let posicion;
		let mensaje=`${titulo}\n${this.jugador()}\n${this.tableros[this.turno].mostrar(mostrarBarcos)}`;
		if(this.turno==1){
			mensaje+=`\nIngrese la fila(max ${this.filas}) y columna(max ${this.columnas}). Separado con una coma`;
			posicion=Util.entradaDato(mensaje).replaceAll(" ","").split(",");
			return {
				fila: (posicion[0]??-1)-1,
				columna: (posicion[1]??-1)-1
			}
		}else{
			return {
				fila: Util.numeroAleatorio(0,this.filas-1),
				columna: Util.numeroAleatorio(0,this.columnas-1)
			}
		}
	}

	cambiarTurno(){
		this.turno=this.turno==1?0:1;
	}

	turnoOponente(){
		return this.turno==1?0:1;
	}

	jugador(){
		return (this.turno==1)?"Jugador":"CPU";
	}

	posicionarBarcos(conta=0){
		let coordenadas=this.obtenerCoordenada("Posicionando barco "+(conta+1),true);
		let fila=coordenadas.fila;
		let columna=coordenadas.columna;
		let estado=this.tableros[this.turno].ponerBarco(fila,columna);
		if(estado==-1){
			if(this.turno==1){
				alert("Posición no válida");
			}
			this.posicionarBarcos(conta);
		}else
		if(estado==0){
			if(this.turno==1){
				alert("La posición ya tiene un barco");
			}
			this.posicionarBarcos(conta);
		}else
		if(conta<Diccionario.total_barcos-1){
			this.posicionarBarcos(conta+1);
		}
	}

}

var main=new Main(); // Inciar juego
this.main.iniciarJuego(true);