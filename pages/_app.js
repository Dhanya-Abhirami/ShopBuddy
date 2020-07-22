import App from "next/app";
import Layout from "../components/_App/Layout"
import { parseCookies, destroyCookie } from 'nookies' // nookies => next cookies 
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import Router from "next/router";

class MyApp extends App {
  static async getInitialProps( { Component,ctx }){
    // if (ctx.pathname === '/_error'){ // change this
    //   redirectUser(ctx,'/')
    // }

    const {token} = parseCookies(ctx);
    // same as
    // const cookies = parseCookies(ctx)
    // const token = cookies.token
    let pageProps = { }
    if (Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx)
    }
    
    if (!token){
      // not authenticated
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create'
      if (isProtectedRoute){
        redirectUser(ctx,'/login')
      }
    }
    else{
      // authenticated
      try{
        const payload = { headers : {Authorization : token}};
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url,payload); // why get
        const user = response.data
        const isRoot = user.role === 'root'
        const isAdmin = user.role === 'admin'
        const isNotPermitted = !(isRoot  || isAdmin) && ctx.pathname === '/create'
        if (isNotPermitted){
          // redirect from 'create' page
          redirectUser(ctx,'/')
        }
        pageProps.user = user
      }
      catch(error){
        console.error('Error getting current user',error)
        // throw out invalid token
        destroyCookie(ctx,'token')
        // redirect to login page
        redirectUser(ctx,'/login')
      }
    }
    return { pageProps }
  }
  componentDidMount(){
    window.addEventListener('storage',this.syncLogout)
  }

  syncLogout = event => {
    if (event.key === 'logout'){
      // console.log('logged out from storage');
      Router.push('/login');
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
