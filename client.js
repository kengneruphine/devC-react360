
import {ReactInstance, Surface, Module} from 'react-360-web';
import { card } from './utils'

// instance used for wide application data transport
class TemporalStore extends Module {
  quiz = {  
    answerSelected: false,
    answerFound: false,
    currentQuiz: ''
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
  attachSurface(name, params){
    if(!name || !params)
        return
    const Card = card(params)
    const surface = SurfaceManagement.r360.renderToSurface(
      SurfaceManagement.r360.createRoot(name, {}),
      Card,
      name
    )
    SurfaceManagement.surfaces[name] = surface
  }
  attachLocation(name, params){
    if(!name || !params)
        return
    const Card = card(params)
    const surface = SurfaceManagement.r360.renderToLocation(
      SurfaceManagement.r360.createRoot(name, {}),
      Card,
      name
    )
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
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
}
window.React360 = {init};
