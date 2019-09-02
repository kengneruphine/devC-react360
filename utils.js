
import { Surface } from 'react-360-web' 
export function card(angle){
    let Card = new Surface(
        500, /* width */
        300, /* height */
        Surface.SurfaceShape.Flat /* shape */
      );
      angle ? Card.setAngle(...angle) : ""
      return Card
}