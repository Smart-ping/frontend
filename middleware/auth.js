export default function ({store, redirect, route}) {

    const userIsLoggedIn = !!store.state.auth.user
    
    if (route.path == '/')
    {
      if (userIsLoggedIn)
        return redirect('/main')

      return Promise.resolve()  
    }

    if (!userIsLoggedIn && route.path != '/register') {
      return redirect('/login')
    }

    return Promise.resolve()
  }