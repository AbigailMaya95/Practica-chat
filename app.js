const $input_mensaje = document.getElementById("mensaje");
const $input_nombre = document.getElementById("nombre");
const $div_mensajes = document.getElementById("contenedor-mensajes");
const $div_participantes = document.getElementById("contenedor-participantes");
const $button_enviar = document.getElementById("Enviar");


$button_enviar.addEventListener("click", () => {
    let nombre, mensaje;
    nombre = $input_nombre.value; /* Obtener el valor del input*/
    mensaje = $input_mensaje.value /* Obtener el valor del input*/

    //console.log(nombre, mensaje);
    if (nombre != "" && mensaje != "") {
        let participante = new Subscriptor(nombre, mensaje);
        const validar = observador.subscriptores.filter(s => s.nombre == nombre); //array de un elemento que devuelve tu nombre
        if (validar.length === 0) {
            observador.subscribir(participante); //agregando a una persona nueva al chat--- con los metodos siempre se usan parentesis
        } else {
            validar[0].mensaje(mensaje);

        }
        const array = observador.notificar(nombre);
        agregarElemento(array, nombre);
        crearElemento("Mensaje Escrito Por "+ nombre + ": "+ mensaje, $div_mensajes);
        $input_nombre.value= "";
        $input_mensaje.value= "";
    } else {
        window.alert("Error");
    }
});
const agregarElemento = (array, n) => { //funcion agregar elemento
    while ($div_participantes.firstChild) { // bucle que elimina todos los pimeros hijos de div participantes 
        $div_participantes.removeChild($div_participantes.firstChild);
    }
array.map(p=>{
    crearElemento(p,$div_participantes);
});
crearElemento(n,$div_participantes);
}
const crearElemento = (texto, contenedor) => {
    let parrafo = document.createElement("p"); // crea el elemento p 
    parrafo.textContent = texto; //<p>aqui va lo de textContent</p>
    parrafo.style.paddingLeft = "10px";
    parrafo.style.paddingTop = "10px";
    parrafo.style.fontSize = "16px";
    parrafo.style.fontFamily = "'Courier New', Courier, monospace";
    contenedor.appendChild(parrafo); //<div><p></p></div>
}

class Observador {
    constructor() {
        this.subscriptores = [];
    }

    subscribir(subscriptor) {
        this.subscriptores.push(subscriptor);
    }
    desubscribir(subscriptor) {
        this.subscriptores = this.subscriptores.filter(s => s !== subscriptor);
    }

    notificar(evento) {
        return this.subscriptores.filter(s => s.nombre != evento).map(s => s.aviso()); //filter devuelve un arreglo , evento es una cadena de caracteres por lo tanto recibe un nombre , devulve los elemntos que no coincidan con el nombre
        //map se utilizo para recorrer el arreglo y devuelve un arreglo

        //this.subscriptores.forEach(subscriptor => subscriptor.mensaje.call(subscriptor, evento));
    }
}

class Subscriptor {
    nombre
    mensaje
    constructor(nombre, mensaje) {
        /*atributo*/
        this.nombre = nombre; /*Parametro */
        this.mensaje = []; //inicialiazamos el array
        this.mensaje.push(mensaje); //agregamos el parametro del mensaje
        //console.log("creando al subscriptor", this.nombre);
    }

    mensaje(evento) {
        this.mensaje.push(evento);
        //console.log(`El subscriptor ${this.nombre} ha sido invitado al evento: ${evento}`);
    }

    aviso() {
        return "*" + this.nombre;
    }
}
const observador = new Observador();

