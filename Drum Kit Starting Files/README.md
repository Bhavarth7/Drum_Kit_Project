# 3D Interactive Drum Kit

This project is a 3D interactive drum kit application built using HTML, CSS, and JavaScript with the Three.js library for 3D rendering. Users can play drum sounds by clicking on the 3D drum elements or by using corresponding keyboard keys.

## Setup and Installation

This project runs entirely in the browser and uses Three.js via a CDN. No special package installations (like npm or pip) are required. All you need is a modern web browser (like Chrome, Firefox, Safari, or Edge).

1.  **Clone the repository:**
    If you have Git installed, you can clone the repository using the following command:
    ```bash
    git clone <repository_url> 
    ```
    (Replace `<repository_url>` with the actual URL of the repository).
    Alternatively, you can download the project files as a ZIP archive from the repository page.

2.  **Navigate to the project directory:**
    Open your terminal or file explorer and go into the directory where the project was cloned/extracted, then into the `Drum Kit Starting Files` sub-directory:
    ```bash
    cd path/to/repository/Drum Kit Starting Files
    ```

## How to Run

1.  **Ensure you are in the correct directory:**
    Make sure you have navigated into the `Drum Kit Starting Files` directory, as described in the Setup section.

2.  **Open `index.html` in a browser:**
    Locate the `index.html` file within the `Drum Kit Starting Files` directory. Double-click it, or right-click and choose "Open with" your preferred web browser.

3.  **Internet Connection:**
    An active internet connection is required when you first run the application (and potentially for subsequent runs, depending on your browser's caching) because the Three.js library is loaded from a CDN (Content Delivery Network).

## How to Run Tests

This project includes a basic test suite to verify core functionalities like keyboard interactions and sound/animation triggers.

1.  **Run the application:**
    Open the `index.html` file in your web browser as described in the "How to Run" section.

2.  **Open Developer Console:**
    Once the 3D drum kit is loaded in your browser, open the developer console. You can usually do this by right-clicking on the page, selecting "Inspect" or "Inspect Element", and then navigating to the "Console" tab. Alternatively, you can use keyboard shortcuts (e.g., F12 on Windows/Linux, Option+Command+J on macOS for Chrome).

3.  **Execute the tests:**
    In the console, type the following command and press Enter:
    ```javascript
    runAllTests()
    ```

4.  **View Results:**
    The test results will be logged to the console, indicating whether each test passed or failed.
