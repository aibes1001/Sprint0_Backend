// ........................................................
// mainTest1.js
// ........................................................
var request = require ('request')
var assert = require ('assert')
// ........................................................
// ........................................................

const IP_PUERTO="http://localhost:8080"

// ........................................................
// main ()
// ........................................................
describe( "Test 1 : Recuerda arrancar el servidor", function() {
    
    // ....................................................
    // ....................................................
    it( "probar POST /medicion", function( hecho ) {
        var datos = {medida:555.11}
        request.post(
            { url : IP_PUERTO+"/medicion", headers : { 'User-Agent' : 'aitor', 'Content-Type' : 'application/json' },body : JSON.stringify( datos )},
            function( err, respuesta ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) // .post
    }) // it

    // ....................................................
    // ....................................................
    it("probar GET /todasLasMediciones", function(hecho){
        request.get(
            {url: IP_PUERTO + "/todasLasMediciones", headers : {'User-Agent' : 'aitor'}},
            function(err, res, carga){
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( res.statusCode, 200, "¿El código no es 200 (OK)" )
                var solucion = JSON.parse( carga )
                assert.equal( solucion[0].valor, "321.5", "¿El valor no es 321.5?")
                hecho()
            }
        )
    })// it


}) // describe