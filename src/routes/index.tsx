import { component$, useStore, $, useOnWindow} from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Files } from '~/components/files/files';


import '~/assets/css/toastr.min.css';
import '~/assets/css/style.min.css';
import '~/assets/css/jquery.dataTables.min.css';
import '~/assets/css/jquery-confirm.min.css';
import '~/assets/css/font-awesome.min.css';


export default component$(() => {

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
    })
  );

  return (
    <>  
        <script type="text/javascript" src="./src/assets/js/jquery.dataTables.min.js" />
        <script type="text/javascript" src="./src/assets/js/dataTables.buttons.min.js" />
        <script async type="text/javascript" src="./src/assets/js/scripts.min.js" />
        <script async type="text/javascript" src="./src/assets/js/jquery-confirm.min.js" />
        <script async type="text/javascript" src="./src/assets/js/toastr.min.js" />
        <Files/> 
    </>
  );

});


export const head: DocumentHead = {
  title: 'DHR Engineering - Printers Control Dashboard',
};