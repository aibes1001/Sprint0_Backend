// .....................................................................
// mainServidorREST.js
// .....................................................................
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const path = require('path')
const LogicaNegocio = require('../logica/logicaNegocio.js')


// .....................................................................
// fichero: texto
// ->
// cargarLogica() ->
// .....................................................................

function cargarLogica( fichero ){
    return new Promise((resolver, rechazar)=>{
        var laLogica = new LogicaNegocio(fichero, ( err )=> {
            if ( err ) {
                rechazar(err)
            }else{
                resolver(laLogica)
            }
            
        })
    })
}


// .....................................................................
// main()
// .....................................................................
async function main() {

    var laLogica = await cargarLogica("../db/datos.bd")
    // creo el servidor
    var servidorExpress = express()

    // para poder acceder a la carga de la petición http, asumiendo que es JSON
    servidorExpress.use (express.static(path.join(__dirname,"../ux")), bodyParser.text({type : 'application/json'}) )
    //servidorExpress.use ( express.json() )


    // cargo las reglas REST
    var reglas = require( "./reglasREST.js")
    reglas.cargar( servidorExpress, laLogica )

    // arrancao el servidor
    var servicio = servidorExpress.listen( 8080, function() {
        console.log( "servidor REST escuchando en el puerto 8080 ")
    })

    // capturo control-c para cerrar el servicio ordenadamente
    process.on("SIGINT", function() {
        console.log (" terminando ")
        servicio.close ()
    })

} // ()



// .....................................................................
// .....................................................................
main()
// .....................................................................
// .....................................................................