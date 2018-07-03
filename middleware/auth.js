export default function ({store, redirect, route}) {

    const userIsLoggedIn = !!store.state.auth.user
    
    if (route.path == '/')
    {
      return Promise.resolve()  
    }

    if (!userIsLoggedIn ) {
      return redirect('/login')
    }

    return Promise.resolve()
  }