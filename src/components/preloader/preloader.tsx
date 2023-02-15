import { component$ } from '@builder.io/qwik';

/**
 * The PreLoader component 
 */
export const PreLoader = component$(() => {

  return (
    <>
    <div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
    </div>
    <script type="text/javascript" src="./src/assets/js/preloader.js" />
    </>
  );
});
