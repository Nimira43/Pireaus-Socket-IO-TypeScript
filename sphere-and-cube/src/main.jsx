import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Demo from './Demo'
import './style.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    <Canvas>
      <Demo />
    </Canvas>
  </>
)