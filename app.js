function asignarTextoElemento(id, texto) {
    let nuevoTexto = document.getElementById(id);
    nuevoTexto.innerText = texto;
    return;
}

function obtenerTexto(id){
    let texto = document.getElementById(id).value;
    return texto;
}

function verificarContenidoTextarea() {
    let textarea = document.getElementById('texto-inicial');
    let botonEncriptar = document.getElementById('button-encriptar');
    let botonDesencriptar = document.getElementById('button-desencriptar');
  
    if (textarea.value.trim() !== '') {
      botonEncriptar.disabled = false;
      botonDesencriptar.disabled = false;
    } else {
      botonEncriptar.disabled = true;
      botonDesencriptar.disabled = true;
    }
  }
  
document.getElementById('texto-inicial').addEventListener('input', verificarContenidoTextarea);
  

function cambiarOutput() {
    let outputInicial = document.querySelector('.output-inicial');
    let outputFinal = document.querySelector('.output-final');
    
    if (outputInicial.style.display !== 'none') {
      outputInicial.style.display = 'none';
      outputFinal.style.display = 'flex';
    }
    return;
}

function encriptar(){
    let texto = obtenerTexto('texto-inicial');
    let longitudTexto = texto.length;
    let caracter = '';
    let textoEncriptado = '';
    cambiarOutput();
    for(let i = 0; i < longitudTexto; i++){
        caracter = texto.charAt(i);
        if(caracter == 'a'){
            textoEncriptado = textoEncriptado + 'ai';
        }
        else if(caracter == 'e'){
            textoEncriptado = textoEncriptado + 'enter';
        }
        else if(caracter == 'i'){
            textoEncriptado = textoEncriptado + 'imes';
        }
        else if(caracter == 'o'){
            textoEncriptado = textoEncriptado + 'ober';
        }
        else if(caracter == 'u'){
            textoEncriptado = textoEncriptado + 'ufat';
        }
        else{
            textoEncriptado = textoEncriptado + caracter;
        }
    }

    return new Promise((resolve) => {
        Swal.fire({
            icon: 'info',
            title: 'Encriptando texto...',
            showConfirmButton: false,
            timer: 1000
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Texto encriptado!',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    asignarTextoElemento('texto-final', textoEncriptado);
                    resolve(textoEncriptado);
                });
            }
        });
    });
}

function desencriptar(){
    let textoEncriptado = obtenerTexto('texto-inicial');
    let longitudTexto = textoEncriptado.length;
    let textoEvaluado = '';
    let textoDesencriptado = '';
    let valorI = 0;
    cambiarOutput();
    for(let i = 0; i < longitudTexto; i++){
        textoEvaluado = textoEncriptado.charAt(i);

        if(textoEvaluado == 'a'){
            
            valorI = i;
            for(let j = 0; j < 1; j++){
                i++;
                textoEvaluado = textoEvaluado + textoEncriptado.charAt(i);
            }
            if(textoEvaluado == 'ai'){
                textoDesencriptado = textoDesencriptado + 'a';
            }
            else{
                i = valorI;
                textoEvaluado = textoEncriptado.charAt(i);
                textoDesencriptado = textoDesencriptado + textoEvaluado;
            }
        }
        else if(textoEvaluado == 'e'){
            valorI = i;
            for(let j = 0; j < 4; j++){
                i++;
                textoEvaluado = textoEvaluado + textoEncriptado.charAt(i);
            }
            if(textoEvaluado == 'enter'){
                textoDesencriptado = textoDesencriptado + 'e';
            }else{
                i = valorI;
                textoEvaluado = textoEncriptado.charAt(i);
                textoDesencriptado = textoDesencriptado + textoEvaluado;
            }
        }
        else if(textoEvaluado == 'i'){
            valorI = i;
            for(let j = 0; j < 3; j++){
                i++;
                textoEvaluado = textoEvaluado + textoEncriptado.charAt(i);
            }
            if(textoEvaluado == 'imes'){
                textoDesencriptado = textoDesencriptado + 'i';
            }else{
                i = valorI;
                textoEvaluado = textoEncriptado.charAt(i);
                textoDesencriptado = textoDesencriptado + textoEvaluado;
            }
        }
        else if(textoEvaluado == 'o'){
            valorI = i;
            for(let j = 0; j < 3; j++){
                i++;
                textoEvaluado = textoEvaluado + textoEncriptado.charAt(i);
            }
            if(textoEvaluado == 'ober'){
                textoDesencriptado = textoDesencriptado + 'o';
            }else{
                i = valorI;
                textoEvaluado = textoEncriptado.charAt(i);
                textoDesencriptado = textoDesencriptado + textoEvaluado;
            }
        }
        else if(textoEvaluado == 'u'){
            valorI = i;
            for(let j = 0; j < 3; j++){
                i++;
                textoEvaluado = textoEvaluado + textoEncriptado.charAt(i);
            }
            if(textoEvaluado == 'ufat'){
                textoDesencriptado = textoDesencriptado + 'u';
            }else{
                i = valorI;
                textoEvaluado = textoEncriptado.charAt(i);
                textoDesencriptado = textoDesencriptado + textoEvaluado;
            }
        }
        else{
            textoDesencriptado = textoDesencriptado + textoEvaluado;
        }
    }

    return new Promise((resolve) => {
        Swal.fire({
            icon: 'info',
            title: 'Desencriptando texto...',
            showConfirmButton: false,
            timer: 1000
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Texto desencriptado!',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    asignarTextoElemento('texto-final', textoDesencriptado);
                    resolve(textoDesencriptado);
                });
            }
        });
    });
}
  

async function copiarContenido(){
    let texto = document.getElementById('texto-final').innerText;
    try {
        await navigator.clipboard.writeText(texto);
        Swal.fire({
            icon: 'success',
            title: '¡Contenido copiado al portapapeles!',
            showConfirmButton: false,
            timer: 1000
        });
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
}

function limpiarCaja(id) {
    document.querySelector(`#${id}`).value = '';
}

function condicionesIniciales(){
    limpiarCaja('texto-inicial');
    limpiarCaja('texto-final');
}
condicionesIniciales();
verificarContenidoTextarea();
