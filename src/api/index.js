const consumirCanciones = async(artista, cancion) => {
    const data= await fetch();
    const letra = await data.json();
    return letra;
}

module.exports = {
    consumirCanciones
}