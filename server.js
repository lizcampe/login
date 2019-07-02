var jwt= require('jsonwebtoken');
const express= require('express');

const app =express();
const port =3000;

app.listen(port, ()=> console.log (`Example app listening on port ${port}!`))
console.log ('app is running')
simpleJWT();

//JWT simple solo tiene claims y secret key
function simpleJWT(){
    const secretKey= 'secretKey'; //secret key que será usada en el token
    const claims={ //contenido del JWT playload
            userName:'The user name'
    }
    //generamos el jwt
    const token =jwt.sign(claims,secretKey);
    console.log(token);
}

//JWT con algoritmo de cifrado
    function tokenConAlgoritmo(){
    const secretKey='secretKey';
    //secret key que será usada en el token

    const claims = {
        userName:'The user name'
    } // contenido del JWT playload


    const token =jwt.sign(claims,secretKey, {algorithm:'RS256'});
    console.log(token);
}

function tokenConCallBack() {
    const secretKey ='secretKey'; //secret key que será usada en el token
    const claims ={ //Contenido del JWT playload
        userName: 'The user name'
    }
    console.log('antes de generar token...')
    jwt.sign(claims, secretKey, {algorithm: 'RS256'}, function (err, token){
        console.log(token)
    });
    console.log('generado...')
}

function tokenConCaducidad(){

    //en alguna de la spropiedades del claim se puede mandar la fecha de expiración
    const token= jwt.sign({
        userName:'the user name',
        exp: Math.floor(Date.now()/1000)+(60*69)}//define la caducidad en 1 hr
        , 'secretKey', {algorithm:'RS256'});
        console.log(token);
    }

//opcion 2
 /*
const token= jwt.sign {
    {userName:'some name'}
    'secretKey',
    {   expires:'1h',
algorithm: 'RS256'});
console.log(token)
}
*/

verificarToken();
function verificarToken(){
    const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyQSshNhQPYB0fpQIZAhU9yyHy6VgSPXk';
try{
    const tokenDecoded=jwt.verify(token,'secretKey');
    console.log(tokenDecoded)
} catch(err){
    console.log(err)
    console.log('token invalido')
}
}

function verfificarTokenOpt2() {
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyQSshNhQPYB0fpQIZAhU9yyHy6VgSPXk';
    jwt.verify(token,'secretKey', function(err,token){
        if(err) {
            console.log(err)
        } else{
            console.log(token)
        }
    })
}