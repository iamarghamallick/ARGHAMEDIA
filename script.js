let feedImageContainer = document.getElementById("feed_image_container");
let filterImageContainer = document.getElementById("filter_img_container");
let catagoriesLinks = document.getElementsByClassName("catagories_links");
let catagoryHeading = document.getElementById("catagory_heading");

let url = "PICTURE_HOLDER/media.json";
let response = fetch(url);

response.then((value) => {
    return value.json();
}).then((picture) => {
    // console.log(picture);
    feedhtml = "";
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
                    <a href="${picture[item].imgUrl}" target="_blank"><i class="fa-solid fa-up-right-from-square"></i></a>
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
    feedImageContainer.innerHTML = feedhtml;

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
                    <a href="${picture[item].imgUrl}" target="_blank"><i class="fa-solid fa-up-right-from-square"></i></a>
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
                <a href="${picture[item].imgUrl}" target="_blank"><i class="fa-solid fa-up-right-from-square"></i></a>
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