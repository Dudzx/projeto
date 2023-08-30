document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const attachment = document.getElementById("attachment");
  const modal1 = document.getElementById("modal-1");
  const modalContent = document.getElementById("modal__content");
  modal1.checked = false;

  [name, email, message].forEach((input) => {
    input.addEventListener("focus", function () {
      input.style.border = "1px solid #ddd";
    });
  })

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nameValue = name.value;
    const emailValue = email.value;
    const messageValue = message.value;
    const attachmentValue = attachment.files[0];

    let valid = true;

    if (nameValue.trim() === "") {
      name.style.border = "1px solid red";
      valid = false;
    }

    if (emailValue.trim() === "" || !email.value.includes("@")) {
      email.style.borderColor = "red";
      valid = false;
    }

    if (messageValue.trim() === "") {
      message.style.borderColor = "red";
      valid = false;
    }

    if (!valid) {
      alert("Preencha os campos corretamente!");
    } else {
      const formData = new FormData();
      formData.append("name", nameValue);
      formData.append("email", emailValue);
      formData.append("message", messageValue);
      formData.append("attachment", attachmentValue);
      const response = await fetch("/server/index.php", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.success) {
        modalContent.innerHTML = `
          <h3>Nome: ${responseData.data.name}</h3>
          <h3>Email: ${responseData.data.email}</h3>
          <h3>Mensagem: ${responseData.data.message}</h3>
          ${responseData.data.attachment ?
            `<h3>Anexo: <a target="_blank" href="../server/${responseData.data.attachment}">${responseData.data.attachment}</a></h3>`
            : "Nenhum Anexo"
          }
        `;
        modal1.checked = true;
        console.log(responseData);
      } else {
        alert("Erro ao enviar a mensagem: " + responseData.message);
      }

    }
  });
});
