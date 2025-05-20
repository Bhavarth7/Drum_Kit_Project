// Ensure Three.js is loaded
if (typeof THREE === 'undefined') {
  console.error('Three.js has not been loaded. Ensure the script tag is in your HTML.');
}

// Get the container element
const container = document.getElementById('drum-kit-container');

if (!container) {
  console.error('The container element with id "drum-kit-container" was not found.');
} else {
  // Scene
  const scene = new THREE.Scene();

  // Camera
  // Adjust these values as needed for your scene
  const fov = 75;
  const aspect = container.clientWidth / container.clientHeight; // Use clientWidth/Height for initial aspect
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5; // Adjust camera position to see the origin
  camera.position.y = 2; // Slightly elevated
  camera.lookAt(0, 0, 0); // Look at the center of the scene

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight); // Set initial size
  renderer.setClearColor(0x000000); // Black background

  // Append renderer to the container
  container.appendChild(renderer.domElement);

  // Handle window resize
  window.addEventListener('resize', () => {
    if (container) { // Check if container still exists
        // Update camera aspect ratio and renderer size based on new container dimensions
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Add any animations or updates here later
    renderer.render(scene, camera);
  }

  // Start animation
  animate();

  // Initial render in case requestAnimationFrame is slow to start
  renderer.render(scene, camera);
}
