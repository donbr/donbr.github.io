#!/bin/bash

# Set base directory
BASE_DIR="$(pwd)"
DEMO_DIR="$BASE_DIR/projects/transformers-demo"

# Create directory structure
echo "Creating directory structure..."
mkdir -p "$DEMO_DIR/js"
mkdir -p "$DEMO_DIR/css"
mkdir -p "$DEMO_DIR/assets/css"
mkdir -p "$DEMO_DIR/assets/images"
mkdir -p "$DEMO_DIR/assets/audio"
mkdir -p "$DEMO_DIR/assets/icons"

# Create index.html
echo "Creating index.html..."
cat > "$DEMO_DIR/index.html" << 'EOL'
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="author" content="Don Branson" />
  <title>Transformers.js Demo - Don Branson</title>
  <meta name="description"
    content="Run 🤗 Transformers directly in your browser, with no need for a server!" />

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="./assets/icons/favicon.ico" />

  <!-- Stylesheets -->
  <link href="./css/theme.css" rel="stylesheet" />
  <link href="./css/style.css" rel="stylesheet" />
  <link href="./assets/css/bootstrap-icons.css" rel="stylesheet" />
  
  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@xenova/transformers@2.0.0/dist/transformers.min.js"></script>
  
  <!-- Prism components -->
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markdown.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css"></script>
  
  <!-- Main JS -->
  <script src="./js/main.js" defer></script>
</head>

<body>
  <div id="app">
    <!-- Responsive navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-5">
        <a class="navbar-brand" href="#">Transformers.js Demo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
            class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/assets/projects/">Projects</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Header-->
    <header class="bg-dark pt-3 pb-5">
      <div class="container px-5">
        <div class="row gx-5 justify-content-center">
          <div class="col-lg-6">
            <div class="text-center">
              <h1 class="display-5 fw-bolder text-white mb-2">Transformers.js</h1>
              <p class="lead text-white-50 mb-4">
                Run <span class="text-white">🤗</span> Transformers in your browser!
              </p>
              <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <a class="btn btn-primary btn-lg px-4 me-sm-3"
                  href="https://huggingface.co/docs/transformers.js">Documentation</a>
                <a class="btn btn-outline-light btn-lg px-4" href="https://github.com/huggingface/transformers.js">
                  <i class="bi bi-github"></i> View Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Demo section-->
    <section class="py-4 border-bottom" id="demo">
      <div class="container px-5 my-4">
        <div class="mb-2">
          <h2 class="fw-bolder">Demo</h2>
          <p class="lead mb-0">Try out machine learning in your browser:</p>
        </div>
        <div class="row justify-content-center">
          <label>Task: </label>
          <div class="col-12 mt-1">
            <select id="task" class="form-select">
              <option value="translation" selected>
                Translation w/ t5-small (78 MB)
              </option>
              <option value="text-generation">
                Text generation w/ distilgpt2 (85 MB)
              </option>
              <option value="image-classification">
                Image classification w/ google/vit-base-patch16-224 (88 MB)
              </option>
            </select>
          </div>

          <!-- Task-specific settings will be added by JavaScript -->
          <div id="languages" task="translation" class="task-settings">
            <!-- Translation settings -->
          </div>
          
          <!-- Generate button -->
          <div class="col-12 mt-2 d-flex justify-content-center">
            <button id="generate" type="button" class="btn btn-primary">Generate</button>
          </div>
          
          <div class="mt-3 mb-1">
            Notes:
            <ul>
              <li>Clicking <em>Generate</em> for the first time will download the corresponding model from
                the <a href="https://huggingface.co/models">HuggingFace Hub</a>.
                All subsequent requests will use the cached model.
              </li>
              <li>Models run entirely in your browser - no server processing required!</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer-->
    <footer class="py-5 bg-dark">
      <div class="container px-5">
        <p class="m-0 text-center text-white">
          <a href="/" class="text-white">Don Branson</a> |
          <a href="https://github.com/huggingface/transformers.js" class="text-white">Transformers.js by Hugging Face</a>
        </p>
      </div>
    </footer>
  </div>
</body>

</html>
EOL

# Create main.js
echo "Creating main.js..."
cat > "$DEMO_DIR/js/main.js" << 'EOL'
// Initialize worker
const worker = new Worker('./js/worker.js');

// Define elements
const TASK_SELECTOR = document.getElementById('task');
const PROGRESS = document.getElementById('progress');

// Create simplified demo interface
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the demo UI based on selected task
  updateInterface();
  
  // Listen for task changes
  TASK_SELECTOR.addEventListener('change', updateInterface);
  
  // Listen for worker messages
  worker.addEventListener('message', handleWorkerMessage);
  
  // Add generate button listener
  document.getElementById('generate').addEventListener('click', runSelectedTask);
});

