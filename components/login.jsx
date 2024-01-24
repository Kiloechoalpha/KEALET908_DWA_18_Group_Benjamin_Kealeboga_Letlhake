import { supabase } from '../src/supabase';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';


const Login = () => {
  const handleLogin = (session) => {
    // Your handleLogin implementation
    console.log('User logged in:', session.user);
  };

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
          handleSession={handleSession}
        />
      </header>
    </div>
  );
};

export default Login;
