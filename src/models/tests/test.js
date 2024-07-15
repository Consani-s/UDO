import testUsuario from './testUsuario.js';
import testServicio from './testServicio.js';
import testProducto from './testProducto.js';
import testCategoria from './testCategoria.js';
import testDialogo from './testDialogo.js';
import testActService from './testActService.js';
import testFactura from './testFactura.js';
import testFacturaProducto from './testFactura-Producto.js';
import testImagen from './testImagen.js';

async function init(){
    console.log('');
    await testUsuario();
    console.log('');
    await testServicio();
    console.log('');
    await testProducto();
    console.log('');
    await testCategoria();
    console.log('');
    await testDialogo();
    console.log('');
    await testActService();
    console.log('');
    await testFactura();
    console.log('');
    await testFacturaProducto();
    console.log('');
    await testImagen();
    console.log('');
}

init();