function updateInterface() {
  const selectedTask = TASK_SELECTOR.value;
  
  // Clear existing task UI
  document.querySelectorAll('.task-settings').forEach(el => {
    el.style.display = 'none';
  });
  
  // Show task-specific UI
  const taskElements = document.querySelectorAll(`.task-settings[task*="${selectedTask}"]`);
  taskElements.forEach(el => {
    el.style.display = 'block';
  });
  
  // Create task-specific UI if it doesn't exist
  if (taskElements.length === 0) {
    createTaskUI(selectedTask);
  }
}

function createTaskUI(taskName) {
  // Create UI for each task type
  switch(taskName) {
    case 'translation':
      createTranslationUI();
      break;
    case 'text-generation':
      createTextGenerationUI();
      break;
    case 'image-classification':
      createImageClassificationUI();
      break;
  }
}

function createTranslationUI() {
  const container = document.createElement('div');
  container.id = 'translation-container';
  container.className = 'task-settings row';
  container.setAttribute('task', 'translation');
  
  container.innerHTML = `
    <div class="col-lg-6">
      <label class="mt-2">Input Text: </label>
      <textarea id="input-textbox" class="mt-1 form-control" rows="5">Hello, how are you?</textarea>
    </div>
    <div class="col-lg-6">
      <label class="mt-2">Translation: </label>
      <textarea id="output-textbox" class="mt-1 form-control" rows="5"></textarea>
    </div>
    <div class="col-12 mt-2">
      <label>Languages: </label>
      <div class="d-flex">
        <div style="width: calc(50% - 20px);">
          <select id="language-from" class="form-select mt-1">
            <option value="en" selected>English</option>
          </select>
        </div>
        <div style="width: 40px;" class="d-flex justify-content-center align-items-center">to</div>
        <div style="width: calc(50% - 20px);">
          <select id="language-to" class="form-select mt-1">
            <option value="fr" selected>French</option>
            <option value="de">German</option>
            <option value="ro">Romanian</option>
          </select>
        </div>
      </div>
    </div>
  `;
  
  document.querySelector('#task').parentNode.after(container);
}

function createTextGenerationUI() {
  const container = document.createElement('div');
  container.id = 'text-generation-container';
  container.className = 'task-settings row';
  container.setAttribute('task', 'text-generation');
  
  container.innerHTML = `
    <div class="col-12 mt-2">
      <label>Text Prompt: </label>
      <textarea id="text-generation-textbox" class="mt-1 form-control" rows="8">I enjoy walking with my cute dog,</textarea>
    </div>
  `;
  
  document.querySelector('#task').parentNode.after(container);
}

function createImageClassificationUI() {
  const container = document.createElement('div');
  container.id = 'image-classification-container';
  container.className = 'task-settings row';
  container.setAttribute('task', 'image-classification');
  
  container.innerHTML = `
    <div class="col-lg-6 mt-2">
      <label>Image: </label>
      <select id="ic-select" class="form-select mt-1">
        <option value="./assets/images/tiger.jpg">Example 1 (Tiger)</option>
        <option value="./assets/images/teapot.jpg">Example 2 (Teapot)</option>
        <option value="https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg">Example 3 (Football)</option>
      </select>
      <div class="mt-2">
        <img id="ic-viewer" class="w-100 p-2 border mt-1" src="./assets/images/tiger.jpg" crossorigin="anonymous">
      </div>
    </div>
    <div class="col-lg-6 mt-2">
      <label>Classification Results: </label>
      <div style="height: 300px">
        <canvas id="ic-canvas" class="mt-1"></canvas>
      </div>
    </div>
  `;
  
  document.querySelector('#task').parentNode.after(container);
  
  // Add image selector functionality
  setTimeout(() => {
    const select = document.getElementById('ic-select');
    const img = document.getElementById('ic-viewer');
    
    if (select && img) {
      select.addEventListener('change', () => {
        img.src = select.value;
      });
    }
  }, 100);
}

function runSelectedTask() {
  const selectedTask = TASK_SELECTOR.value;
  
  // Show loading state
  const generateBtn = document.getElementById('generate');
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
  
  // Prepare task-specific data
  let data = { task: selectedTask };
  
  switch(selectedTask) {
    case 'translation':
      data.languageFrom = document.getElementById('language-from').value;
      data.languageTo = document.getElementById('language-to').value;
      data.text = document.getElementById('input-textbox').value;
      data.elementIdToUpdate = 'output-textbox';
      break;
      
    case 'text-generation':
      data.text = document.getElementById('text-generation-textbox').value;
      data.elementIdToUpdate = 'text-generation-textbox';
      break;
      
    case 'image-classification':
      data.image = document.getElementById('ic-viewer').src;
      data.elementIdToUpdate = 'ic-canvas';
      data.targetType = 'chart';
      break;
  }
  
  // Send task to worker
  worker.postMessage(data);
}

