class Validador {
	constructor(opciones) {
		this.empty = '';
		this.complemento = 'error';
		this.classError = 'error';
		this.classMsjError = 'msjValid';
		this.mensajesReglas = {
			required: 'El campo es requerido.',
			format: 'El campo no cumple con el formato correcto.' 
		}
		this.opciones = [];
		if(typeof(opciones) != 'undefined'){
			opciones.forEach((i) => {
				let item = {};
				if (typeof(i.campo) != 'undefined'){
					item.campo = i.campo;
				}
				if (typeof(i.reglas) != 'undefined'){
					item.reglas = i.reglas;
				} else {
					item.reglas = [];
				}
				this.opciones.push(item);
			});
		}
	}
	addEvents() {
		this.opciones.forEach((element) => {
			$('body').off('change', element.campo);
			$('body').on('change', element.campo, () => {
				this.addRegla(element.campo, element.reglas);
			});
		});
	}
	validForm() {
		this.opciones.forEach((element) => {
			this.addRegla(element.campo, element.reglas);
		});
	}
	addRegla(campo, reglas){
		this.remueveMensajes(campo);
		reglas.forEach((element) => {
			if (typeof(element.capMinimo) == 'undefined') {
				element.capMinimo = 0;
			}
			if (typeof(element.capMaximo) == 'undefined') {
				element.capMaximo = 0;
			}
			if (typeof(element.mensaje) == 'undefined') {
				element.mensaje = this.getMensaje(element.regla);
			}
			if (!this.validacionPorRegla(element.regla, campo, element.mensaje, element.capMinimo, element.capMaximo)) {
				$(campo).removeClass(this.classError).addClass(this.classError);
			}
		});
	}
	remueveMensajes(campo){
		$(`${ campo }-${ this.complemento }`).remove();
		$(campo).removeClass(this.classError);
	}
	getMensaje(regla) {
		return eval(`this.mensajesReglas.${ regla }`)
	}
	validacionPorRegla(regla, campo, mensaje, capMinimo, capMaximo){
		const typeCampo = $(campo).data('type');
		switch(regla){
			case 'required':
				if (typeCampo == 'text' || typeCampo == 'textarea'){
					if ($(campo).val() == this.empty) {
						$(campo).after(`<div id="${ campo.replace('#',this.empty) }-${ this.complemento }" class="${ this.classMsjError }">${ mensaje }</div>`);
						return false;
					}
				} else if (typeCampo == 'email'){
					if ($(campo).val() == this.empty) {
						$(campo).after(`<div id="${ campo.replace('#',this.empty) }-${ this.complemento }" class="${ this.classMsjError }">${ mensaje }</div>`);
						return false;
					}
				} else if (typeCampo == 'number'){
					if($(campo).val() != this.empty){
						if ($(campo).val() == 0){
							$(campo).after(`<div id="${ campo.replace('#',this.empty) }-${ this.complemento }" class="${ this.classMsjError }">${ mensaje }</div>`);
							return false;
						}
					} else {
						if ($(campo).val() == this.empty) {
							$(campo).after(`<div id="${ campo.replace('#',this.empty) }-${ this.complemento }" class="${ this.classMsjError }">${ mensaje }</div>`);
							return false;
						}
					}
				}
				break;
			case 'format':
				if (typeCampo == 'email'){
					const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					const regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
					if ($(campo).val() != this.empty){
						if (!reg.test($(campo).val()) || !regOficial.test($(campo).val())) {
							$(campo).after(`<div id="${ campo.replace('#',this.empty) }-${ this.complemento }" class="${ this.classMsjError }">${ mensaje }</div>`);
							return false;
						}
					}
				}
				break;
		}
		return true;
	}
}