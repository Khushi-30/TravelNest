(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  document.getElementById("scroll-left").addEventListener("click", function () {
    document.querySelector(".filters").scrollBy({ left: -200, behavior: "smooth" });
});

document.getElementById("scroll-right").addEventListener("click", function () {
    document.querySelector(".filters").scrollBy({ left: 200, behavior: "smooth" });
});

