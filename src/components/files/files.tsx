
import { component$, $ } from '@builder.io/qwik';
import { HeaderLogo } from '~/components/header-logo/header-logo';

/**
 * The Files component 
 */

export const Files = component$(() => {

  const logOut$ = $( async () => {
    ((localStorage.getItem("logged") == 'true') ? window.localStorage.setItem('logged', 'false') : window.localStorage.setItem('logged', 'false'));
    ((localStorage.getItem("logged") == 'false') ? location.reload() : location.reload());
  });

  return (
    <>
        <div class="main">
        <span class="center uploadicon" id="uploadicon"><i class="fa fa-cloud-upload fa_custom fa-4x"></i></span>
          <HeaderLogo/>
          <span className="logoutbutton" onClick$={logOut$}> <i class="fa fa-sign-out"></i> Logout</span>
          <div class="container">
          <button style="display:none;" id="deleterow">DELETE ROW</button>
          <table id="table" class="display" cellSpacing="0" width="100%">
            <thead>
            <tr>
                <th>title</th>
                <th id="prcol">priority</th>
                <th id="cpcol">copies</th>
                <th id="printed">printed</th>
                <th id="filament">filament</th>
                <th id="actions">actions</th>
            </tr>
            </thead>
          </table>
            <div id="loading-bar-spinner" class="spinner"><div class="spinner-icon"></div></div>
            <div class="min50 dark"></div>
          </div>
          <form id="data" method="post" encType="multipart/form-data"> 
            <input class="input pointer drop_box" id="file" name="file" type="file" accept=".gcode" required/>
          </form>
        </div>
    </>
  );
});
