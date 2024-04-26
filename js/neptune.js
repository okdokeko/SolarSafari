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
const neptuneTexture = textureLoader.load("../img/neptuneTexture.jpeg");

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
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
<h1>Neptune</h1>
<section id="planet-info">
    <h2>About Planet</h2>
    <p style="text-align: justify;">Welcome to Neptune, the enigmatic jewel of the outer solar system! Immerse yourself in the wonders of this majestic gas giant, 
        where swirling storms and icy mysteries await your exploration. As the eighth and farthest planet from the Sun, Neptune boasts 
        a captivating allure, drawing adventurers from across the cosmos.
    <br>
    <br>
        Dive deep into Neptune's atmosphere, where winds whip at supersonic speeds and clouds of methane paint the sky in mesmerizing hues 
        of blue. Witness the grandeur of its moon Triton, a world of icy plains and geysers erupting from its frigid surface.
    <br>
    <br>
        Embark on an unforgettable journey through Neptune's realm, guided by our expert spacefarers who will unveil the secrets of this 
        distant world. Whether you seek the thrill of discovery or the tranquility of celestial vistas, Neptune promises an unforgettable 
        experience that will leave you awe-inspired and longing for more.
    </p>
</section>
<section id="surface-cruise">
    <p>
        While Neptune may lack a solid ground to tread upon, its dense atmosphere offers a surreal landscape waiting to be explored.
        Step aboard our state-of-the-art cruiser specially designed to navigate the turbulent winds and swirling clouds of Neptune. Feel the thrill as you 
        glide through layers of hydrogen and helium, marveling at the ever-changing patterns and colors that paint the sky.
        <img src="../img/neptune-cruise.png" alt="neptune cruise room" width="250" height="250"> 
    </p>
</section>

<section id="itinerary">
    <h2>Itinerary</h2>
    <table class="neptune-itinerary-table">
      <thead>
        <tr>
          <th>Duration</th>
          <th>Activity</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>12 year</td>
          <td>Travel from Earth to Neptune</td>
          <td>Interplanetary Space</td>
        </tr>
        <tr>
          <td>5 years</td>
          <td>Surface cruise on Neptune</td>
          <td>Neptune Surface</td>
        </tr>
        <tr>
            <td>Optional: 3 years</td>
            <td>Triton ice exploration</td>
            <td>Triton Surface</td>
          </tr>
        <tr>
        <tr>
            <td>Optional: 3 years</td>
            <td>Nereid amusement park and resort</td>
            <td>Nereid Surface</td>
          </tr>
        <tr>
          <td>12 year</td>
          <td>Return journey to Earth</td>
          <td>Interplanetary Space</td>
        </tr>
      </tbody>
    </table>
</section>

<section id="trip-cost">
    <h2>Trip Cost</h2>
    <p>Experience the wonders of Neptune and its moons with our exclusive travel package.
        <br>
        <ul>
          <li>Travel Duration: 12 years</li>
          <li>Cost: $40 billion per person</li>
          <li>Inclusions: Accommodation, meals, exploration equipment, and return journey</li>
          <li>Optional Add-ons: Triton geyser expedition, Nereid moon orbit amusement park</li>
        </ul>
        <br>
        Join us for a experience like no other, and let Neptune's boundless expanse ignite your sense of wonder and adventure.
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