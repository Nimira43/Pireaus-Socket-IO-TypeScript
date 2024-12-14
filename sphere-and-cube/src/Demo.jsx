import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Demo () {
  const boxRef = useRef()
	useFrame(() => {
    boxRef.current.rotation.y += 0.01
  })
  return (
    <>
      <directionalLight position={ [ 1, 2, 3 ] }  intensity = {5}/>
      <ambientLight intensity = {1}/>
      <mesh position-x={ - 4 }>
        <sphereGeometry />
        <meshPhongMaterial color="black" />
      </mesh>
      <mesh ref={boxRef} rotation-x={ Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.4 } scale={ 8 }>
        <planeGeometry />
        <meshStandardMaterial color="orangered" />
      </mesh>
    </>
  )
}