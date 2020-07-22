import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin(token){
    cookie.set('token',token);
    Router.push('/account')
}

export function handleLogout(token){
    cookie.remove('token');
    window.localStorage.setItem('logout',Date.now())
    Router.push('/login')
}

export function redirectUser(ctx,location){
    if (ctx.req){ // if we are on server
        ctx.res.writeHead(302,{ Location : location}) // url redirect
        ctx.res.end();
    }
    else{ // if we are on client
        Router.push(location)
    }
}