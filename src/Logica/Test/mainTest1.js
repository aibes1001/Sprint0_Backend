// ........................................................
// mainTest1.js
// ........................................................
const LogicaNegocio = require( "../logicaNegocio.js" )
var assert = require ('assert')


// ........................................................
// main ()
// ........................................................
describe( "Test: Conectar a la bd, insertar una medida y recuperar todas las medidas guardadas", function() {
    // ....................................................
    // ....................................................
    var laLogica = null
    // ....................................................
    // ....................................................
    it( "conectar a la base de datos", function( hecho ) {
        laLogica = new LogicaNegocio(
            "../db/datos.bd",
            function( err ) {
                if ( err ) {
                    throw new Error ("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it
    // ....................................................
    // ....................................................    


    // ....................................................
    // ....................................................

    it( "Puedo insertar una medida",
        async function() {
            try{
            await laLogica.guardarMedicion(321.5)
            } catch( err ) {
            // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
                throw new Error( "Error: " + err)
            }
    }) // it

     // ....................................................
    // ....................................................
    it("Comprovar que puedo ver los datos guardados", async function(){
        
        //Comprovar qué asignatura/s está matriculado
        var res = await laLogica.obtenerTodasLasMediciones()

        assert.equal( res.length, res.length , "¿no hay un resulado?" )
        assert.equal( res[0].valor, 321.5, "¿El primer valor no es 321.5?" )
        
    })//it()

   

}) // describe