function handleWorkerMessage(event) {
  const { type, task, data, target } = event.data;
  
  // Re-enable generate button
  const generateBtn = document.getElementById('generate');
  generateBtn.disabled = false;
  generateBtn.innerHTML = 'Generate';
  
  if (type === 'update') {
    // Update text element
    const element = document.getElementById(target);
    if (element) element.value = data;
  }
  else if (type === 'complete' && target === 'ic-canvas') {
    // Update chart with classification results
    updateClassificationChart(data);
  }
  else if (type === 'download') {
    // Show download progress
    console.log(`Downloading model: ${data.status}`);
  }
}

function updateClassificationChart(results) {
  // Get canvas
  const canvas = document.getElementById('ic-canvas');
  if (!canvas) return;
  
  // Create chart if it doesn't exist
  if (!window.classificationChart) {
    window.classificationChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Confidence',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            min: 0,
            max: 1
          }
        }
      }
    });
  }
  
  // Update chart data
  const chart = window.classificationChart;
  chart.data.labels = results.map(r => r.label);
  chart.data.datasets[0].data = results.map(r => r.score);
  chart.update();
}
EOL

# Create worker.js
echo "Creating worker.js..."
cat > "$DEMO_DIR/js/worker.js" << 'EOL'
// Transformers.js worker

// Access Transformers from the global scope (loaded via CDN)
// We'll check if it's available from importScripts or from the parent scope
let Transformers;

try {
  importScripts('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.0.0/dist/transformers.min.js');
  Transformers = self.Transformers;
} catch (error) {
  // If importScripts fails, we'll use the global Transformers object from the parent scope
  console.warn('Using Transformers from parent scope. This may cause issues in some browsers.');
}

// Extract required components from Transformers
const { pipeline, env } = Transformers;
env.allowLocalModels = false;

// Define task function mapping
const TASK_FUNCTION_MAPPING = {
  'translation': translate,
  'text-generation': text_generation,
  'image-classification': image_classification,
};

// Listen for messages from UI
self.addEventListener('message', async (event) => {
  const data = event.data;
  let fn = TASK_FUNCTION_MAPPING[data.task];

  if (!fn) return;

  try {
    let result = await fn(data);
    self.postMessage({
      task: data.task,
      type: 'result',
      data: result
    });
  } catch (error) {
    self.postMessage({
      task: data.task,
      type: 'error',
      error: error.message
    });
  }
});

// Pipeline factories
class TranslationPipelineFactory {
  static task = 'translation';
  static model = 'Xenova/t5-small';
  static instance = null;

  static async getInstance(progressCallback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, {
        progress_callback: progressCallback
      });
    }
    return this.instance;
  }
}

class TextGenerationPipelineFactory {
  static task = 'text-generation';
  static model = 'Xenova/distilgpt2';
  static instance = null;

  static async getInstance(progressCallback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, {
        progress_callback: progressCallback
      });
    }
    return this.instance;
  }
}

class ImageClassificationPipelineFactory {
  static task = 'image-classification';
  static model = 'Xenova/vit-base-patch16-224';
  static instance = null;

  static async getInstance(progressCallback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, {
        progress_callback: progressCallback
      });
    }
    return this.instance;
  }
}

// Task implementations
async function translate(data) {
  let pipeline = await TranslationPipelineFactory.getInstance(downloadProgress => {
    self.postMessage({
      type: 'download',
      task: 'translation',
      data: downloadProgress
    });
  });

  // Update task based on source and target languages
  pipeline.task = `translation_${data.languageFrom}_to_${data.languageTo}`;

  let result = await pipeline(data.text, {
    max_new_tokens: 50,
    callback_function: function (beams) {
      const decodedText = pipeline.tokenizer.decode(beams[0].output_token_ids, {
        skip_special_tokens: true,
      });

      self.postMessage({
        type: 'update',
        target: data.elementIdToUpdate,
        data: decodedText
      });
    }
  });

  return result;
}

async function text_generation(data) {
  let pipeline = await TextGenerationPipelineFactory.getInstance(downloadProgress => {
    self.postMessage({
      type: 'download',
      task: 'text-generation',
      data: downloadProgress
    });
  });

  let text = data.text.trim();

  let result = await pipeline(text, {
    max_new_tokens: 100,
    callback_function: function (beams) {
      const decodedText = pipeline.tokenizer.decode(beams[0].output_token_ids, {
        skip_special_tokens: true,
      });

      self.postMessage({
        type: 'update',
        target: data.elementIdToUpdate,
        data: decodedText
      });
    }
  });

  return result;
}

