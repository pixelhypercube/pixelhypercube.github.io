import math
import json

# --- Configuration & Parameters ---
GRID_SIZE = 60          # Overall size of the 3D grid
CENTER = GRID_SIZE // 2 # Center coordinate (30, 30, 30)

# Sphere parameters
SPHERE_RADIUS = 2
SPHERE_COLOR = "61DAFB" # The vibrant color for the nucleus

# Orbit (Torus) parameters
ORBIT_MAJOR_RADIUS = 16 # Distance from center to the middle of the orbit tube
ORBIT_MINOR_RADIUS = 1.1 # Thickness of the orbit tube
ORBIT_COLOR = "61DAFB"   # The blue color for the orbits

# Angles for the three orbits in degrees: (X-axis, Y-axis, Z-axis)
# Orbit 1: Flat horizontally
# Orbit 2: Tilted on X and twisted on Y
# Orbit 3: Tilted further on X, twisted opposite on Y, and slightly tilted on Z
ORBIT_ANGLES = [
    (0, 0, 0),          
    (60, 60, -60),        
    (120, 120, 60)      
]

# --- 3D Rotation Math ---
def rotate_x(y, z, angle_degrees):
    """Rotates a point around the X-axis."""
    rad = math.radians(angle_degrees)
    y_new = y * math.cos(rad) - z * math.sin(rad)
    z_new = y * math.sin(rad) + z * math.cos(rad)
    return y_new, z_new

def rotate_y(x, z, angle_degrees):
    """Rotates a point around the Y-axis."""
    rad = math.radians(angle_degrees)
    x_new = x * math.cos(rad) + z * math.sin(rad)
    z_new = -x * math.sin(rad) + z * math.cos(rad)
    return x_new, z_new

def rotate_z(x, y, angle_degrees):
    """Rotates a point around the Z-axis."""
    rad = math.radians(angle_degrees)
    x_new = x * math.cos(rad) - y * math.sin(rad)
    y_new = x * math.sin(rad) + y * math.cos(rad)
    return x_new, y_new

def is_in_torus(x, y, z, angles):
    """Checks if a given x,y,z coordinate falls inside a 3D-rotated torus."""
    ang_x, ang_y, ang_z = angles
    
    # To test if our current grid point is inside a rotated torus, 
    # we apply reverse rotations to the point in reverse order (Z, then Y, then X)
    # and then check it against a flat, horizontal base torus.
    x_rot, y_rot = rotate_z(x, y, -ang_z)
    x_rot, z_rot = rotate_y(x_rot, z, -ang_y)
    y_rot, z_rot = rotate_x(y_rot, z_rot, -ang_x)
    
    # Distance to the Y-axis (since base torus lays flat in the XZ plane)
    dist_xz = math.sqrt(x_rot**2 + z_rot**2)
    
    # Distance to the core of the torus tube
    tube_dist = math.sqrt((dist_xz - ORBIT_MAJOR_RADIUS)**2 + y_rot**2)
    
    return tube_dist <= ORBIT_MINOR_RADIUS

def generate():
    voxels = []
    
    print("Generating 3D voxels...")
    for x in range(GRID_SIZE):
        for y in range(GRID_SIZE):
            for z in range(GRID_SIZE):
                # Shift coordinates so (0,0,0) is at the CENTER of the grid
                dx = x - CENTER
                dy = y - CENTER
                dz = z - CENTER
                
                # 1. Check if the point belongs to the central sphere
                if math.sqrt(dx**2 + dy**2 + dz**2) <= SPHERE_RADIUS:
                    voxels.append(f"{x},{y},{z},{SPHERE_COLOR},1")
                    continue
                    
                # 2. Check if the point belongs to any of the 3 angled orbits
                in_orbit = False
                for angles in ORBIT_ANGLES:
                    if is_in_torus(dx, dy, dz, angles):
                        in_orbit = True
                        break
                        
                if in_orbit:
                    voxels.append(f"{x},{y},{z},{ORBIT_COLOR},1")
                    
    return voxels

# --- Main Execution ---
if __name__ == "__main__":
    generated_voxels = generate()
    voxel_string = ";".join(generated_voxels) + ";"
    voxel_count = len(generated_voxels)
    
    print(f"Successfully generated {voxel_count} voxels.")

    # Your original JSON template with updated voxel data
    output_json = {
        "version": "Voxel Builder 4.8.2",
        "project": {
            "name": "3D Atom Model Multi-Axis",
            "voxels": voxel_count
        },
        "camera": {
            "offset": 2.5,  
            "fov": 0.8,
            "fstop": 1.4,
            "focal": 25
        },
        "render": {
            "dpr": 0.8,
            "samples": 512,
            "bounces": 1,
            "tiles": 4,
            "tonemap": 0,
            "environment": {
                "background": False,
                "power": 0.65,
                "blur": 0.05
            },
            "lights": {
                "directional": {
                    "color": "#FFE484",
                    "intensity": 0.8
                }
            },
            "materials": {
                "default": {
                    "roughness": 0.8,
                    "metalness": 0,
                    "transmission": 0,
                    "emissive": "#5EC3C5",
                    "emissive_intensity": 2
                }
            }
        },
        "data": {
            "voxels": voxel_string
        }
    }

    # Write to file
    with open("react.json", "w") as f:
        json.dump(output_json, f, indent=4)
        
    print("Saved to 'react.json'!")