import { MemoryRouter as Router, Route} from 'react-router';
import { Surface } from 'react-360-web' 
export function card(angle, width, height){ // dim [width, height]
    const w = width || 500
    const h = height || 300 
    let Card = new Surface(
        w,
        h,
        Surface.SurfaceShape.Flat /* shape */
      );
      angle ? Card.setAngle(...angle) : ""
      return Card
}
export function history(){
  return Router()
} 