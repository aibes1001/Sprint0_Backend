//==============================================
// logicaPagina.js
//==============================================


function vistaTablaMediciones(datos){

    //let columnas = document.getElementById('columnas');
    //columnas.style.visibility = "visible";
    //let tabla = document.getElementById('tablaMediciones')
    //tabla.style.display = "block";

    for(dato in datos){
        let cuerpo = document.getElementById('cuerpo')

        let fila = document.createElement("tr");

        let nombre = document.createElement("td");
        let mac = document.createElement("td");
        let uuid = document.createElement("td");
        let tipo = document.createElement("td");
        let medida = document.createElement("td");
        let lat = document.createElement("td");
        let lon = document.createElement("td");
        let fecha = document.createElement("td");

        let textoCeldaNombre = document.createTextNode(datos[dato].nombreSensor)
        let textoCeldaMac = document.createTextNode(datos[dato].macSensor)
        let textoCeldaUuid = document.createTextNode(datos[dato].uuidSensor)
        let textoCeldaTipo = document.createTextNode(datos[dato].tipo)
        let textoCeldaMedida = document.createTextNode(datos[dato].medida)
        let textoCeldaLat = document.createTextNode(datos[dato].latitud)
        let textoCeldaLon = document.createTextNode(datos[dato].longitud)
        let textoCeldaFecha = document.createTextNode(datos[dato].fecha)

        nombre.appendChild(textoCeldaNombre)
        mac.appendChild(textoCeldaMac)
        uuid.appendChild(textoCeldaUuid)
        tipo.appendChild(textoCeldaTipo)
        medida.appendChild(textoCeldaMedida)
        lat.appendChild(textoCeldaLat)
        lon.appendChild(textoCeldaLon)
        fecha.appendChild(textoCeldaFecha)

        fila.appendChild(nombre)
        fila.appendChild(mac)
        fila.appendChild(uuid)
        fila.appendChild(tipo)
        fila.appendChild(medida)
        fila.appendChild(lat)
        fila.appendChild(lon)
        fila.appendChild(fecha)

        cuerpo.appendChild(fila)
    }
    document.getElementById("NavPosicion").style.display = "block";
    pager.init();
    pager.showPageNav('pager', 'NavPosicion');
    pager.showPage(1);
    
}