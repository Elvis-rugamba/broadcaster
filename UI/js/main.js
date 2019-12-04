
// toggle menu
(() => {
  const menu = document.querySelector('aside');
  const menuLink = document.querySelector('header img');

  menuLink.addEventListener('click', (e) => {
    menu.classList.toggle('show');
    e.preventDefault();
  });
})();
// End toggle menu


// Image modal
(() => {
  const modal = document.querySelector('#imgModal');

  const imgs = document.querySelectorAll('.img');
  const modalImg = document.querySelector('#img01');
  const numberText = document.querySelector('.number-text');

  imgs.forEach((img, index, images) => {
    img.addEventListener('click', function () {
      modal.style.display = 'block';
      modalImg.src = this.src;

      numberText.innerHTML = `${index + 1} / ${images.length}`;
    });
  });

  const close = document.querySelector('#closeImg');

  let i = 0;
  if (close) {
    close.addEventListener('click', () => {
      modal.style.display = 'none';
      i = 0;
    });
  }

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  const next = () => {
    if (i < imgs.length - 1) {
      i += 1;
      modalImg.src = imgs[i].src;
      numberText.innerHTML = `${i + 1} / ${imgs.length}`;
    }
  };

  const previous = () => {
    if (i > 0) {
      i -= 1;
      modalImg.src = imgs[i].src;
      numberText.innerHTML = `${i + 1} / ${imgs.length}`;
    }
  };

  const nextImg = document.querySelector('.next-img');
  const prevImg = document.querySelector('.prev-img');

  if (nextImg) {
    nextImg.addEventListener('click', () => {
      next();
    });
  }

  if (prevImg) {
    prevImg.addEventListener('click', () => {
      previous();
    });
  }
})();
// End Image Modal

// Video modal
(() => {
  const modal = document.querySelector('#vidModal');
  const vids = document.querySelectorAll('.vid');
  const modalVid = document.querySelector('#vid01');
  const numberText = document.querySelectorAll('.number-text');

  vids.forEach((vid, index, videos) => {
    vid.addEventListener('click', function () {
      modal.style.display = 'block';
      modalVid.src = this.currentSrc;
      vid.load();
      numberText[1].innerHTML = `${index + 1} / ${videos.length}`;
    });
    vid.addEventListener('touchstart', function () {
      modal.style.display = 'block';
      modalVid.src = this.currentSrc;
      vid.load();
      numberText[1].innerHTML = `${index + 1} / ${videos.length}`;
    });
  });

  const close = document.querySelector('#closeVid');

  let i = 0;
  if (close) {
    close.addEventListener('click', () => {
      modal.style.display = 'none';
      modalVid.pause();
      i = 0;
    });
  }

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  const next = () => {
    if (i < vids.length - 1) {
      i += 1;
      modalVid.src = vids[i].currentSrc;
      numberText[1].innerHTML = `${i + 1} / ${vids.length}`;
    }
  };

  const previous = () => {
    if (i > 0) {
      i -= 1;
      modalVid.src = vids[i].currentSrc;
      numberText[1].innerHTML = `${i + 1} / ${vids.length}`;
    }
  };

  const nextVid = document.querySelector('.next-vid');
  const prevVid = document.querySelector('.prev-vid');

  if (nextVid) {
    nextVid.addEventListener('click', () => {
      next();
    });
  }

  if (prevVid) {
    prevVid.addEventListener('click', () => {
      previous();
    });
  }
})();
// End Video Modal

// Alert Message Box
(() => {
  const closes = document.querySelectorAll('.closebtn');

  if (closes) {
    closes.forEach((close) => {
      close.addEventListener('click', function () {
        const div = this.parentElement;

        div.style.opacity = '0';

        setTimeout(() => { div.style.display = 'none'; }, 600);
      });
    });
  }
})();
// End Alert Message Box

// Dialog box for delete
(() => {
  const deleteBtns = document.querySelectorAll('.btn-delete');

  if (deleteBtns) {
    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener('click', () => {
        if (window.confirm('Are you sure you want to delete this?')) {
          // Save it!
        } else {
          // Do nothing!
        }
      });
    });
  }
})();
// End Dialog Box

// //////////////
function validateForm() {
  const xs = document.forms.myForm.images.value;
  xs.forEach((x) => {
    alert(x);
  });
}
// ///////////////////