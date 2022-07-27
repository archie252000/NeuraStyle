// File upload
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}

// Upload images

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const contentImage = document.getElementById("content-image");
const styleImage = document.getElementById("style-image");

const transferButton = document.getElementById("transfer-button");

const resultImage = document.getElementById("result-image");
console.log(resultImage);

transferButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData();

    document.getElementById("style-image-wrapper").style.display = "none";
    document.getElementById("content-image-wrapper").style.display = "none";
    document.getElementById("result-image-wrapper").style.display = "flex";
    document.getElementById("my-spinner").style.display = "block";

    formData.append("styleImage", styleImage.files[0]);
    formData.append("contentImage", contentImage.files[0]);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    axios
        .post("http://localhost:5000/get_transfer_image", formData, config)
        .then((res) => {
            const bytestring = res.data["status"];
            let image = bytestring.split("'")[1];
            image = "data:image/jpeg;base64," + image;
            const resultImage = document.getElementById("result-image");
            document.getElementById("my-spinner").style.display = "none";
            const instructions = document.getElementById("instructions");
            instructions.innerHTML = "Here is your masterpiece!";
            instructions.style.fontSize = "15pt";
            resultImage.setAttribute("src", image);
        })
        .catch((err) => console.log(err));
});