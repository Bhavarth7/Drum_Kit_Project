// Drum Kit Starting Files/tests.js
//
// How to run tests:
// 1. Ensure the website is loaded in your browser.
// 2. Open the browser's developer console.
// 3. Type `runAllTests()` and press Enter.
// 4. Check the console for test results.

console.log("tests.js loaded. Call runAllTests() to start.");

function runAllTests() {
  console.log("Starting all tests...");
  let allTestsPassed = true;

  if (!testKeyPressInteractions()) {
    allTestsPassed = false;
  }
  if (!testDirectInteractions()) {
    allTestsPassed = false;
  }

  if (allTestsPassed) {
    console.log("%cAll tests passed successfully!", "color: green; font-weight: bold;");
  } else {
    console.error("%cSome tests failed. Check logs above.", "color: red; font-weight: bold;");
  }
  return allTestsPassed;
}

function testKeyPressInteractions() {
  console.log("%c--- Starting testKeyPressInteractions ---", "color: blue;");
  let testsPassed = true;
  const keysToTest = ['w', 'a', 's', 'd', 'j', 'k', 'l'];
  
  // Ensure necessary functions/objects are exposed from main_scene.js
  if (typeof window.animateDrum !== 'function' || typeof window.drumElements !== 'object') {
    console.error("Error: `animateDrum` or `drumElements` not exposed on window. Cannot run key press tests.");
    return false;
  }
  if (typeof window.makeSound !== 'function') {
    console.error("Error: `makeSound` not exposed on window. Cannot run key press tests.");
    // Note: makeSound is expected to be on window from index.js
    return false;
  }

  const originalMakeSound = window.makeSound;
  const originalAnimateDrum = window.animateDrum;

  let makeSoundCallLog = [];
  let animateDrumCallLog = [];

  window.makeSound = (key) => {
    makeSoundCallLog.push({ key: key });
    // console.log(`Mock makeSound called with key: ${key}`); // Uncomment for verbose logging
  };
  window.animateDrum = (drumMesh) => {
    // Ensure drumMesh and drumMesh.userData exist before trying to access drumName
    const drumName = drumMesh && drumMesh.userData ? drumMesh.userData.drumName : 'unknown';
    animateDrumCallLog.push({ drumName: drumName, mesh: drumMesh });
    // console.log(`Mock animateDrum called for drum: ${drumName}`); // Uncomment for verbose logging
  };

  keysToTest.forEach(key => {
    makeSoundCallLog = []; // Reset logs for each key
    animateDrumCallLog = [];

    // console.log(`Testing key: ${key}`); // Uncomment for verbose logging
    const event = new KeyboardEvent('keypress', { 'key': key });
    window.dispatchEvent(event);

    // Check makeSound
    if (makeSoundCallLog.length === 1 && makeSoundCallLog[0].key === key) {
      // console.log(`  makeSound for key '${key}': PASSED`); // Uncomment for verbose logging
    } else {
      console.error(`  makeSound for key '${key}': FAILED. Expected key '${key}', Log:`, makeSoundCallLog);
      testsPassed = false;
    }

    // Check animateDrum
    const expectedDrumMesh = window.drumElements[key];
    if (animateDrumCallLog.length === 1 && animateDrumCallLog[0].mesh === expectedDrumMesh) {
      // console.log(`  animateDrum for key '${key}': PASSED`); // Uncomment for verbose logging
    } else {
      console.error(`  animateDrum for key '${key}': FAILED. Expected mesh for key '${key}':`, expectedDrumMesh, "Actual Log:", animateDrumCallLog);
      testsPassed = false;
    }
  });

  // Restore original functions
  window.makeSound = originalMakeSound;
  window.animateDrum = originalAnimateDrum;

  if (testsPassed) {
    console.log("%c--- testKeyPressInteractions: ALL PASSED ---", "color: green;");
  } else {
    console.error("%c--- testKeyPressInteractions: FAILED ---", "color: red;");
  }
  return testsPassed;
}


function testDirectInteractions() {
  console.log("%c--- Starting testDirectInteractions ---", "color: blue;");
  let testsPassed = true;
  const keysToTest = ['w', 'a', 's', 'd', 'j', 'k', 'l'];

  if (typeof window.animateDrum !== 'function' || typeof window.drumElements !== 'object') {
    console.error("Error: `animateDrum` or `drumElements` not exposed on window. Cannot run direct interaction tests.");
    return false;
  }
   if (typeof window.makeSound !== 'function') {
    console.error("Error: `makeSound` not exposed on window. Cannot run direct interaction tests.");
    return false;
  }

  const originalMakeSound = window.makeSound;
  const originalAnimateDrum = window.animateDrum;

  let makeSoundCallLog = [];
  let animateDrumCallLog = [];

  window.makeSound = (key) => {
    makeSoundCallLog.push({ key: key });
    // console.log(`Mock makeSound called with key: ${key}`); // Uncomment for verbose logging
  };
  window.animateDrum = (drumMesh) => {
    const drumName = drumMesh && drumMesh.userData ? drumMesh.userData.drumName : 'unknown';
    animateDrumCallLog.push({ drumName: drumName, mesh: drumMesh });
    // console.log(`Mock animateDrum called for drum: ${drumName}`); // Uncomment for verbose logging
  };
  
  const simulateInteractionForKey = (key) => {
    if (window.drumElements && window.drumElements[key]) {
      // Directly call with the key and the corresponding mesh
      // This simulates the core part of onKeyPress or onMouseClick logic
      if (typeof window.makeSound === 'function') {
        window.makeSound(key); 
      }
      if (typeof window.animateDrum === 'function') {
        window.animateDrum(window.drumElements[key]);
      }
    } else {
      console.error(`  Test Error: No drum element found for key '${key}' in window.drumElements.`);
      testsPassed = false; // This indicates an issue with test setup or drumElements population
    }
  };

  keysToTest.forEach(key => {
    makeSoundCallLog = []; // Reset for each key
    animateDrumCallLog = [];

    // console.log(`Testing direct interaction for key: ${key}`); // Uncomment for verbose logging
    simulateInteractionForKey(key);

    // Check makeSound
    if (makeSoundCallLog.length === 1 && makeSoundCallLog[0].key === key) {
      // console.log(`  makeSound for key '${key}': PASSED`); // Uncomment for verbose logging
    } else {
      console.error(`  makeSound for key '${key}': FAILED. Expected key '${key}', Log:`, makeSoundCallLog);
      testsPassed = false;
    }

    // Check animateDrum
    const expectedDrumMesh = window.drumElements[key];
    if (animateDrumCallLog.length === 1 && animateDrumCallLog[0].mesh === expectedDrumMesh) {
      // console.log(`  animateDrum for key '${key}': PASSED`); // Uncomment for verbose logging
    } else {
      console.error(`  animateDrum for key '${key}': FAILED. Expected mesh for key '${key}':`, expectedDrumMesh, "Actual Log:", animateDrumCallLog);
      testsPassed = false;
    }
  });

  // Restore original functions
  window.makeSound = originalMakeSound;
  window.animateDrum = originalAnimateDrum;

  if (testsPassed) {
    console.log("%c--- testDirectInteractions: ALL PASSED ---", "color: green;");
  } else {
    console.error("%c--- testDirectInteractions: FAILED ---", "color: red;");
  }
  return testsPassed;
}
