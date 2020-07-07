/*
============================
GLOBAL CONFIG
---------------------------
*/
var VERSION_CODE = '0.9.0-beta'

function setVersionFooter(){
    document.getElementById('copyright text-center my-auto').innerHTML = `
        <span>Copyright &copy; Xeon Developers. v${VERSION_CODE}</span>
    `;
}