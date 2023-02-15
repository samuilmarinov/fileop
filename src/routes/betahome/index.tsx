import { component$, useSignal, useStore, $, useOnWindow} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { TableApp } from '~/integrations/betahome/mui';
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
      document.getElementById('filesshow').click();
    })
  );


  const show = useSignal(false);
  const print = useSignal(false);
  const count = useSignal(0);
  const countt = useSignal(0);

  // const variant = useSignal<'contained' | 'outlined' | 'text'>('contained');
  // show.value = true

  const filesOpen$ = $( async () => {
    show.value ? show.value = false : show.value = true;
  });

  const printOpen$ = $( async () => {
    print.value ? print.value = false : print.value = true;
  });

  const filesClose$ = $( async () => {
    show.value ? show.value = false : show.value = true;
    setTimeout(function () {
      document.getElementById('printersshow').click();
    }, 200);
  });

  const printClose$ = $( async () => {
    print.value ? print.value = false : print.value = true;
    setTimeout(function () {
      document.getElementById('filesshow').click();
    }, 200);
  });


const renderButtonfiles = (
    <> 
      <button id="filesshow" className="bottonnav" onClick$={filesOpen$}>Files</button>
    </>
 );

 const renderButtonprinters = (
  <> 
    <button id="printersshow" className="bottonnav" onClick$={printOpen$}>Printers</button>
  </>
);


const closeFiles = (
  <> 
    <button id="filesclose" className="bottonnav" onClick$={filesClose$}><span class="material-icons">toggle_off</span></button>
  </>
);

const closePrinters = (
  <> 
    <button id="printersclose" className="bottonnav" onClick$={printClose$}><span class="material-icons">toggle_on</span></button>
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
      {/* <button className="bottonnav" onClick$={() => (show.value ? show.value = false : show.value = true)}>Files</button> */}
      {show.value ? closeFiles : renderButtonprinters}  
      {print.value ? closePrinters : renderButtonfiles}

      {show.value && <TableApp client:visible>Slider is {count.value}</TableApp>}
      {print.value && <PrinterApp client:visible>Slider is {countt.value}</PrinterApp>}
      
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: 'DHR files manager',
};
