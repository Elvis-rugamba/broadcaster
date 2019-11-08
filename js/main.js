
//toggle menu
(function () {
    const menu = document.querySelector('aside'),
        menuLink = document.querySelector('header img');

    menuLink.addEventListener('click', function (e) {
        menu.classList.toggle('show');
        e.preventDefault();
    })
})();
//End toggle menu


//Image modal
(function () {
    // Get the modal
    const modal = document.querySelector('#imgModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
    const img = document.querySelectorAll('.img');
    const modalImg = document.querySelector("#img01");
    const numberText = document.querySelector(".number-text");

    const column = document.querySelector(".column");
    //const columnImg = document.querySelector(".columnImg");
    //const columnImg = document.querySelectorAll('.img');

    img.forEach(function(img, index, images) {
        img.addEventListener('click', function(){
            modal.style.display = "block";
            modalImg.src = this.src;

            numberText.innerHTML = `${index + 1} / ${images.length}`;

            /*for (let i = 0; i < columnImg.length; i++) {
                //column.appendChild(img[i]);
                let imgCol = columnImg[i];
                imgCol.className = imgCol.className.replace("img", "columnImg");
                console.log(imgCol);
                column.appendChild(imgCol);
            }*/
        });
    });

// Get the <span> element that closes the modal
    const close = document.querySelector("#closeImg");

    let i = 0;
    // When the user clicks on <span> (x), close the modal
    close.addEventListener('click', function() {
        modal.style.display = "none";
        i = 0;
    });

// Get the <span> element for next and prev
    const nextImg = document.querySelector(".next-img");
    const prevImg = document.querySelector(".prev-img");

// When the user clicks on <span> (>), next
    nextImg.addEventListener('click', function() {
        next();
    });

// When the user clicks on <span> (<), prev
    prevImg.addEventListener('click', function() {
        previous();
    });

    function next() {
        if (i < img.length - 1) {
            i++;
            modalImg.src = img[i].src;
            numberText.innerHTML = `${i + 1} / ${img.length}`;
        }
    }

    function previous() {
        if (i > 0) {
            i--;
            modalImg.src = img[i].src;
            numberText.innerHTML = `${i + 1} / ${img.length}`;
        }
    }
})();
//End Image Modal

//Video modal
(function () {
    // Get the modal
    const modal = document.querySelector('#vidModal');
    // Get the video and insert it inside the modal - use its "alt" text as a caption
    const vid = document.querySelectorAll('.vid');
    const modalVid = document.querySelector("#vid01");
    const numberText = document.querySelectorAll(".number-text");

    vid.forEach(function(vid, index, videos) {
        vid.addEventListener('click', function(){
            //console.log("here: " + this.currentSrc);
            modal.style.display = "block";
            modalVid.src = this.currentSrc;
            vid.load();
            numberText[1].innerHTML = `${index + 1} / ${videos.length}`;
        });
        vid.addEventListener('touchstart', function(){
            //console.log("here: " + this.currentSrc);
            modal.style.display = "block";
            modalVid.src = this.currentSrc;
            vid.load();
            numberText[1].innerHTML = `${index + 1} / ${videos.length}`;
        });
    });

// Get the <span> element that closes the modal
    const close = document.querySelector("#closeVid");

    let i = 0;
    // When the user clicks on <span> (x), close the modal
    close.addEventListener('click', function() {
        modal.style.display = "none";
        modalVid.pause();
        i = 0;
    });

// Get the <span> element for next and prev
    const nextVid = document.querySelector(".next-vid");
    const prevVid = document.querySelector(".prev-vid");

// When the user clicks on <span> (>), next
    nextVid.addEventListener('click', function() {
        next();
    });

// When the user clicks on <span> (<), prev
    prevVid.addEventListener('click', function() {
        previous();
    });

    function next() {
        if (i < vid.length - 1) {
            i++;
            modalVid.src = vid[i].currentSrc;
            numberText[1].innerHTML = `${i + 1} / ${vid.length}`;
        }
    }

    function previous() {
        if (i > 0) {
            i--;
            modalVid.src = vid[i].currentSrc;
            numberText[1].innerHTML = `${i + 1} / ${vid.length}`;
        }
    }
})();
//End Video Modal



////////////////
function validateForm() {
    const x = document.forms["myForm"]["images"].value;
    x.forEach(x => {
        alert(x);
    });
}
/////////////////////