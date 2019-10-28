
import {ReactInstance, Surface, Location, Module} from 'react-360-web';
import { card } from './utils'

// instance used for wide application data transport
class TemporalStore extends Module {
  quiz = {  
    answerSelected: false,
    answerFound: false,
    currentQuiz: ''
  }
  video = {
    currentWatch: "", // selected disease
    watchSelected: 0 // specific video selected
  }
  constructor() {
      super('TemporalStore')
  }
}
class SurfaceManagement extends Module{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  static surfaces = {}
  static props = null
  static r360 = null
  constructor(surfaces){
    super('SurfaceManagement')
  }
  detachSurface(name){
    if(name && SurfaceManagement.surfaces[name])
      SurfaceManagement.r360.detachRoot(SurfaceManagement.surfaces[name])
  }
  attachSurface(name, params, w, h){
    if(!name || !params)
        return
    const Card = card(params, w, h) 
    const surface = SurfaceManagement.r360.renderToSurface(
      SurfaceManagement.r360.createRoot(name, {}),
      Card,
      name
    )
    SurfaceManagement.surfaces[name] = surface
  }
  attachExploreSurface(name, type, params){
    if(!name || !type || !params)
        return
    const panel = new Surface(params[0], params[1], type);
    panel.setAngle(params[2], params[3]);
    const surface = SurfaceManagement.r360.renderToSurface(
      SurfaceManagement.r360.createRoot(name),
        panel,
    );
    SurfaceManagement.surfaces[name] = surface
  }
  attachLocation(name, params){
    if(!name || !params)
        return
    const surface = SurfaceManagement.r360.renderToLocation(
      SurfaceManagement.r360.createRoot(name),
      new Location([params[0], params[1], params[2]]),
    );
    SurfaceManagement.surfaces[name] = surface
  }
  detachAll(){
    for(let surface in SurfaceManagement.surfaces){
      SurfaceManagement.r360.detachRoot(SurfaceManagement.surfaces[surface])
    }
  }
}

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [ new TemporalStore(), new SurfaceManagement()],
    ...options,
  })
  SurfaceManagement.r360 = r360
  const IndexSurface = r360.getDefaultSurface();
  //IndexSurface.setShape(Surface.SurfaceShape.Flat);
  r360.renderToSurface(
    r360.createRoot('Index', {  }),
    IndexSurface,
    'Index'
  )
  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360_world3.jpg'));
  
}
window.React360 = {init};