async function image_classification(data) {
  let pipeline = await ImageClassificationPipelineFactory.getInstance(downloadProgress => {
    self.postMessage({
      type: 'download',
      task: 'image-classification',
      data: downloadProgress
    });
  });

  let outputs = await pipeline(data.image, {
    topk: 5 // return top 5 predictions
  });

  self.postMessage({
    type: 'complete',
    target: data.elementIdToUpdate,
    targetType: data.targetType,
    data: outputs
  });

  return outputs;
}
EOL

# Create theme.css
echo "Creating theme.css..."
cat > "$DEMO_DIR/css/theme.css" << 'EOL'
@charset "UTF-8";

:root {
    --bs-blue: #0d6efd;
    --bs-indigo: #6610f2;
    --bs-purple: #6f42c1;
    --bs-pink: #d63384;
    --bs-red: #dc3545;
    --bs-orange: #fd7e14;
    --bs-yellow: #ffc107;
    --bs-green: #198754;
    --bs-teal: #20c997;
    --bs-cyan: #0dcaf0;
    --bs-white: #fff;
    --bs-gray: #6c757d;
    --bs-gray-dark: #343a40;
    --bs-primary: #0d6efd;
    --bs-secondary: #6c757d;
    --bs-success: #198754;
    --bs-info: #0dcaf0;
    --bs-warning: #ffc107;
    --bs-danger: #dc3545;
    --bs-light: #f8f9fa;
    --bs-dark: #212529;
    --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

@media (prefers-reduced-motion: no-preference) {
    :root {
        scroll-behavior: smooth;
    }
}

body {
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* Container */
.container {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}

@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

@media (min-width: 1400px) {
    .container {
        max-width: 1320px;
    }
}

/* Row and columns */
.row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0;
    margin-right: -0.75rem;
    margin-left: -0.75rem;
}

.col-12 {
    flex: 0 0 auto;
    width: 100%;
}

@media (min-width: 992px) {
    .col-lg-6 {
        flex: 0 0 auto;
        width: 50%;
    }
}

/* Form elements */
.form-select, .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select:focus, .form-control:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

/* Button */
.btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.btn-primary:hover {
    color: #fff;
    background-color: #0b5ed7;
    border-color: #0a58ca;
}

.btn-outline-light {
    color: #f8f9fa;
    border-color: #f8f9fa;
}

.btn-outline-light:hover {
    color: #000;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}

/* Navbar */
.navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.navbar-dark {
    color: #fff;
}

.navbar-dark .navbar-brand,
.navbar-dark .navbar-nav .nav-link {
    color: #fff;
}

.bg-dark {
    background-color: #212529 !important;
}

/* Utilities */
.d-flex {
    display: flex !important;
}

.justify-content-center {
    justify-content: center !important;
}

.align-items-center {
    align-items: center !important;
}

.w-100 {
    width: 100% !important;
}

.mt-1 {
    margin-top: 0.25rem !important;
}

.mt-2 {
    margin-top: 0.5rem !important;
}

.mt-3 {
    margin-top: 1rem !important;
}

.p-2 {
    padding: 0.5rem !important;
}

.py-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
}

.py-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
}

.pb-5 {
    padding-bottom: 3rem !important;
}

.border {
    border: 1px solid #dee2e6 !important;
}

.border-bottom {
    border-bottom: 1px solid #dee2e6 !important;
}

.text-center {
    text-align: center !important;
}

.text-white {
    color: #fff !important;
}

.fw-bolder {
    font-weight: bolder !important;
}

.lead {
    font-size: 1.25rem;
    font-weight: 300;
}

/* Spinner */
.spinner-border {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    vertical-align: -0.125em;
    border: 0.2em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    -webkit-animation: 0.75s linear infinite spinner-border;
    animation: 0.75s linear infinite spinner-border;
}

@keyframes spinner-border {
    to {
        transform: rotate(360deg);
    }
}
EOL

# Create style.css
echo "Creating style.css..."
cat > "$DEMO_DIR/css/style.css" << 'EOL'
/* Custom styles for Transformers.js demo */

.task-settings {
    display: none; /* Hide all task settings by default */
}

/* Code container */
.code-container {
    position: relative;
    height: 300px;
    overflow: hidden;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

.code-container > textarea,
.code-container > pre {
    margin: 0;
    padding: 16px;
    border: 0;
    width: 100%;
    height: 100%;
    font-family: monospace;
    font-size: 14px;
    line-height: 1.5;
    tab-size: 2;
}

.code-container > textarea,
.code-container > pre {
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
}

.code-container > textarea {
    z-index: 1;
    color: transparent;
    background: transparent;
    caret-color: black;
    resize: none;
}

.code-container > pre {
    z-index: 0;
    pointer-events: none;
    white-space: pre-wrap;
}
EOL