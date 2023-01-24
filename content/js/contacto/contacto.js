class ClsContacto { 
    constructor(){
        this.propiedades = {
            formulario: 'formulario-contacto',
            botonEnviar: 'btn-enviar',
            fNombre: 'fNombre',
            fCorreo: 'fCorreo',
            fTelefono: 'fTelefono',
            fMensaje: 'fMensaje',
        };
    }
    Inicia() {
        this.AgregaReglas();
        this.AgregaEventos();
    }
    get Propiedades(){
        return this.propiedades;
    }
    AgregaEventos(){
        $(`#${ this.Propiedades.botonEnviar }`).click(() => {
            if (this.valida.validForm()){

            }
        });
    }
    AgregaReglas() {
        this.valida = new Validador([{
            campo: `#${ this.propiedades.fNombre }`,
            reglas: [{
                regla: 'required'
            }]
        },{
            campo: `#${ this.propiedades.fCorreo }`,
            reglas: [{
                regla: 'required',
            },{
                regla: 'format',
                mensaje: 'El formato de correo no es valido.'
            }]
        },{
            campo: `#${ this.propiedades.fMensaje }`,
            reglas: [{
                regla: 'required'
            }]
        }]);
        this.valida.addEvents();
    }
}
$(() => {
    var Contacto = new ClsContacto();
    Contacto.Inicia();
});