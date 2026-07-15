"use client"
import { Bounds, Center, Environment, MeshDistortMaterial, OrbitControls, PerspectiveCamera, Stage, useBounds, View } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
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

function CustomVoxel({voxelJson, size=1}: CustomVoxelProps) {
    const voxels = useMemo(()=>{
        if (!voxelJson?.data?.voxels) return [];
        const rawVoxels = voxelJson.data.voxels.split(";");
        
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;

        // parse coords and keep track of outer boundaries
        const parsed = rawVoxels
            .filter((v: string)=>v.trim() !== "") 
            .map((v: string)=>{
                const [x, y, z, color] = v.split(",");
                const nX = parseInt(x);
                const nY = parseInt(y);
                const nZ = parseInt(z);

                if (nX < minX) minX = nX; if (nX > maxX) maxX = nX;
                if (nY < minY) minY = nY; if (nY > maxY) maxY = nY;
                if (nZ < minZ) minZ = nZ; if (nZ > maxZ) maxZ = nZ;

                const hexColor = color.startsWith('#') ? color : `#${color}`;
                return {
                    position: [nX, nY, nZ] as [number, number, number],
                    color: hexColor
                };
            });

        // compute geometric center of the model cloud
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const centerZ = (minZ + maxZ) / 2;

        // shift every coordinate so the entire model is natively centered at (0, 0, 0)
        return parsed.map((v: any) => ({
            ...v,
            position: [
                v.position[0] - centerX,
                v.position[1] - centerY,
                v.position[2] - centerZ
            ] as [number, number, number]
        }));
    },[voxelJson]);

    const colorGroups = useMemo(()=>{
        const map = new Map<string, [number, number, number][]>();
        for (const v of voxels) {
            if (!map.has(v.color)) map.set(v.color,[]);
            map.get(v.color)!.push(v.position);
        }
        return map;
    },[voxels]);

    const materialProps = voxelJson?.render?.materials?.default || { roughness: 0.8, metalness: 0 };
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

interface Canvas3DProps {
    voxelJson: Record<string, any>;
    className?: string;
    fov?: number;
    autoRotateSpeed?: number;
    camPosition?: [number, number, number];
}

export default function Canvas3D({voxelJson, className, fov, autoRotateSpeed, camPosition} : Canvas3DProps) {
    if (!voxelJson?.data) return null;

    const sizeClasses = className || "w-full h-full";

    const { ref, inView } = useInView({
        threshold: 0.5, 
        triggerOnce: false
    });

    const [layoutSettled, setLayoutSettled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLayoutSettled(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={ref} className={`${sizeClasses} relative inline-block content-center overflow-hidden`}>
            {layoutSettled && (
                <View className={`${sizeClasses} pointer-events-auto inline-block overflow-hidden`}>
                    <PerspectiveCamera makeDefault position={camPosition ?? [0, 20, 40]} fov={fov ?? 55} />

                    <ambientLight intensity={0.5}/>
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <Environment preset="city"/>
                    
                    {/* Centering is handled directly by data calculations; Center and Bounds wrappers removed */}
                    <group visible={inView}>
                        <CustomVoxel voxelJson={voxelJson}/>
                    </group>

                    <OrbitControls
                        makeDefault
                        enableZoom={false}
                        enablePan={false}
                        autoRotate={inView}
                        autoRotateSpeed={autoRotateSpeed ?? 0.5} 
                    />
                </View>
            )}
        </div>
    )
}