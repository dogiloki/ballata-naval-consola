class Tablero{

	constructor(filas,columnas){
		this.filas=filas;
		this.columnas=columnas;
		this.tabla=new Array(this.filas);
		this.vaciar();
	}

	vaciar(){
		for(let a=0; a<this.filas; a++){
			this.tabla[a]=new Array(this.columnas);
			for(let b=0; b<this.columnas; b++){
				this.tabla[a][b]={
					texto: Diccionario.agua,
					tiro: false
				};
			}
		}
	}

	mostrar(){
		let tablero="";
		for(let a=0; a<this.filas; a++){
			for(let b=0; b<this.columnas; b++){
				tablero+=this.tabla[a][b].texto;
			}
			tablero+="\n";
		}
		return tablero;
	}

	posicionValida(fila,columna){
		return fila<this.filas || columna<this.columnas;
	}

	hayBarco(fila,columna){
		return this.tabla[fila][columna].texto==Diccionario.barco;
	}

	sinBarcos(){
		for(let a=0; a<this.filas; a++){
			this.tabla[a]=new Array(this.columnas);
			for(let b=0; b<this.columnas; b++){
				if(this.tabla[a][b].texto==Diccionario.barco){
					return false;
				}
			}
		}
		return true;
	}

	ponerBarco(fila,columna){
		if(!this.posicionValida(fila,columna)){
			return -1;
		}
		if(this.hayBarco(fila,columna)){
			return 0;
		}else{
			this.tabla[fila][columna].texto=Diccionario.barco;
			return 1;
		}
	}

	disparo(fila,columna){
		if(!this.posicionValida(fila,columna)){
			return -1;
		}
		if(this.hayBarco(fila,columna)){
			this.tabla[fila][columna]={
				texto: Diccionario.barco_detruido,
				tiro: true
			}
			sleep(3);
			this.tabla[fila][columna].texto=Diccionario.agua;
			return 1;
		}else{
			return 0;
		}
	}

}