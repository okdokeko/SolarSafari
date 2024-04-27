import * as THREE from 'three';

// Create WebGLRenderer with antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set renderer size to match the window dimensions
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load starfield cube texture
const loader = new THREE.CubeTextureLoader();
// const starField = loader.load([
//   "../img/stars.jpg",
//   "../img/stars.jpg",
//   "../img/stars.jpg",
//   "../img/stars.jpg",
//   "../img/stars.jpg",
//   "../img/stars.jpg",
// ]);
// starField.mapping = THREE.CubeReflectionMapping;
// starField.encoding = THREE.sRGBEncoding;
// starField.mapping = THREE.CubeReflectionMapping;
// starField.wrapS = THREE.RepeatWrapping;
// starField.wrapT = THREE.RepeatWrapping;
// starField.repeat.set(0.5, 0.5);
const scene = new THREE.Scene();
// scene.background = starField;

// Load texture for the sphere
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load("../img/sunTexture.jpeg");

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
	map: sunTexture,
	roughness: 10.0,
	metalness: 0.1,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Adjust light color to be more red
const light = new THREE.PointLight(0xffaaaa, 10, 100, 1.5);
light.position.set(0, 0, 1.8);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 3;

const textElement = document.createElement("body");
textElement.style.position = "fixed"; // Use fixed positioning to make it stay in place
textElement.style.color = "black";
textElement.style.fontFamily = "Arial, sans-serif";
textElement.style.fontSize = "20px";
textElement.style.backgroundColor = "#6767ff";


// Set the initial position above the planet
textElement.style.top = "0";
textElement.style.right = "0";
textElement.style.width = "60vw"; // Set the width to 50% of the viewport width
textElement.style.height = "100vh"; // Set the height to 100% of the viewport height
textElement.style.overflowY = "auto"; // Enable vertical scrolling if content exceeds height
textElement.style.textAlign = "center"; // Align text to the center

// Set the HTML content of the textElement
textElement.innerHTML = `
<header>
<h1 style="width:25%">The Sun</h1>
<button onclick="location.href='../index.html';">Home</button>
</header>
<main>
<section id="planet-info" >
	<h2 style="width:25%">About the Sun</h2>
	<p style="width:85%">The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with
		internal convective motion that generates a magnetic field via a dynamo process. It is by far the most
		important source of energy for life on Earth.</p>
</section>
<section id="composition">
	<h2 style="width:45%">Sun Composition</h2>
	<p style="width:85%"> The Sun is primarily composed of hydrogen (about 74% by mass) and helium (about 24%). Other elements,
		such as oxygen, carbon, neon, and iron, make up the remaining 2% of its mass.</p>
	<img src="../img/sun.jpg" alt="image of the sun" width="20%" style="text-align: center;">
</section>
<section id="sightseeing">
	<h2>Sightseeing</h2>
	<p style="width:85%">Witnessing a solar flare can be an awe-inspiring sight, but it's important to do so safely using proper
		equipment to protect your eyes.<br>
		Eye protection will be provided, but any health expenses caused by negligence will not be covered by the safari.
		</p>
</section>
<section id="itinerary">
                <h2>Itinerary</h2>
                <table class="jupyter-itinerary-table">
                    <thead>
                        <tr>
                            <th>Duration</th>
                            <th>Activity</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3 years</td>
                            <td>Travel to the sun</td>
                            <td>Solar System</td>
                        </tr>
                        <tr>
                            <td>1 month</td>
                            <td>Solar Ovservation Tour</td>
                            <td>Sun Orbit</td>
                        </tr>
                        <tr>
                            <td>2 weeks</td>
                            <td>Solar Energy Harvesting Workshops</td>
                            <td>Sun Orbit</td>
                        </tr>
                        <tr>
                            <td>1 week</td>
                            <td>Solar Flare Surfing and Exploration</td>
                            <td>Sun Surface</td>
                        </tr>
                        <tr>
                            <td>1 week</td>
                            <td>Sun Diving and Mineral Extraction</td>
                            <td>Sun Surface</td>
                        </tr>
                        <tr>
                            <td>1 week</td>
                            <td>Sun Heated Saunas and Town Exploration</td>
                            <td>Sun Surface</td>
                        </tr>
                        <tr>
                            <td>2 weeks</td>
                            <td>Sun Cuising Gastronomy Events</td>
                            <td>Sun Orbit</td>
                        </tr>
                        <tr>
                            <td>2 days</td>
                            <td>Solar Art, Science, and Closing Parties</td>
                            <td>Sun Orbit</td>
                        </tr>
                        <tr>
                            <td>3 years</td>
                            <td>Return journey to Earth</td>
                            <td>Solar System</td>
                        </tr>
                    </tbody>
                </table>
            </section>
			<section id="trip-cost">
			<h2>Trip Cost</h2>
			<p>Experience the wonders of the Sun our exclusive travel package. 
				<br>
				<ul>
					<li>Travel Duration: 3 years</li>
					<li>Cost: $20 billion per person</li>
					<li>Inclusions: Accommodation, meals, excursions, entertainment, and return journey</li>
					<li>Optional Add-ons: Sun diving, personalized tours, and maximum gravity experience</li>
				</ul>
				<br>
				Book your once-in-a-lifetime journey to the Sun today and embark on an unforgettable adventure through the solar system.
			</p>
		</section>
</main>

<footer>
<p>Email: <a href="mailto:solarsafarihelp@solarsafari.com">solarsafarihelp@solarsafari.com</a></p>
<p>Last Updated: April 26. 2024</p>
<p>Social media: @solarsafari</p>
</footer>
`;

// Function to update the position of the text based on the position of the sphere
// function updateTextPosition() {
// 	const vector = new THREE.Vector3();
// 	vector.setFromMatrixPosition(sphere.matrixWorld);
// 	const widthHalf = window.innerWidth / 2;
// 	const heightHalf = window.innerHeight / 2;

// 	// Map the 3D position to 2D screen coordinates
// 	vector.project(camera);

// 	textElement.style.left = `${widthHalf + vector.x * widthHalf}px`;
// 	textElement.style.top = `${heightHalf - vector.y * heightHalf}px`;

// 	// Ensure the text is visible only when the sphere is visible
// 	textElement.style.visibility = vector.z > 0 ? "visible" : "hidden";
// }

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
			camera.position.z += .03;

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
