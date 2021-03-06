/**
 * LogicaNegocio.js
 * 
 * 
 */
const sqlite3 = require( "sqlite3" )

// .....................................................................
// .....................................................................
module.exports = class LogicaNegocio {

    /**
     * Constructor de la clase LogicaNegocio.
     * Descripción:
     * recibe el nombre de la bd y abre una conexión con ella. También recibe un callback que indica cuando termina
     * y si ha habido algún error.
     * 
     * @param nombreBD Texto que representa el nombre de la bd.
     * 
     * @return En caso de producirse un error al conectarse con la bd, devuelve el tipo de error producido.
     *  
     * nombreBD: Texto
     * -->
     * constructor () -->
     * 
     */
    constructor( nombreBD, cb ) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            ( err ) => {
                if( ! err ) {
                    this.laConexion.run( "PRAGMA foreign_keys = ON" )
                }
                cb(err)
            })
    } // ()

    /**
     * guardarMedicion()
     * Descripción:
     * realiza una operación de inserción de un valor real en la tabla Medicion de la bd.
     * 
     * @param medida Número real.
     * 
     * @return En caso de guardarse correctamente en la bd no devuelve nada. En caso de producirse un error,
     *  devuelve el tipo de error producido.
     * 
     *   * medicion: R
     * -->
     * insertarMedicion() -->
     * 0 || err
     */
    guardarMedicion( nombre, mac, uuid, tipo, medida, fecha, latitud, longitud ) {
        var textoSQL =
            'insert into Medicion (nombreSensor, macSensor, uuidSensor, tipo, medida, fecha, latitud, longitud) values( $nombre, $mac, $uuid, $tipo, $medida, $fecha, $latitud, $longitud);'
        var valoresParaSQL = { $nombre : nombre, $mac : mac, $uuid : uuid, $tipo:tipo, $medida:medida, $fecha:fecha, $latitud:latitud, $longitud:longitud }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                ( err ? rechazar(err) : resolver() )
                })
        })
    } // ()


    /**
     * obtenerTodasLasMediciones()
     * Descripción:
     * realiza una operación de consulta a la tabla Medicion de la bd y recupera todos los valores guardados.
     * 
     * @return Devuelve una lista de JSON. En caso de producirse un error durante la consulta,
     *  devuelve el tipo de error producido.
     * 
     * obtenerTodasLasMediciones() -->
     *  lista<{id:N, valor:R}> || err
     */
    obtenerTodasLasMediciones( ) {
        var textoSQL = "select * from Medicion";
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
                })
        })
    } // ()

    // nombreSensor, macSensor, uuidSensor, tipo, medida, fecha, latitud, longitud 
    obtenerUltimasMediciones( cuantas ) {
        var textoSQL = "SELECT nombreSensor, macSensor, uuidSensor, tipo, medida, fecha, latitud, longitud  FROM Medicion ORDER BY fecha DESC LIMIT $cuantas;";
        var valoresParaSQL = { $cuantas: cuantas }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
                })
        })
    } // ()


}// class()