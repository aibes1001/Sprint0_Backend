//==============================================
// logicaFake.js
//==============================================

// ........................................................
const IP_PUERTO="http://localhost:8080"
// ........................................................


function obtenerTodasLasMediciones(){
    fetch(IP_PUERTO+"/todasLasMediciones").then((respuesta)=>{
        if(respuesta.status === 200){
            return respuesta.json()
        }else{
            document.getElementById("salida").innerHTML = "No hay ninguna medición guardada."
            return 0;
        }  
    }).then((datos)=>{
        if(datos == 0){
            return
        }
        console.log(datos)
        vistaTablaMediciones(datos)
    })
}