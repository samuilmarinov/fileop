import { component$, useSignal, useStore, $, useOnWindow} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import { TableApp } from '~/integrations/betahome/mui';
import { PrinterApp } from '~/integrations/betaprinters/mui';
import { HeaderLogo } from '~/components/header-logo/header-logo';
import '~/assets/css/table.min.css';
import '~/assets/css/printers.min.css';
import '~/assets/css/main.css';


export default component$(() => {

  const logOut$ = $( async () => {
    ((localStorage.getItem("logged") == 'true') ? window.localStorage.setItem('logged', 'false') : window.localStorage.setItem('logged', 'false'));
    ((localStorage.getItem("logged") == 'false') ? location.reload() : location.reload());
  });

  const state = useStore({
    submitted: false
  });

  useOnWindow(
    'load',
    $((event) => {
      console.log('loaded');
      ((localStorage.getItem("logged") == 'true') ? state.submitted = true : window.location.href = '/login');
      console.log(state.submitted);
      console.log(event);
      document.getElementById('printersshow').click();
    })
  );


  const show = useSignal(false);
  const print = useSignal(false);
  // const count = useSignal(0);
  const countt = useSignal(0);

  // const variant = useSignal<'contained' | 'outlined' | 'text'>('contained');
  // show.value = true

  const filesOpen$ = $( async () => {
    show.value ? show.value = false : show.value = true;
  });


  const renderButtonpreinters = (
      <> 
        <button id="printersshow" className="bottonnav" onClick$={filesOpen$}></button>
      </>
  );

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <script async type="text/javascript" src="./src/assets/js/scriptsbeta.min.js" />
      <script async type="text/javascript" src="./src/assets/js/jquery-confirm.min.js" />
      <script async type="text/javascript" src="./src/assets/js/toastr.min.js" />
      <HeaderLogo/>
      <span className="logoutbutton" onClick$={logOut$}> <i class="fa fa-sign-out"></i> Logout</span>
      <div style={{ paddingTop: '5%', marginLeft: '10%', width: '80%' }}>
      {/* @ts-ignore */}
      {print.value ? renderButtonpreinters : renderButtonpreinters}
      {show.value && <PrinterApp client:visible>Slider is {countt.value}</PrinterApp>}
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: 'DHR files manager',
};