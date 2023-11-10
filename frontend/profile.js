const token = localStorage.getItem("access");

// Redirect to the login page if the token is missing
if (!token) {
  window.location.href = "index.html";
}
let userId;
//profile details
function fetchMyProfile() {
  const MyprofileList = document.getElementById("my_Profile");
  const MyprofileidList = document.getElementById("my_Profile_id");
  const apiUrl = "http://127.0.0.1:8000/api/users/my_profile/";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const profileHtml = `
              <img src="${data.profile_image}" alt="Profile Image"><br><br>

              <p style="font-size: 20px;"><b>Fullname:</b>  ${data.first_name} ${data.last_name}</p>
              <p style="font-size: 20px;"><b>Username:</b>  ${data.username}</p>
          `;
      userId = data.id;
      // Set the HTML of the myProfileContainer
      MyprofileList.innerHTML = profileHtml;
    })
    .catch((error) => {
      alert("error");
      console.error("Error fetching your details:", error);
    });
}

fetchMyProfile();

//change Password
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("passwordModal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModal");
  const submitpasswordBtn = document.getElementById("submitpassword");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  submitpasswordBtn.addEventListener("click", () => {
    // Send the login data to the backend for authentication
    const old_password = document.getElementById("old_password").value;
    const new_password = document.getElementById("new_password").value;

    fetch("http://127.0.0.1:8000/change_password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        old_password,
        new_password,
      }),
    })
      .then((data) => {
        if (data.ok) {
          alert("Password changed successfully.");
          modal.style.display = "none";
          old_password.value = ""; // Clear the text area
          new_password.value = "";
          window.location.reload();
        } else {
          alert("old password is incorrect ");
        }
      })
      .catch((error) => {
        console.error("Error Changing Password:", error);
      });
  });
});

//Change profile
document.addEventListener("DOMContentLoaded", function () {
  const updateprofilebtn = document.getElementById("login-button");
  const message = document.getElementById("message1");
  let formData = new FormData();
  updateprofilebtn.addEventListener("click", () => {
    const profile_image = document.getElementById("profile_photo");
    const file = profile_image.files[0];

    if (file) {
      formData.append("profile_image", file);
    }

    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    if (first_name) {
      formData.append("first_name", first_name);
    }
    if (last_name) {
      formData.append("last_name", last_name);
    }
    // Send the login data to the backend for authentication
    fetch("http://127.0.0.1:8000/api/users/" + userId + "/", {
      method: "PATCH",
      body: formData,
      headers: {
        //   "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          message.innerHTML = "Updated successfully";
          window.location.reload();
        } else {
          message.innerHTML = "Error Occured ";
        }
      });
  });
});