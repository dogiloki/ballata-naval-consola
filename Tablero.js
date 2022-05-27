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

	

}