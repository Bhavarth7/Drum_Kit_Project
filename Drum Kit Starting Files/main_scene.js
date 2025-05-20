// Ensure Three.js is loaded
if (typeof THREE === 'undefined') {
  console.error('THREE object is not defined. Ensure Three.js is loaded via CDN before this script.');
}

// Get the container element
const drumKitContainer = document.getElementById('drum-kit-container');

if (!drumKitContainer) {
  console.error('The container element with id "drum-kit-container" was not found in the HTML.');
} else {
  // 1. Scene
  const scene = new THREE.Scene();
  const drumElements = {}; // To store drum meshes for easy access by key

  // 2. Camera
  const fov = 75; // Field of View
  // Use clientWidth/clientHeight of the container for aspect ratio
  // Default to a common aspect ratio if dimensions are 0 (e.g., if script runs before CSS loads)
  const aspect = (drumKitContainer.clientWidth === 0 || drumKitContainer.clientHeight === 0)
                 ? window.innerWidth / window.innerHeight
                 : drumKitContainer.clientWidth / drumKitContainer.clientHeight;
  const near = 0.1; // Near clipping plane
  const far = 1000; // Far clipping plane
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // Position the camera
  camera.position.x = 0;
  camera.position.y = 2; // Slightly elevated
  camera.position.z = 5; // Back enough to see the origin (where drums will be centered)
  camera.lookAt(0, 0, 0); // Look at the center of the scene

  // 3. Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing
  renderer.setSize(drumKitContainer.clientWidth || window.innerWidth, drumKitContainer.clientHeight || window.innerHeight); // Set size, fallback to window size
  renderer.setClearColor(0x000000); // Set background color to black
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: for softer shadows

  // 4. Append renderer's DOM element to the container
  drumKitContainer.appendChild(renderer.domElement);

  // Function to create and add drum kit elements
  function createDrumKit() {
    // Materials - Refined for better visuals
    const kickMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000, roughness: 0.7, metalness: 0.1 }); // Dark Red, matte
    const snareMaterial = new THREE.MeshStandardMaterial({ color: 0xA9A9A9, roughness: 0.6, metalness: 0.2 }); // Dark Grey, slightly glossy shell
    const tomMaterial1 = new THREE.MeshStandardMaterial({ color: 0x00008B, roughness: 0.7, metalness: 0.1 }); // Dark Blue, matte
    const tomMaterial2 = new THREE.MeshStandardMaterial({ color: 0x006400, roughness: 0.7, metalness: 0.1 }); // Dark Green, matte
    const tomMaterial3 = new THREE.MeshStandardMaterial({ color: 0x4B0082, roughness: 0.7, metalness: 0.1 }); // Indigo, matte
    const cymbalMaterial = new THREE.MeshStandardMaterial({ color: 0xB8860B, roughness: 0.3, metalness: 0.9 }); // DarkGoldenRod, shiny metal

    // Geometries
    // Kick Drum (large cylinder)
    // THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
    const kickGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.8, 32);
    const kickDrum = new THREE.Mesh(kickGeometry, kickMaterial);
    kickDrum.position.set(0, 0.4, -1); // Centered, slightly back, on the "floor"
    kickDrum.rotation.x = Math.PI / 2; // Rotate to lay it on its side
    kickDrum.castShadow = true; kickDrum.receiveShadow = true;
    scene.add(kickDrum);

    // Snare Drum (medium cylinder, shallower)
    const snareGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const snareDrum = new THREE.Mesh(snareGeometry, snareMaterial);
    snareDrum.position.set(-1.0, 0.9, 0); // To the left of center, raised
    snareDrum.castShadow = true; snareDrum.receiveShadow = true;
    scene.add(snareDrum);

    // Tom 1 (smaller)
    const tom1Geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
    const tom1 = new THREE.Mesh(tom1Geometry, tomMaterial1);
    tom1.position.set(-0.5, 1.2, -0.5);
    tom1.castShadow = true; tom1.receiveShadow = true;
    scene.add(tom1);

    // Tom 2 (medium)
    const tom2Geometry = new THREE.CylinderGeometry(0.35, 0.35, 0.45, 32);
    const tom2 = new THREE.Mesh(tom2Geometry, tomMaterial2);
    tom2.position.set(0.2, 1.25, -0.6);
    tom2.castShadow = true; tom2.receiveShadow = true;
    scene.add(tom2);
    
    // Tom 3 (Floor Tom - larger, on "legs" conceptually)
    const tom3Geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 32);
    const tom3 = new THREE.Mesh(tom3Geometry, tomMaterial3);
    tom3.position.set(1.0, 0.9, 0); // To the right of center, raised like snare
    tom3.castShadow = true; tom3.receiveShadow = true;
    scene.add(tom3);

    // Crash Cymbal (thin, wide radius)
    const crashCymbalGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.03, 32);
    const crashCymbal = new THREE.Mesh(crashCymbalGeometry, cymbalMaterial);
    crashCymbal.position.set(-1.2, 1.8, -0.3);
    crashCymbal.rotation.x = Math.PI / 16; // Slight tilt
    crashCymbal.castShadow = true; crashCymbal.receiveShadow = true;
    scene.add(crashCymbal);

    // Hi-Hat Cymbals (Top & Bottom)
    const hiHatCymbalRadius = 0.4;
    const hiHatCymbalHeight = 0.02;
    const hiHatTopGeometry = new THREE.CylinderGeometry(hiHatCymbalRadius, hiHatCymbalRadius, hiHatCymbalHeight, 32);
    const hiHatTop = new THREE.Mesh(hiHatTopGeometry, cymbalMaterial);
    hiHatTop.position.set(-1.8, 1.5, 0); // Position top hi-hat
    hiHatTop.rotation.x = Math.PI / 16; // Slight tilt
    hiHatTop.castShadow = true; hiHatTop.receiveShadow = true;
    scene.add(hiHatTop);

    const hiHatBottomGeometry = new THREE.CylinderGeometry(hiHatCymbalRadius, hiHatCymbalRadius, hiHatCymbalHeight, 32);
    const hiHatBottom = new THREE.Mesh(hiHatBottomGeometry, cymbalMaterial);
    hiHatBottom.position.set(-1.8, 1.47, 0); // Position bottom hi-hat slightly below top
    hiHatBottom.castShadow = true; hiHatBottom.receiveShadow = true;
    scene.add(hiHatBottom);
    
    // Add some basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight.position.set(2, 5, 5); // x, y, z
    pointLight.castShadow = true; // Enable shadow casting for this light
    // Optional: Configure shadow camera properties for better shadow quality
    pointLight.shadow.mapSize.width = 1024; // default 512
    pointLight.shadow.mapSize.height = 1024; // default 512
    pointLight.shadow.camera.near = 0.5;    // default 0.5
    pointLight.shadow.camera.far = 50;     // default 500
    scene.add(pointLight);

    // Assign meshes to drumElements and add userData
    kickDrum.userData = { drumName: 'a' };
    snareDrum.userData = { drumName: 's' };
    tom1.userData = { drumName: 'd' };
    tom2.userData = { drumName: 'j' };
    tom3.userData = { drumName: 'k' };
    crashCymbal.userData = { drumName: 'w' };
    hiHatTop.userData = { drumName: 'l' }; // Using hiHatTop for 'l' key

    drumElements['a'] = kickDrum;
    drumElements['s'] = snareDrum;
    drumElements['d'] = tom1;
    drumElements['j'] = tom2;
    drumElements['k'] = tom3;
    drumElements['w'] = crashCymbal;
    drumElements['l'] = hiHatTop;
    // Note: hiHatBottom is not directly interactive via a key in this setup

  }

  // Call the function to create the drum kit
  createDrumKit();

  // Simple 3D animation for feedback
  function animateDrum(drumMesh) {
    if (!drumMesh) return;

    const originalPosition = { y: drumMesh.position.y };
    const originalRotation = { x: drumMesh.rotation.x, z: drumMesh.rotation.z };
    const animationDuration = 150; // ms

    // Check if it's a cymbal based on its geometry (very thin height)
    const isCymbal = drumMesh.geometry.parameters.height < 0.1;

    if (isCymbal) {
      // Cymbal wobble: animate rotation.x and rotation.z
      drumMesh.rotation.x -= 0.15; // Tilt forward
      drumMesh.rotation.z += 0.1;  // Tilt sideways

      setTimeout(() => {
        drumMesh.rotation.x = originalRotation.x;
        drumMesh.rotation.z = originalRotation.z;
      }, animationDuration);
    } else {
      // Drum jump: animate position.y (quick downward movement and return)
      // For kick drum, which is rotated, this will be along its local Z axis effectively.
      // We'll use a small position change on the local Y for upright drums.
      if (drumMesh.userData.drumName === 'a') { // Kick drum is rotated
        const localY = new THREE.Vector3(0, -0.05, 0); // Move "down" relative to its orientation
        const worldY = localY.applyQuaternion(drumMesh.quaternion);
        drumMesh.position.add(worldY);
        setTimeout(() => {
          drumMesh.position.sub(worldY); // Revert to original position
        }, animationDuration);
      } else { // Snare and Toms
        drumMesh.position.y -= 0.05; // Slight downward movement
        setTimeout(() => {
          drumMesh.position.y = originalPosition.y; // Revert to original position
        }, animationDuration);
      }
    }
  }

  // Raycasting for mouse clicks
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(drumElements)); // Intersect only with drumElements

    if (intersects.length > 0) {
      const clickedDrum = intersects[0].object;
      if (clickedDrum.userData.drumName) {
        const drumKey = clickedDrum.userData.drumName;
        if (window.makeSound) {
          window.makeSound(drumKey);
        }
        animateDrum(clickedDrum);
      }
    }
  }
  renderer.domElement.addEventListener('click', onMouseClick);

  // Keyboard press handling
  function onKeyPress(event) {
    const key = event.key.toLowerCase(); // w, a, s, d, j, k, l
    if (drumElements[key]) {
      if (window.makeSound) {
        window.makeSound(key);
      }
      animateDrum(drumElements[key]);
    }
  }
  window.addEventListener('keypress', onKeyPress);

  // Handle window resize to keep the scene responsive
  window.addEventListener('resize', () => {
    if (drumKitContainer) {
      const newAspect = (drumKitContainer.clientWidth === 0 || drumKitContainer.clientHeight === 0)
                        ? window.innerWidth / window.innerHeight
                        : drumKitContainer.clientWidth / drumKitContainer.clientHeight;
      
      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(drumKitContainer.clientWidth || window.innerWidth, drumKitContainer.clientHeight || window.innerHeight);
    }
  });

  // 5. Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Future animations/updates will go here
    // For now, it just renders the empty scene

    renderer.render(scene, camera);
  }

  // Start the animation loop
  animate();
  
  // Perform an initial render in case the container dimensions are already set
  // and requestAnimationFrame takes a moment to kick in.
   if (drumKitContainer.clientWidth > 0 && drumKitContainer.clientHeight > 0) {
    renderer.render(scene, camera);
  } else {
    // If container dimensions are not yet set, try a render on next tick,
    // giving CSS a chance to apply.
    setTimeout(() => {
        if (drumKitContainer.clientWidth > 0 && drumKitContainer.clientHeight > 0) {
            renderer.setSize(drumKitContainer.clientWidth, drumKitContainer.clientHeight);
            camera.aspect = drumKitContainer.clientWidth / drumKitContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        } else {
            // Fallback if container is still not sized (e.g. display:none)
             console.warn("Drum kit container has no dimensions after timeout. Using window dimensions for initial render.");
             renderer.setSize(window.innerWidth, window.innerHeight);
             camera.aspect = window.innerWidth / window.innerHeight;
             camera.updateProjectionMatrix();
             renderer.render(scene, camera);
        }
    }, 0);
  }

  // Expose for testing
  window.animateDrum = animateDrum;
  window.drumElements = drumElements;
  // If camera and raycaster are needed for more advanced click simulation later:
  // window.camera = camera;
  // window.raycaster = raycaster;
  // window.renderer = renderer; // For click coordinates if needed
}
