const uploadBox = document.querySelector(".upload-box"),
// previewImg = uploadBox.querySelector("img"),
// previewImg = document.createElement('img'),
previewImgs = document.querySelector('.img-cards');
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;
const loadFile = (e) => {
    const files = e.target.files; // getting all user selected files
    if (!files.length) return; // return if user hasn't selected any files

    // Clear previous images
    previewImgs.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imgContainer = document.createElement('div'); // create a container for the image and button
        const img = document.createElement('img'); // create a new img element for each file
        const deleteButton = document.createElement('button'); // create a delete button

        img.src = URL.createObjectURL(file); // passing selected file url to img src
        img.classList.add('responsive-img');

        deleteButton.textContent = 'X'; // set button text
        deleteButton.classList.add('delete-button'); // add a class for styling if needed

        // Append img and button to the container
        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteButton);
        previewImgs.appendChild(imgContainer); // append the container to previewImgs

        img.addEventListener("load", () => { // once img loaded
            widthInput.value = img.naturalWidth;
            heightInput.value = img.naturalHeight;
            ogImageRatio = img.naturalWidth / img.naturalHeight;
            document.querySelector(".wrapper").classList.add("active");
        });

        // Add event listener for delete button
        deleteButton.addEventListener('click', () => {
            imgContainer.remove(); // remove the image container from the preview
            // Optionally, you can also reset width and height inputs if no images remain
            if (previewImgs.children.length === 0) {
                widthInput.value = '';
                heightInput.value = '';
                document.querySelector(".wrapper").classList.remove("active");
            }
        });
    }
}

widthInput.addEventListener("keyup", () => {
    // getting height according to the ratio checkbox status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    // getting width according to the ratio checkbox status
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownloadMultiple = () => {
    // Get all img elements inside previewImgs
    const images = previewImgs.querySelectorAll('img'); // Select all img elements
    if (!images.length) {
        console.error("No images to download.");
        return;
    }

    // 1.0 is 100% quality where 0.5 is 50% of total. you can pass from 0.1 - 1.0
    const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    // Create a progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.id = 'progressIndicator';
    progressIndicator.style.position = 'fixed';
    progressIndicator.style.top = '10px';
    progressIndicator.style.left = '10px';
    progressIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    progressIndicator.style.color = 'white';
    progressIndicator.style.padding = '10px';
    progressIndicator.style.borderRadius = '5px';
    document.body.appendChild(progressIndicator);

    let completedDownloads = 0;

    images.forEach((previewImg, index) => {
        const canvas = document.createElement("canvas");
        const a = document.createElement("a");
        const ctx = canvas.getContext("2d");

        // Setting canvas height & width according to the input values
        canvas.width = widthInput.value;
        canvas.height = heightInput.value;

        // Drawing user selected image onto the canvas
        ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

        // Passing canvas data URL as href value of <a> element
        a.href = canvas.toDataURL("image/jpeg", imgQuality);
        a.download = `downloaded_image_${index + 1}_${new Date().getTime()}`; // Unique name for each download
        document.body.appendChild(a); // Append to body
        a.click(); // Trigger download
        document.body.removeChild(a); // Remove from body

        // Update progress
        completedDownloads++;
        progressIndicator.innerText = `Downloaded ${completedDownloads} of ${images.length} images...`;

        // Check if all downloads are completed
        if (completedDownloads === images.length) {
            setTimeout(() => {
                progressIndicator.innerText = 'All downloads completed successfully!';
                setTimeout(() => {
                    document.body.removeChild(progressIndicator); // Remove progress indicator after a short delay
                }, 2000);
            }, 100); // Delay to allow the last download to register
        }
    });
}


downloadBtn.addEventListener("click", resizeAndDownloadMultiple);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
