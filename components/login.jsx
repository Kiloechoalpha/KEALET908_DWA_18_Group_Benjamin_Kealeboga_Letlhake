import React from 'react';
import { supabase } from '../src/supabase';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';
// import { Link } from 'react-router-dom';


const Login = () => {

  
  const handleSession = (session) => {
    if (session?.user) {
      handleLogin(session);
    }
  };

  return (
 
    <div className="login">       
    <header className="App-Header">   
        
    <Auth           
    supabaseClient={supabase}           
    appearance={{ theme: ThemeSupa }}           
    theme="dark"           
    providers={['google']}           
    handleSession={handleSession} // Call handleLogin when the session is available        
     /> 
           
    </header>  
   
    </div> 
   
    );
  
};

export default Login;