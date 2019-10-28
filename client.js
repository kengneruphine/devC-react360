// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"
var GLOBAL_H = "hello guys"
import {ReactInstance, Surface} from 'react-360-web';
      // Initialize the React 360 application
import {Module} from 'react-360-web';

// instance used for wide application data storage
class TemporalStore extends Module {
  quiz = {  
    answerSelected: false,
    answerFound: false
  }
  constructor() {
      super('TemporalStore'); // Makes this module available at NativeModules.MyModule
  }
  // This method will be exposed to the React app
}


function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [ new TemporalStore()],
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
    Surface.SurfaceShape.Flat, /* shape */
    r360.renderToSurface(
      r360.createRoot('Index', {  }),
      r360.getDefaultSurface()
    ));
  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));

  // setup storage
  //await AsyncStorage.setItem('quiz', JSON.stringify({ answerFound: false, answer: null}))
}

window.React360 = {init};
