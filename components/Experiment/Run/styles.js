import styled from 'styled-components';


export const StyledBox = styled.div`
  height: -webkit-fill-available;
  height: 100%;
  height: -moz-available;          /* WebKit-based browsers will ignore this. */
  height: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  height: fill-available;
`

export const StyledExperiment = styled.div`
  #expBox {
    /* Layout */
    --width-container: 900px;
    --width-min-container: 320px;
    --height-min-header-footer: 8vh;
    --padding-internal: 24px;
    --border-radius-container: 5px;
    --border-radius-content: 4px;
    /* Typography */
    --font-family: "Arial", sans-serif;
    --font-family-mono: Droid Mono, Menlo, Consolas, monospace;
    --font-size: 18px;
    --line-height: 1.4em;
    /* (line height is specified in em so that it adapts to varying font sizes) */
    --paragraph-margin-vertical: 18px;
    --paragraph-margin-vertical: var(--font-size);
    /* Colors */
    --color-border: #e5e5e5;
    --color-border-internal: #efefef;
    --color-gray-background: #f8f8f8;
    --color-gray-content: #8d8d8d;
  }

  /* Set box model to border-box globally */
  #expBox {
    box-sizing: border-box;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }

  /* Content layout */
  body {
    margin: 0;
    width: inherit;
    height: inherit;
  }

  .container {
    /* min-width: 320px;
    min-width: var(--width-min-container);
    min-height: 8vh;
    min-height: var(--height-min-header-footer); */
    /* Use page-style layout by default */
    width: inherit;
    height: inherit;
    margin: 0px auto;
    /* margin: 24px auto; */
    /* margin: var(--padding-internal) auto; */
    /* width: 900px;
    width: var(--width-container); */
  }
  header, footer, main {
    padding: 24px;
    padding: var(--padding-internal);
  }
  /* Individual parts: Height, borders and background */
  header, footer {
    min-height: 8vh;
    min-height: var(--height-min-header-footer);
  }
  main {
    min-height: 8vh;
    min-height: var(--height-min-header-footer);
  }

  /* Fullscreen layout */
  .container.fullscreen {
    /* Full screen minus margins */
    /* margin: 24px; */
    /* margin: var(--padding-internal); */
    /* min-height: calc(100vh - 2*24px);
    min-height: calc(100vh - 2*var(--padding-internal));
    width: calc(100vw - 2*24px);
    width: calc(100vw - 2*var(--padding-internal)); */
    width: inherit;
    height: inherit;
    margin: 0px;
    /* Display content using flexboxes */
    display: flex;
    flex-direction: column;
  }
  .container.fullscreen main {
    /* Flex positioning */
    flex: 1;
  }

  /* Frameless layout */
  .container.frameless {
    margin: 0;
    border: none;
    border-radius: 0;
  }
  .container.fullscreen.frameless {
    width: 100vw;
    min-height: 100vh;
  }

  /* Remove frame on small screens */
  @media (max-width: 600px), (max-height: 600px) {
    .container.fullscreen {
      margin: 0;
      border: none;
      border-radius: 0;
      width: 100vw;
      min-height: 100vh;
    }
  }

  /* Flexbox fix for IE11, per https://github.com/philipwalton/flexbugs */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    body {
      display: flex;
    }
    .container.fullscreen {
      /* IE11 miscalculates the height, so add some slack */
      min-height: calc(100vh - 3*24px);
      min-height: calc(100vh - 3*var(--padding-internal));
    }
  }

  /* Borders and backgrounds */
  .container {
    border: 1px solid #e5e5e5;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    border-radius: var(--border-radius-container);
  }
  header {
    border-bottom: 1px solid #efefef;
    border-bottom: 1px solid var(--color-border-internal);
  }
  footer {
    border-top: 1px solid #efefef;
    border-top: 1px solid var(--color-border-internal);
    background-color: #f8f8f8;
    background-color: var(--color-gray-background);
  }

  /* Typography */
  :root {
    font-family: "Arial", sans-serif;
    font-family: var(--font-family);
    font-size: 18px;
    font-size: var(--font-size);
    line-height: 1.4em;
    line-height: var(--line-height);
  }
  header, footer, main {
    /* Set display style explicitly for legacy browsers
       that are unfamiliar with these elements */
    display: block;
    text-align: center;
  }
  h1, h2, h3 {
    line-height: 1.4em;
    line-height: var(--line-height);
  }
  hr {
    border: none;
    border-top: 2px solid #e5e5e5;
    border-top: 2px solid var(--color-border)
  }

  /* Special elements: Keyboard buttons */
  kbd {
    /* Positioning */
    display: inline-block;
    min-width: 1.5rem;
    min-height: 1.5rem;
    padding: 0 0.3rem;
    padding-top: 0.15rem;
    /* Fonts */
    font-family: Droid Mono, Menlo, Consolas, monospace;
    font-family: var(--font-family-mono);
    font-size: 0.9rem;
    text-align: center;
    /* Background and border */
    background-color: white;
    border-radius: 4px;
    border-radius: var(--border-radius-content);
    border: 1px solid rgb(180, 180, 180);
  }
  kbd.big {
    font-size: 1.4rem;
    padding-top: 0.375rem;
    border-radius: 0.125rem;
  }

  /* Alignment helpers */
  .w-100 {
    width: 100%;
  }
  .w-s {
    max-width: 320px;
    max-width: var(--width-min-container);
  }
  .w-m {
    max-width: calc(1.5 * 320px);
    max-width: calc(1.5 * var(--width-min-container));
  }
  .w-l {
    max-width: calc(2 * 320px);
    max-width: calc(2 * var(--width-min-container));
  }
  /* Block alignment based on flexbox */
  .content-vertical-top,
  .content-vertical-center,
  .content-vertical-bottom,
  .content-horizontal-left,
  .content-horizontal-center,
  .content-horizontal-right,
  .content-horizontal-space-between,
  .content-vertical-space-between,
  .content-horizontal-space-around,
  .content-vertical-space-around {
    display: flex;
  }
  .content-vertical-top {
    align-items: flex-start;
  }
  .content-vertical-center {
    align-items: center;
  }
  .content-vertical-bottom {
    align-items: flex-end;
  }
  .content-horizontal-left {
    justify-content: flex-start;
  }
  .content-horizontal-center {
    justify-content: center;
  }
  .content-horizontal-right {
    justify-content: flex-end;
  }
  .content-horizontal-space-between,
  .content-vertical-space-between {
    justify-content: space-between;
  }
  .content-horizontal-space-around,
  .content-vertical-space-around {
    justify-content: space-around;
  }
  .content-vertical-space-around,
  .content-vertical-space-between {
    flex-direction: column;
  }
  .content-vertical-space-between.content-horizontal-right,
  .content-vertical-space-around.content-horizontal-right {
    align-items: flex-start;
  }
  .content-vertical-space-between.content-horizontal-center,
  .content-vertical-space-around.content-horizontal-center {
    align-items: center;
  }
  .content-vertical-space-between.content-horizontal-right,
  .content-vertical-space-around.content-horizontal-right {
    align-items: flex-end;
  }
  /* Text alignment */
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }
  .text-muted {
    color: #8d8d8d;
    color: var(--color-gray-content);
  }
  .text-muted a {
    color: rgb(60, 89, 156);
  }
  small, .small {
    font-size: 0.9rem;
  }
  .font-weight-bold {
    font-weight: bold;
  }
  .font-italic {
    font-style: italic;
  }
  code {
    font-family: Droid Mono, Menlo, Consolas, monospace;
    font-family: var(--font-family-mono);
    background-color: #f8f8f8;
    background-color: var(--color-gray-background);
    padding: 2px;
    border-radius: 2px;
  }

  /* Visibility */
  .invisible {
    visibility: hidden;
  }
  .hidden {
    display: none;
  }
  .hide-if-empty:empty {
    display: none
  }

  /* Alerts */
  .alert {
    border: 2px solid #e5e5e5;
    border: 2px solid var(--color-border);
    border-radius: 4px;
    border-radius: var(--border-radius-content);
    padding: 16px 16px 14px;
    margin: 16px 0;
  }
  .alert.alert-danger {
    color: #a02c2c;
    border-color: #a02c2c;
  }
  .alert.alert-warning {
    color: #f6a902;
    border-color: #ffb400;
  }

  /* Background styles (experimental) */
  .alert, .background-dark {
    background-color: #f8f8f8;
    background-color: var(--color-gray-background);
  }
  .alert.alert-danger, .background-danger {
    background-color: #e9afaf;
  }
  .alert.alert-warning, .background-warning {
    background-color: #ffe6a5;
  }
  .background-ok {
    background-color: #c3e6cb;
  }

  /* Form elements */
  input, select, button, textarea {
    font-family: "Arial", sans-serif;
    font-family: var(--font-family);
    font-size: 0.9rem;
    line-height: 1.4em;
    line-height: var(--line-height);
    border: 2px solid #e5e5e5;
    border: 2px solid var(--color-border);
    border-radius: 4px;
    border-radius: var(--border-radius-content);
    margin: 8px 0;
    padding: 8px;
  }
  input[type="checkbox"] {
    margin: 0 10px;
  }
  input[type="range"] {
    border: none;
  }
  input + label {
    margin-left: 2px;
  }
  select {
    padding: 8px 5px; /* selects have a weird vertical alignment */
  }
  button {
    background-color: white;
    border-radius: 3px;
    padding: 8px 8px 6px;
  }
  button:hover {
    border-color: #ddd;
    background-color: #fcfcfc;
  }
  textarea {
    display: block;
    margin: 18px 0;
    margin: var(--paragraph-margin-vertical) 0;
    resize: vertical;
  }
  /* Input groups */
  .input-group {
    display: inline-table;
    margin: 8px 0;
  }
  .input-group * {
    display: table-cell;
    border-radius: 0px;
  }
  .input-group input {
    margin: 0;
  }
  .input-group *:first-child {
    border-radius: 4px 0 0 4px;
  }
  .input-group *:last-child {
    border-radius: 0 4px 4px 0;
  }
  .input-group .input-group-addon {
    background-color: #e5e5e5;
    background-color: var(--color-border);
    border: 2px solid #e5e5e5;
    border: 2px solid var(--color-border);
    padding: 0 10px;
  }

  /* Table */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table td, table th {
    padding: 10px 8px 8px;
  }
  /* Table borders (except for plain) */
  table:not(.table-plain) > tr > td,
  table:not(.table-plain) > tr > th,
  table:not(.table-plain) > tbody > tr > td,
  table:not(.table-plain) > tbody > tr > th {
    border-bottom: 2px solid #e5e5e5;
    border-bottom: 2px solid var(--color-border);
  }
  table:not(.table-plain) > tr:last-child > td,
  table:not(.table-plain) > tr:last-child > th,
  table:not(.table-plain) > tbody > tr:last-child > td,
  table:not(.table-plain) > tbody > tr:last-child > th {
    border-bottom: 2px solid transparent;
  }
  /* Striped rows */
  table.table-striped tr:nth-child(odd) td {
    background-color: #efefef;
    background-color: var(--color-border-internal)
  }

  /* Progress bar */
  .progress {
    width: 100%;
    height: 8px;
    overflow: hidden;
    margin: 0.2rem 0 0.4rem;
    border-radius: 2px;
    border: 1px solid #e5e5e5;
    border: 1px solid var(--color-border);
  }
  .progress .progress-bar {
    width: 0%;
    min-height: 8px;
    background-color: #f8f8f8;
    background-color: var(--color-gray-background);
    border-right: 1px solid #efefef;
    border-right: 1px solid var(--color-border-internal);
    box-sizing: content-box;
  }

  /* Popovers */
  .popover {
    position: absolute;
    top: 0;
    -webkit-animation-duration: 0.5s;
            animation-duration: 0.5s;
    -webkit-animation-name: popover;
            animation-name: popover;
  }

  /* Width, for some reason, needs to be set explicitly */
  .container.fullscreen .popover {
    width: calc(100vw - 2*24px);
    width: calc(100vw - 2*var(--padding-internal));
  }

  .popover > * {
    width: 80%;
    margin: 0 auto;
  }

  .container:not(.fullscreen) .popover {
    width: 900px;
    width: var(--width-container);
  }

  /* Slide in from the top */
  @-webkit-keyframes popover {
    from {
      -webkit-transform: translate3d(0, -100%, 0);
              transform: translate3d(0, -100%, 0);
    }

    to {
      -webkit-transform: none;
              transform: none;
    }
  }
  @keyframes popover {
    from {
      -webkit-transform: translate3d(0, -100%, 0);
              transform: translate3d(0, -100%, 0);
    }

    to {
      -webkit-transform: none;
              transform: none;
    }
  }

  .popover > .alert:first-child {
    border-width: 1px;
    position: relative;
    padding-top: 24px;
    top: -8px;
  }
`
