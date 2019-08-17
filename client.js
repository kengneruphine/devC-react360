// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });
  
  /*  Render your app content to the default location
  r360.renderToLocation(
    r360.createRoot('Hello360', {  }),
    r360.getDefaultLocation()
  ); */
  // Render your app content to the default cylinder surface
  
  let indexSurface = new Surface(
    1000,
    600,
    Surface.SurfaceShape.Flat /* shape */
  
  r360.renderToSurface(
    r360.createRoot('Index', {  }),
    r360.getDefaultSurface()
  );
  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}

window.React360 = {init};
