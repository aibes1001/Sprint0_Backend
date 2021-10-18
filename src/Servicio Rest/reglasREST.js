// .....................................................................
// ReglasREST.js
// Ver el documento Reglas REST (carpeta Docs) para ver la descripció de las peticiones
// .....................................................................


module.exports.cargar = function( servidorExpress, laLogica ) {

    // .......................................................
    // POST /medicion
    // .......................................................
    servidorExpress.post(
        '/mediciones',
        async function( peticion, respuesta ){
            console.log( " * POST /medicion" )
            var datos =  JSON.parse (peticion.body)
            console.log( "datos" )
            console.log( datos )
            console.log( "datos22222222222222222222222" )
            //console.log( datos[0] )
            console.log( JSON.parse(datos[0]) )
            console.log( "datos333333333333333333333333" )
            console.log( JSON.parse(datos[0]).medida )
           

            var res = await laLogica.guardarMediciones(datos);

            console.log(res)
            if(res == 200){
                respuesta.status(200).send("Se ha dado de alta una nueva medida\n")
            }else{
                respuesta.status(500).send(res)
            }

            /*for(i = 0; i < datos.length; i++){
                medicion = JSON.parse(datos[i])

                await laLogica.guardarMedicion(medicion.nombreSensor, medicion.macSensor, medicion.uuidSensor, medicion.tipo, medicion.medida,
                    medicion.fecha, medicion.latitud, medicion.longitud)
            }

            respuesta.status(200).send("Se ha dado de alta una nueva medida\n")*/
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

    // .......................................................
    // GET /todasLasMediciones
    // .......................................................
    servidorExpress.get(
        '/ultimasMediciones/:cuantas', 
        async function( peticion, respuesta){
            console.log(" * GET/ultimasMediciones ")

            var cuantas = peticion.params.cuantas
            console.log(cuantas)

            var res = await laLogica.obtenerUltimasMediciones( cuantas )
            console.log(res)
            if(res.length == 0){
                respuesta.status(404).send("No se ha encontrado ninguna medida")
                return
            }

            //Ok
            respuesta.send(res)
            return
            
    })//get ultimasMediciones


}
