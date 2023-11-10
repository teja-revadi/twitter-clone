
const token3 = localStorage.getItem("access");


//creating tweet
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("tweetModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModal");
    const submitTweetBtn = document.getElementById("submitTweet");
    const tweetText = document.getElementById("tweetText");

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

    submitTweetBtn.addEventListener("click", () => {
      const tweetContent = tweetText.value;

      // Replace with your API endpoint for creating tweets
      const apiUrl = "http://127.0.0.1:8000/api/tweets/";

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token3,
        },
        body: JSON.stringify({ content: tweetContent }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            alert("Tweet created successfully.");
            modal.style.display = "none";
            tweetText.value = ""; // Clear the text area
            window.location.reload();
          } else {
            alert("Error creating tweet.");
          }
        })
        .catch((error) => {
          alert("error");
          console.error("Error creating tweet:", error);
        });
    });
  });