import React from 'react'
import auth from '../services/authService';
import { Route,Redirect } from 'react-router-dom';
export default function ProtectedRoute({path,component:Component,render,...rest}) {
   
    return (
        <Route
        {...rest}
        exact
        render={(props) => {
          if (auth.getCurrentUser()) return Component?<Component {...props} />:render(props);
          return <Redirect exact to={{
              pathname:'/login',
              state:{from:props.location}
          }} />;
        }}
      />
    )
}
