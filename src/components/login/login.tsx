import { component$, useStore, $, useClientEffect$} from '@builder.io/qwik';


import '~/assets/css/login.css';
/**
 * The Login component 
 */
 
export const Login = component$(() => {

const state = useStore({
    submitted: false
});

useClientEffect$(() => {
    const update = () => {
        // ((localStorage.getItem("logged") == 'true') ? state.submitted = true : state.submitted = false);
        ((localStorage.getItem("logged") == 'true') ? state.submitted = true : state.submitted = false);
        // console.log(state.submitted);
    };
    update();
    const tmrId = setInterval(update, 1000);
    return () => clearInterval(tmrId);
});

const errorPass = useStore({ error: '' });
const errorName = useStore({ error: '' });

const database = [
    {
        username: "admin",
        password: "123"
    },
    {
        username: "admin",
        password: "123"
    }
];

  const name = useStore({
    value: '',
  });

  const pass = useStore({
    value: '',
  });

  
  const userData = database.find((user) => user.username === name.value);


    const handleLogin$ = $( async () => {
        ((userData && userData.username == name.value) ?  ((userData && userData.password == pass.value) ?  window.localStorage.setItem('logged', 'true') :  errorPass.error = 'Invalid Password') :  errorName.error = 'Invalid Username');
        ((localStorage.getItem("logged") == 'true') ? state.submitted = true : state.submitted = false);
        console.log('logged in');
    });


    // const logOut$ = $( async () => {
    //     ((localStorage.getItem("logged") == 'true') ? window.localStorage.setItem('logged', 'false') : state.submitted = false);
    //     ((localStorage.getItem("logged") == 'false') ? state.submitted = false : state.submitted = false);
    //     console.log('logged out');
    // });

    
const renderForm = (
    <> 
     <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>

            <div className="form">
                <form>
                <div className="input-container">
                    <label>Username </label>
                    <input value={name.value} onInput$={(e) => (name.value = (e.target as HTMLInputElement).value)} type="text" name="uname" required />
                                            
                    <div className="error">{errorName.error}</div>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input value={pass.value} onInput$={(e) => (pass.value = (e.target as HTMLInputElement).value)} type="password" name="pass" required />
                                            
                    <div className="error">{errorPass.error}</div>
                </div>
                <div className="button-container">
                <span className="submitbutton" onClick$={handleLogin$}>Submit</span>
                </div>
                </form>
            </div>
    </div>
            
    </div>
    </>
 );

 const renderRedirect = (
     <script> window.location.href = '/'; </script>
 );



  return (
    <>  
        {/* {state.submitted ? <div>User is successfully logged in <a href="/">home</a><span className="submitbutton" onClick$={logOut$}>Logout</span> </div> : renderForm} */}
        {state.submitted ? renderRedirect : renderForm}
    </>
  );

});


