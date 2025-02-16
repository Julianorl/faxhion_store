const carrito= document.querySelector('#carrito');
const mobileMenu = document.querySelector('.mobile-menu');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const productos = document.querySelector('#productos');
const botondarkMode =  document.querySelector('.dark-mode-boton');
let articulosCarrito = [];




document.addEventListener('DOMContentLoaded', function(){
    
    eventListeners();
    navegacionFija();
    eventListeners2();
    darkMode();
});

function darkMode(){

    const prefieredarkmode = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefieredarkmode.matches);
    if(prefieredarkmode.matches) {
        document.body.classList.add('dark-mode');
    }
    else {
        document.body.classList.remove('dark-mode');
    }
    prefieredarkmode.addEventListener('change', function(){
        if(prefieredarkmode.matches) {
            document.body.classList.add('dark-mode');
        }
        else {
            document.body.classList.remove('dark-mode');
        }

    })//cambi automatico

   
    
    botondarkMode.addEventListener('click', function(){
               
        document.body.classList.toggle('dark-mode');
        
    });
}

function eventListeners(){

     //Agregar producto al carrito
    productos.addEventListener('click', agregarproducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarproductos);

   //Vaciar Carrito
   vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; //resetea el arreglo

        limpiarHTML();//Limpie todo el html
   })    
    mobileMenu.addEventListener('click', navegacionResponsitive);
}

function agregarproducto(e){
    e.preventDefault();
      
    if(e.target.classList.contains('agregar-carrito')){
        const producto =e.target.parentElement ;
        leedatosproducto(producto); 
    }
    
}

function eliminarproductos(e){
    
    if(e.target.classList.contains('borrar-seleccion')){
        const productoid = e.target.getAttribute('data-id'); 

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoid);

        htmlCarrito();
    }
    

}

//lee el contenido del producto
function leedatosproducto(producto){
    // console.log(producto);

    const infoProducto = {
        imagen: producto.querySelector('img').src,
        precio: producto.querySelector('p').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad:1
    } 

    //Revisar si un elemto ya existe
    const existe = articulosCarrito.some(producto=>producto.id===infoProducto.id);
    if(existe){
        // actualizar cantidad de elementos.
        const productos =articulosCarrito.map(producto =>{
            if(producto.id=== infoProducto.id){
                producto.cantidad++;
                return producto;
            }else{
                return producto;
            }
        })
        articulosCarrito=[...productos];
    }else{
         //Agregar elementos al carrito
         articulosCarrito = [...articulosCarrito, infoProducto]
    };
   

    console.log(articulosCarrito);

    htmlCarrito();

}

//Muestra HTML del carrito de compras
function htmlCarrito(){
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(producto=>{
        const { imagen, precio, cantidad, id} = producto;
        const fila = document.createElement('tr');
        fila.innerHTML =  `
         <td><img src="${imagen}"></td>
         <td>${precio}</td>
         <td>${cantidad}</td>
         <td>
            <a href="#"  class="borrar-seleccion" data-id="${id}">X</a>         
         </td>
        `;

        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(fila)
    })
}

//elemina los productos del tbody
function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
    // while(contenedorCarrito.firstChild){
    //     contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    // }
}

function navegacionResponsitive(){
    
    const navegacion = document.querySelector('.navegacion');

    navegacion.classList.toggle('mostrar')
    
}
function eventListeners2(){

    const mobileMenu = document.querySelector('.mobile-menu2');
    mobileMenu.addEventListener('click', navegacionResponsitive2);
}

function navegacionResponsitive2(){
    
    const navegacion = document.querySelector('.navegacion2');

    navegacion.classList.toggle('mostrar2')
    
}

function navegacionFija(){
    const header = document.querySelector('.contenido-header');
    const seccion = document.querySelector('header');

    window.addEventListener('scroll', function(){
        if(seccion.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');
                   

        }else{
            header.classList.remove('fixed')
            
           
        }
    })
}
