class Tablero{

	constructor(filas,columnas){
		this.filas=filas;
		this.columnas=columnas;
		this.total_barcos=0;
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

	mostrar(mostrarBarcos){
		let tablero="";
		for(let a=0; a<this.filas; a++){
			for(let b=0; b<this.columnas; b++){
				if(mostrarBarcos){
					tablero+=this.tabla[a][b].texto;
				}else{
					if(this.tabla[a][b].texto==Diccionario.barco_detruido){
						tablero+=Diccionario.barco_detruido;
					}else{
						tablero+=Diccionario.agua;
					}
				}
			}
			tablero+="\n";
		}
		return tablero;
	}

	posicionValida(fila,columna){
		if(fila<this.filas && columna<this.columnas && fila>=0 && columna>=0){
			return !this.tabla[fila][columna].tiro;
		}else{
			return false;
		}
	}

	hayBarco(fila,columna){
		return this.tabla[fila][columna].texto==Diccionario.barco;
	}

	estaVacio(){
		for(let a=0; a<this.filas; a++){
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
			this.total_barcos++;
			return 1;
		}
	}

	disparo(fila,columna){
		if(!this.posicionValida(fila,columna)){
			return -1;
		}
		this.tabla[fila][columna].tiro=true;
		if(this.hayBarco(fila,columna)){
			this.tabla[fila][columna].texto=Diccionario.barco_destruido;
			this.total_barcos--;
			this.tabla[fila][columna].texto=Diccionario.agua;
			return 1;
		}else{
			return 0;
		}
	}

}