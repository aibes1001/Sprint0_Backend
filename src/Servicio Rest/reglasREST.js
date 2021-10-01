// .....................................................................
// ReglasREST.js
// Ver el documento Reglas REST (carpeta Docs) para ver la descripció de las peticiones
// .....................................................................


module.exports.cargar = function( servidorExpress, laLogica ) {

    // .......................................................
    // POST /medicion
    // .......................................................
    servidorExpress.post(
        '/medicion',
        async function( peticion, respuesta ){
            console.log( " * POST /medicion" )
            var datos =  JSON.parse (peticion.body)
            console.log( datos.medida )

            // insertar una nueva persona a la tabla Persona
            await laLogica.guardarMedicion(datos.medida).then((res)=>{
                respuesta.status(200).send("Se ha dado de alta una nueva medida: \n Medida: " + datos + "\n")
            }).catch(function(err){
                respuesta.status(400).send(err)
            })
        }
    ) // post medida

    
    // .......................................................
    // GET /todasLasMediciones
    // .......................................................
    servidorExpress.get(
        '/todasLasMediciones', 
        async function( peticion, respuesta){
            console.log(" * GET/todasLasMediciones ")

            var res = await laLogica.obtenerTodasLasMediciones()
            console.log(res)
            if(res.length == 0){
                respuesta.status(404).send("No se ha encontrado ninguna medida")
                return
            }

            //Ok
            respuesta.send(res)
            return
            
    })//get todasLasMediciones
}
