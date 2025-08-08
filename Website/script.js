const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const uploadButton = document.querySelector('.upload-button');

let uploadedFiles = {
    'index.html': null,
    'styles.css': null,
    'script.js': null
};

// Click to browse files
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Drag and drop events
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

// Handle files
function handleFiles(files) {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
        if (uploadedFiles.hasOwnProperty(file.name)) {
            uploadedFiles[file.name] = file;
            displayFiles();
        } else {
            alert(`Invalid file: ${file.name}. Please upload only index.html, styles.css, or script.js`);
        }
    });
}

// Display uploaded files
function displayFiles() {
    fileList.innerHTML = '';
    
    Object.keys(uploadedFiles).forEach(fileName => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        if (uploadedFiles[fileName]) {
            fileItem.innerHTML = `
                <span class="file-status">✓</span>
                <span class="file-name">${fileName}</span>
            `;
        } else {
            fileItem.innerHTML = `
                <span class="file-status error">✗</span>
                <span class="file-name">${fileName} (not uploaded)</span>
            `;
        }
        
        fileList.appendChild(fileItem);
    });
    
    // Check if all files are uploaded
    const allFilesUploaded = Object.values(uploadedFiles).every(file => file !== null);
    if (allFilesUploaded) {
        uploadButton.textContent = 'All files uploaded!';
        uploadButton.style.backgroundColor = '#4CAF50';
    }
}

// Initialize display
displayFiles();
