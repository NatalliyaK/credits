document.addEventListener("DOMContentLoaded", function () {
  function addMask() {
    [].forEach.call(
      document.querySelectorAll('input.custom-input[type="tel"]'),
      function (input) {
        let keyCode;

        function mask(event) {
          event.keyCode && (keyCode = event.keyCode);
          let pos = this.selectionStart;
          if (pos < 3) event.preventDefault();
          let matrix = "+375 (__) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
          i = new_value.indexOf("_");
          if (i !== -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i);
          }
          let reg = matrix
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
              return "\\d{1," + a.length + "}";
            })
            .replace(/[+()]/g, "\\$&");
          reg = new RegExp("^" + reg + "$");
          if (
            !reg.test(this.value) ||
            this.value.length < 5 ||
            (keyCode > 47 && keyCode < 58)
          )
            this.value = new_value;
          if (event.type === "blur" && this.value.length < 5) {
            this.value = "";
            this.classList.remove("havetext");
          }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
      }
    );
  }

  addMask();

  const modalOpen = document.querySelectorAll('.modalOpen'),
    modalWrapper = document.querySelector('.modal__wrapper'),
    close = document.querySelectorAll('.modal__close'),
    successModalWrapper = document.querySelector('.success-modal__wrapper');

  modalOpen.forEach(item => {
    item.addEventListener('click', () => {
      modalWrapper.classList.add('active');
    });
  });

  function closeModal() {
    modalWrapper.classList.remove('active');
    successModalWrapper.classList.remove('active');
  }

  close.forEach(item => {
    item.addEventListener('click', () => {
      closeModal();
    });
  });

  modalWrapper.addEventListener('click', (event) => {
    const element = event.target;
    if (element.classList.contains('modal__wrapper')) {
      closeModal();
    }
  });

  successModalWrapper.addEventListener('click', (event) => {
    const element = event.target;
    if (element.classList.contains('success-modal__wrapper')) {
      closeModal();
    }
  });

  function showSuccess(data) {
    const successModal = document.querySelector('.success-modal');

    successModalWrapper.classList.add('active')
    successModal.textContent = '';
    successModal.textContent = data.text;
  }

  function handleForm(formInf) {
    formInf.addEventListener('submit', function (event) {
      const controls = this.querySelectorAll('.modal__input');
      let isValid = true;
      controls.forEach(control => {
        if (control.classList.contains('required') && !control.value) {
          isValid = false;
        }
      });
      event.preventDefault();
      const formData = new FormData(formInf);

      if (isValid) {
        doAPIcall('POST', formData, 'apply.php')

        controls.forEach(control => {
          control.value = '';
        });
        closeModal();
      }
    })
  }

  function doAPIcall(type, data = '', url) {
    console.log(data.get('name'), data.get('tel'), data.get('email'))

    fetch(url, {
      method: type,
      body: data
    })
      .then(response => response.json())
      .then(data => {
        showSuccess(data);
      })
      .catch(error => console.error(error));
  }

  const formSend = document.getElementById('sendForm');

  if (formSend) {
    handleForm(formSend);
  }
});