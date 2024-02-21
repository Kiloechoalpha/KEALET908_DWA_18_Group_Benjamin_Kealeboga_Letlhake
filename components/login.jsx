import { supabase } from '../src/supabase'; // Importing Supabase client
import { ThemeSupa } from '@supabase/auth-ui-shared'; // Importing UI theme
import { Auth } from '@supabase/auth-ui-react'; // Importing Auth component

/**
 * Login Component
 * 
 * This component provides a login form using Supabase authentication.
 * It utilizes the Auth component from @supabase/auth-ui-react package.
 */
const Login = () => {
  /**
   * Handle user login event.
   * @param {Object} session - User session object.
   */
  const handleLogin = (session) => {
    console.log('User logged in:', session.user);
  };

  /**
   * Handle user session.
   * @param {Object} session - User session object.
   */
  const handleSession = (session) => {
    if (session?.user) {
      handleLogin(session);
    }
  };

  return (
    <div className="login">
      <header className="App-Header">
        {/* Auth component for login */}
        <Auth
          supabaseClient={supabase} // Supabase client instance
          appearance={{ theme: ThemeSupa }} // UI theme configuration
          theme="dark" // Color theme of the UI
          providers={['google']} // Authentication providers enabled (Google in this case)
          handleSession={handleSession} // Callback function to handle user session
        />
      </header>
    </div>
  );
};

export default Login;
