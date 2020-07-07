/*
============================
GLOBAL CONFIG
---------------------------
*/


function setVersionFooter(){
    var VERSION_CODE = '0.9.0-beta'
    document.getElementById('footer-version-code').innerHTML = `
        <span>Copyright &copy; Xeon Developers. v${VERSION_CODE}</span>
    `;
}