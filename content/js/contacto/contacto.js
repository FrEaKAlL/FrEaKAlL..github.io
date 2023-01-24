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
        });
    }
    AgregaReglas() {
        $(`#${ this.propiedades.formulario }`).validate({
            rules: {
                fNombre: 'rquired',
                fCorreo: 'rquired',
                fMensaje: 'rquired',
            },
            messages: {
                fNombre: 'Este campo Nombre es requerido.',
                fCorreo: 'Este campo Correo es requerido.',
                fMensaje: 'Este campo Mensaje es requerido.'
            }
        });
    }
}
$(() => {
    var Contacto = new ClsContacto();
    Contacto.Inicia();
});