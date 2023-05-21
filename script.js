// pre-loader
let loading = document.getElementById("preloader");
window.addEventListener("load", ()=>{
	loading.style.display = "none";
})

let featureBox = document.getElementById("feature_box");
let feedImageContainer = document.getElementById("feed_image_container");
let filterImageContainer = document.getElementById("filter_img_container");
let catagoriesLinks = document.getElementsByClassName("catagories_links");
let catagoryHeading = document.getElementById("catagory_heading");
let modalContainer = document.getElementById("modal_container");
let modalBtn = document.getElementById("modal_btn");

let url = "PICTURE_HOLDER/media.json";
let response = fetch(url);

response.then((value) => {
    return value.json();
}).then((picture) => {
    // console.log(picture);
    feedhtml = "";
    featuredhtml = "";
    for (item in picture) {
        // console.log(picture[item]);
        feedhtml += `
        <div class="feed_img">
                <div class="display_img">
                    <img src="${picture[item].imgUrl}"
                        alt="image">
                </div>
                <p class="date_posted">${picture[item].imgPostedOn}</p>
                <p class="img_title">${picture[item].imgTitle}</p>
                <div class="display_img_caption text_white">
                    <a onclick="handleModalClick(${picture[item].uniqueId})"><i class="fa-solid fa-up-right-from-square open-modal-btn"></i></a>
                </div>
                <div class="display_img_tag text_white">
                    <ul>
                        <li>${picture[item].imgTag1}</li>
                        <li>${picture[item].imgTag2}</li>
                        <li>${picture[item].imgTag3}</li>
                    </ul>
                </div>
            </div>
            `
        if(picture[item].featured === "true") {
            featuredhtml = `
            <div class="feature_box_left">
                <img src="${picture[item].imgUrl}"
                    alt="image" srcset="">
                <div class="img_tag text_white">
                    <ul>
                        <li>${picture[item].imgTag1}</li>
                        <li>${picture[item].imgTag2}</li>
                        <li>${picture[item].imgTag3}</li>
                    </ul>
                </div>
            </div>
            <div class="feature_box_right">
                <div class="img_title text_highlight">${picture[item].imgTitle}</div>
                <div class="img_cap text_white">${picture[item].imgCaption}</div>
                <div class="img_details text_white">
                    <div class="img_details_left">
                        <div class="img_location"><i class="fa-solid fa-location-dot"></i> <span
                                class="location value">${picture[item].imgLocation}</span></div>
                        <div class="img_date"><i class="fa-solid fa-calendar-week"></i> Captured on <span
                                class="date value">${picture[item].imgCapturedOn}</span></div>
                        <div class="img_resolution"><i class="fa-solid fa-dna"></i> Resoluion <span
                                class="resolution value">${picture[item].imgResolution}</span></div>
                        <div class="img_camera"><i class="fa-solid fa-camera"></i> Camera <span
                                class="camera value">${picture[item].imgCamera}</span></div>
                    </div>
                    <div class="img_details_right">
                        <div class="img_camera_apeture"><i class="fa-solid fa-camera-retro"></i> Apeture <span
                                class="apeture value">${picture[item].imgApeture}</span></div>
                        <div class="img_camera_flength"><i class="fa-solid fa-arrows-to-circle"></i> Focal length <span
                                class="flength value">${picture[item].imgFlength}</span></div>
                        <div class="img_camera_flash"><i class="fa-solid fa-bolt"></i> Flash <span
                                class="flash value">${picture[item].imgFlash}</span></div>
                        <div class="img_camera_iso"><i class="fa-solid fa-atom"></i> ISO <span
                                class="iso value">${picture[item].imgIso}</span></div>
                        <div class="img_camera_exposuretime"><i class="fa-regular fa-clock"></i> Exposure Time <span
                                class="exposuretime value">${picture[item].imgExposureTime}</span></div>
                    </div>
                </div>
            </div>
            `
        } 
    }
    feedImageContainer.innerHTML = feedhtml;
    featureBox.innerHTML = featuredhtml;

    filterhtml = "";
    for (item in picture) {
        if (picture[item].imgCategory == "nature") {
            // console.log(picture[item].imgCategory)
            filterhtml += `
            <div class="feed_img">
                <div class="display_img">
                    <img src="${picture[item].imgUrl}"
                        alt="image">
                </div>
                <p class="date_posted">${picture[item].imgPostedOn}</p>
                <p class="img_title">${picture[item].imgTitle}</p>
                <div class="display_img_caption text_white">
                    <a onclick="handleModalClick(${picture[item].uniqueId})"><i class="fa-solid fa-up-right-from-square open-modal-btn"></i></a>
                </div>
                <div class="display_img_tag text_white">
                    <ul>
                        <li>${picture[item].imgTag1}</li>
                        <li>${picture[item].imgTag2}</li>
                        <li>${picture[item].imgTag3}</li>
                    </ul>
                </div>
            </div>
            `
        }
    }
    filterImageContainer.innerHTML = filterhtml;
})


