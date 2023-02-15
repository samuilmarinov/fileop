import { component$} from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import { Login } from '~/components/login/login';
import { HeaderLogo } from '~/components/header-logo/header-logo';

import '~/assets/css/toastr.min.css';
import '~/assets/css/style.min.css';
import '~/assets/css/jquery.dataTables.min.css';
import '~/assets/css/jquery-confirm.min.css';
import '~/assets/css/font-awesome.min.css';
import '~/assets/css/login.css';

export default component$(() => {

  return (
    <>  
       <HeaderLogo/>
       <Login/>
    </>
  );

});


export const head: DocumentHead = {
  title: 'DHR Engineering - Printers Control Dashboard',
};