"use client"
import { Bounds, Center, Environment, MeshDistortMaterial, OrbitControls, PerspectiveCamera, Stage, useBounds, View } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"

interface CustomVoxelProps {
    voxelJson: Record<string,any>;
    size?: number;
}

function InstancedColor({color, positions, geometry, materialProps} : {
    color:string;
    positions:[number,number,number][];
    geometry:THREE.BoxGeometry;
    materialProps: {roughness:number,metalness:number}
}) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // const bounds = useBounds();

    useEffect(()=>{
        if (!meshRef.current) return;
        const matrix = new THREE.Matrix4();
        positions.forEach((pos,i)=>{
            matrix.setPosition(...pos);
            meshRef.current!.setMatrixAt(i,matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;

        meshRef.current.computeBoundingBox();
        meshRef.current.computeBoundingSphere();

        // bounds.refresh().fit();

    },[positions]);

    return (
        <instancedMesh ref={meshRef} args={[geometry,undefined,positions.length]}>
            <meshStandardMaterial
                color={color}
                roughness={materialProps.roughness}
                metalness={materialProps.metalness}
                emissive={color}
                emissiveIntensity={0.1}
            />
        </instancedMesh>
    )
}

function CustomVoxel({voxelJson,size=1}: CustomVoxelProps) {
    const voxels = useMemo(()=>{
        if (!voxelJson?.data?.voxels) return [];
        const rawVoxels = voxelJson.data.voxels.split(";");
        return rawVoxels
        .filter((v: string)=>v.trim() !== "") // rem empty strings
        .map((v: string)=>{
            const [x,y,z,color] = v.split(",");
            const hexColor = color.startsWith('#') ? color : `#${color}`;
            return {
                position: [parseInt(x),parseInt(y),parseInt(z)],
                color:hexColor
            };
        })
    },[voxelJson]);


    const colorGroups = useMemo(()=>{
        const map = new Map<string, [number, number, number][]>();
        for (const v of voxels) {
            if (!map.has(v.color)) map.set(v.color,[]);
            map.get(v.color)!.push(v.position);
        }
        return map;
    },[voxels]);


    const materialProps = voxelJson?.render?.materials?.default || { roughness: 0.8, metalness: 0 }; // safety check
    const geometry = useMemo(()=>new THREE.BoxGeometry(size,size,size),[size]);

    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef}>
            {Array.from(colorGroups.entries()).map(([color, positions])=>(
                <InstancedColor
                    key={color}
                    color={color}
                    positions={positions}
                    geometry={geometry}
                    materialProps={materialProps}
                />
            ))}
        </group>
    )
}
// function VoxelSphere({radius=3, size=0.4, gap=0}) {
//     const voxels = useMemo(()=>{
//         const res = [];
       
//         const step = size + gap;
//         for (let x = -radius;x<=radius;x+=step) {
//             for (let y = -radius;y<=radius;y+=step) {
//                 for (let z = -radius;z<=radius;z+=step) {
//                     if (Math.sqrt(x*x+y*y+z*z)<=radius) {
//                         res.push([x,y,z]);
//                     }
//                 }
//             }
//         }
//         return res;
//     }, [radius,size,gap]);
//     return (
//         <group>
//             {voxels.map((pos,i)=>(
//                 <mesh key={i} position={pos as [number, number, number]}>
//                     <boxGeometry args={[size, size, size]} />
//                     <meshStandardMaterial color="#ffe9bf" />
//                 </mesh>
//             ))}
//         </group>
//     )
// }
// function Model() {
//     return (
//         <group>
//             <mesh>
//                 <boxGeometry args={[1,1,1]}/>
//                 <MeshDistortMaterial color={"#ffffff"} speed={2}/>
//             </mesh>
//         </group>
//     )
// }
interface Canvas3DProps {
    voxelJson: Record<string, any>;
    className?: string;
    fov?: number;
    autoRotateSpeed?: number;
    camPosition?: number;
}
export default function Canvas3D({voxelJson, className, fov, autoRotateSpeed, camPosition} : Canvas3DProps) {
    if (!voxelJson?.data) return null;

    const sizeClasses = className || "w-full h-full";
    return (
        <div className={`${sizeClasses} relative inline-block content-center overflow-hidden`}>
            {/* <Canvas
            camera = {{fov,zoom:0.9}}
            className={`${sizeClasses} pointer-events-auto inline-block overflow-hidden`}> */}
            <View
            // camera = {{fov,zoom:0.9}}
            className={`${sizeClasses} pointer-events-auto inline-block overflow-hidden`}>

                <PerspectiveCamera makeDefault position={camPosition ?? [0, 20, 40]} fov={fov} />

                <ambientLight intensity={0.5}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <Environment preset="city"/>
                <Bounds fit clip observe margin={1.2}>
                    <Center>
                        <CustomVoxel voxelJson={voxelJson}/>
                    </Center>
                </Bounds>
                <OrbitControls
                makeDefault
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={autoRotateSpeed ?? 0.5} />
            </View>
            {/* </Canvas> */}
        </div>
    )
}