function handleFilter(e) {
    const catagory = (e.name)
    // console.log(catagory)
    fetch(url).then((value) => {
        // console.log(value)
        return value.json();
    }).then((picture) => {
        // console.log(picture);
        filterhtml = "";
    for (item in picture) {
        if (picture[item].imgCategory == catagory) {
            // console.log(picture[item].imgCategory)
            filterhtml += `
            <div class="feed_img">
                <div class="display_img">
                    <img src="${picture[item].imgUrl}"
                        alt="image">
                </div>
                <p class="date_posted">${picture[item].imgPostedOn}</p>
                <p class="img_title">${picture[item].imgTitle}</p>
                <div class="display_img_caption text_white">
                    <a onclick="handleModalClick(${picture[item].uniqueId})"><i class="fa-solid fa-up-right-from-square open-modal-btn"></i></a>
                </div>
                <div class="display_img_tag text_white">
                    <ul>
                        <li>${picture[item].imgTag1}</li>
                        <li>${picture[item].imgTag2}</li>
                        <li>${picture[item].imgTag3}</li>
                    </ul>
                </div>
            </div>
            `
        }
    }
    filterImageContainer.innerHTML = filterhtml;
    catagoryHeading.innerHTML = catagory[0].toUpperCase() + catagory.slice(1)
    
    })
}


const handleModalClick = async (id) => {
    let modalPicture;
    let modalContent = "";
    await fetch(url).then((value) => {
        return value.json();
    }).then((picture)=> {
        for(item in picture) {
            if(picture[item].uniqueId == id) {
                modalPicture = picture[item];
                // console.log(modalPicture);
                modalContent = `
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header bg-dark">
                                <h5 class="modal-title text-light" id="exampleModalLabel">Argha Mallick Photography</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body bg-dark">
                                <div class="feature_box" id="feature_box">
                                    <div class="feature_box_left">
                                        <img src="${modalPicture.imgUrl}"
                                            alt="image" srcset="">
                                        <div class="img_tag text_white">
                                            <ul>
                                                <li>${modalPicture.imgTag1}</li>
                                                <li>${modalPicture.imgTag2}</li>
                                                <li>${modalPicture.imgTag3}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="feature_box_right">
                                        <div class="img_title text_highlight">${modalPicture.imgTitle}</div>
                                        <div class="img_cap text_white">${modalPicture.imgCaption}</div>
                                        <div class="img_details text_white">
                                            <div class="img_details_left">
                                                <div class="img_location"><i class="fa-solid fa-location-dot"></i> <span
                                                        class="location value">${modalPicture.imgLocation}</span></div>
                                                <div class="img_date"><i class="fa-solid fa-calendar-week"></i> Captured on <span
                                                        class="date value">${modalPicture.imgCapturedOn}</span></div>
                                                <div class="img_resolution"><i class="fa-solid fa-dna"></i> Resoluion <span
                                                        class="resolution value">${modalPicture.imgResolution}</span></div>
                                                <div class="img_camera"><i class="fa-solid fa-camera"></i> Camera <span
                                                        class="camera value">${modalPicture.imgCamera}</span></div>
                                            </div>
                                            <div class="img_details_right">
                                                <div class="img_camera_apeture"><i class="fa-solid fa-camera-retro"></i> Apeture <span
                                                        class="apeture value">${modalPicture.imgApeture}</span></div>
                                                <div class="img_camera_flength"><i class="fa-solid fa-arrows-to-circle"></i> Focal length <span
                                                        class="flength value">${modalPicture.imgFlength}</span></div>
                                                <div class="img_camera_flash"><i class="fa-solid fa-bolt"></i> Flash <span
                                                        class="flash value">${modalPicture.imgFlash}</span></div>
                                                <div class="img_camera_iso"><i class="fa-solid fa-atom"></i> ISO <span
                                                        class="iso value">${modalPicture.imgIso}</span></div>
                                                <div class="img_camera_exposuretime"><i class="fa-regular fa-clock"></i> Exposure Time <span
                                                        class="exposuretime value">${modalPicture.imgExposureTime}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer bg-dark d-flex justify-content-center">
                                
                                <button type="button" class="btn btn-secondary bg-light rounded-circle text-center"><a href="${modalPicture.imgUrl}" target="_blank"><i class="fa-solid fa-up-right-from-square text-primary"></i></a></button>
                                <button type="button" class="btn btn-secondary bg-light rounded-circle text-center" data-dismiss="modal"><i class="fa-solid fa-rectangle-xmark text-primary"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }
        }
        modalContainer.innerHTML = modalContent;
        modalBtn.click();
    })
}




const scriptURL = 'https://script.google.com/macros/s/AKfycbzPKbpRNBiDQ46XgWbXxZiJ1GvXyqwm4WCm46W_Rh1yJ4aqnaEzpetW17XoHJvqs5iz/exec'
const form = document.forms['submit-to-google-sheet']

let submit_form = document.getElementById("submit-form");
let person_name = document.getElementById("name");
let person_email = document.getElementById("email");
let person_message = document.getElementById("message");
let msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    msg.style.display = "block";
    msg.innerText = "Sending...";
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            msg.style.display = "block";
            msg.innerText = "Message sent sccessfully! Thank you.";
            person_name.value = "";
            person_email.value = "";
            person_message.value = "";
            setTimeout(() => {
                msg.style.display = "none";
            }, 10000)
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.style.display = "block";
            msg.innerText = "Couldn't send the message!";
            setTimeout(() => {
                msg.style.display = "none";
            }, 10000)
        })
})