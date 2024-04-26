import * as THREE from 'three';

// Create WebGLRenderer with antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set renderer size to match the window dimensions
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load starfield cube texture
const loader = new THREE.CubeTextureLoader();
const starField = loader.load([
  "../img/stars.jpg",
  "../img/stars.jpg",
  "../img/stars.jpg",
  "../img/stars.jpg",
  "../img/stars.jpg",
  "../img/stars.jpg",
]);
starField.mapping = THREE.CubeReflectionMapping;
starField.encoding = THREE.sRGBEncoding;
starField.mapping = THREE.CubeReflectionMapping;
starField.wrapS = THREE.RepeatWrapping;
starField.wrapT = THREE.RepeatWrapping;
starField.repeat.set(0.5, 0.5);
const scene = new THREE.Scene();
scene.background = starField;

// Load texture for the sphere
const textureLoader = new THREE.TextureLoader();
const marsTexture = textureLoader.load("../img/marsTexture.jpeg");

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  map: marsTexture,
  roughness: 0.6,
  metalness: 0.1,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Adjust light color to be more red
const light = new THREE.PointLight(0xffaaaa, 10, 100, 0.5);
light.position.set(0.8, 0.4, 1.3);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const textElement = document.createElement("div");
textElement.style.position = "fixed"; // Use fixed positioning to make it stay in place
textElement.style.color = "black";
textElement.style.fontFamily = "Arial, sans-serif";
textElement.style.fontSize = "24px";
textElement.style.backgroundColor = "grey";

// Set the initial position above the planet
textElement.style.top = "0";
textElement.style.right = "0";
textElement.style.width = "50vw"; // Set the width to 50% of the viewport width
textElement.style.height = "100vh"; // Set the height to 100% of the viewport height
textElement.style.overflowY = "auto"; // Enable vertical scrolling if content exceeds height
textElement.style.textAlign = "center"; // Align text to the center

// Set the HTML content of the textElement
textElement.innerHTML = `
<div>
<button id="menuButton" style="position: absolute; top: 10px; left: 10px; padding: 10px; background-color: #ffffff; color: #000000; border: none; cursor: pointer;" onclick="location.href='../index.html';">Back To Solar Safari</button>
  <h1>Welcome to Mars</h1>
  <h2>The Red Planet</h2>
  <section id="planet-info">
    <h2>About Planet</h2>
    <p style="text-align: justify;">Mars, often called the Red Planet, is the fourth planet from the Sun and the second-smallest planet in the Solar System. Named after the Roman god of war, Mars is a terrestrial planet with a thin atmosphere, composed primarily of carbon dioxide.
    </p>
  </section>

  <section id="moons">
    <h2>Moons</h2>
    <p>Mars has two small moons, Phobos and Deimos, which are thought to be captured asteroids.</p>
    <div style="display: inline-block; width: 30%; padding: 18px;vertical-align: center;">
      <h3>Phobos</h3>
      <p>Phobos, the larger and innermost moon of Mars, is a small, irregularly shaped object with a heavily cratered surface. It orbits Mars at a distance of about 9,400 kilometers.</p>
    </div>

    <div style="display: inline-block; width: 30%; padding: 18px; vertical-align: center;">
      <h3>Deimos</h3>
      <p>Deimos, the smaller and outermost moon of Mars, is even smaller and has a smoother surface compared to Phobos. It orbits Mars at a distance of about 23,460 kilometers.</p>
    </div>
  </section>

  <section id="itinerary">
    <h2>Itinerary</h2>
    <table class="mars-itinerary-table">
      <thead>
        <tr>
          <th>Duration</th>
          <th>Activity</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>6 months</td>
          <td>Travel from Earth to Mars</td>
          <td>Interplanetary Space</td>
        </tr>
        <tr>
          <td>2 years</td>
          <td>Exploration and research on Mars</td>
          <td>Mars Surface</td>
        </tr>
        <tr>
          <td>6 months</td>
          <td>Return journey to Earth</td>
          <td>Interplanetary Space</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section id="trip-cost">
    <h2>Trip Cost</h2>
    <p>Experience the wonders of Mars with our exclusive travel package.
      <br>
      <ul>
        <li>Travel Duration: 3 years</li>
        <li>Cost: $100 billion per person</li>
        <li>Inclusions: Accommodation, meals, exploration equipment, and return journey</li>
        <li>Optional Add-ons: Mars rover excursions, personalized research projects, and spacewalks</li>
      </ul>
      <br>
      Book your once-in-a-lifetime journey to Mars today and embark on an unforgettable adventure through the cosmos.
    </p>
  </section>
</div>

`;

// Function to update the position of the text based on the position of the sphere
function updateTextPosition() {
  const vector = new THREE.Vector3();
  vector.setFromMatrixPosition(sphere.matrixWorld);
  const widthHalf = window.innerWidth / 2;
  const heightHalf = window.innerHeight / 2;

  // Map the 3D position to 2D screen coordinates
  vector.project(camera);

  textElement.style.left = `${widthHalf + vector.x * widthHalf}px`;
  textElement.style.top = `${heightHalf - vector.y * heightHalf}px`;

  // Ensure the text is visible only when the sphere is visible
  textElement.style.visibility = vector.z > 0 ? "visible" : "hidden";
}

// Function to handle click event on the sphere
function onSphereClick(event) {
  // Remove the click event listener to prevent further zooming
  document.removeEventListener("click", onSphereClick);

  // Get the mouse click position
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set the raycaster from the camera position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);

  // Check if the ray intersects with the sphere
  const intersects = raycaster.intersectObject(sphere);
  if (intersects.length > 0) {
    // Move the sphere to the left
    const targetX = -4;
    const moveDuration = 1000; // Adjust move duration in milliseconds
    const startPosition = sphere.position.x;
    const startTime = Date.now();

    function updateSpherePosition() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / moveDuration, 1); // Clamp progress between 0 and 1

      sphere.position.x = THREE.MathUtils.lerp(
        startPosition,
        targetX,
        progress
      );
      sphere.rotation.y += 0.004;
      camera.position.z -= 0.075;

      if (progress < 1) {
        requestAnimationFrame(updateSpherePosition);
      }
      document.body.appendChild(textElement);
    }

    updateSpherePosition();

    // Move the text to the right
    const targetTextX = window.innerWidth - textElement.offsetWidth - 20; // Adjust for padding
    const textMoveDuration = 1000; // Adjust move duration in milliseconds
    const startTextPosition = parseInt(textElement.style.left, 10);
    const startTimeText = Date.now();

    function updateTextPosition() {
      const elapsedText = Date.now() - startTimeText;
      const progressText = Math.min(elapsedText / textMoveDuration, 1); // Clamp progress between 0 and 1

      const newX = THREE.MathUtils.lerp(
        startTextPosition,
        targetTextX,
        progressText
      );
      textElement.style.left = `${newX}px`;

      if (progressText < 1) {
        requestAnimationFrame(updateTextPosition);
      }
    }

    updateTextPosition();
  }
}

// Add event listener for mouse click
document.addEventListener("click", onSphereClick, false);

// Function to handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.004;
  renderer.render(scene, camera);
}

animate();
