import { component$, $ } from '@builder.io/qwik';
import { HeaderLogo } from '~/components/header-logo/header-logo';


/**
 * The Printers component 
 */

export const Printers = component$(() => {

  const logOut$ = $( async () => {
    ((localStorage.getItem("logged") == 'true') ? window.localStorage.setItem('logged', 'false') : window.localStorage.setItem('logged', 'false'));
    ((localStorage.getItem("logged") == 'false') ? location.reload() : location.reload());
  });

  return (
    <>

    <div class="main">
      <HeaderLogo/>
      <span className="logoutbutton" onClick$={logOut$}> <i class="fa fa-sign-out"></i> Logout</span>
      <div class="min60"></div>
      <a class="backbutton" href="/"> &larr; Back </a>
      <div id="containermain" class="container">
        <div id="loading-bar-spinner" class="spinner">
          <div class="spinner-icon">
          </div>
        </div>
      </div>
    </div>

    </>
  );
});
