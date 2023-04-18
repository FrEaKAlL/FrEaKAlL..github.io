/* window.addEventListener('scroll', function() {
    let header = this.document.querySelector('.menu-principal'); 
    header.classList.toggle('cambia', window.scrollY > 630);
    let contenedorHeader = this.document.querySelector('.cont-menu-principal');
    contenedorHeader.classList.toggle('cambia-cont', window.scrollY > 630);
}); */
function abriImagen(url, alt) {
    $('#fill-img-pant').attr('src', url);
    $('#fill-img-pant').attr('alt', alt);
    $('.fill-img').removeClass('oculto');
}
function cierraImg() {
    $('.fill-img').addClass('oculto');
}