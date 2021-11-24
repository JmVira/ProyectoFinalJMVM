const boton = document.querySelector('.boton');
//document.querySelector("canvas").style.display = "none";

boton.onclick = function() {
    console.log("asdas");
    document.querySelector("div").style.display = "none";
    document.querySelector("span").style.display = "none";
    document.querySelector(".boton").style.display = "none";
    document.querySelector("canvas").style.display = "block";
}