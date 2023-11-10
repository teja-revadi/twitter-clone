function like(tweet){
    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "like-button-" + tweet.id) {
          // Replace with your API endpoint for liking a tweet
          if (tweet.interactions.liked) {
            const apiUrl =
              "http://127.0.0.1:8000/api/Interactions/" +
              tweet.interactions.liked +
              "/";
            fetch(apiUrl, {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + token, // Replace with your authorization token/header
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log("like deleted successfully");
                  window.location.reload();
                } else {
                  // Handle errors, such as unauthorized access or resource not found
                  console.error("Error deleting like");
                }
              })
              .catch((error) => {
                alert("error occured");
                console.error("Error deleting like:", error);
              });
          } else {
            const apiUrl = `http://127.0.0.1:8000/api/Interactions/`;
            fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              body: JSON.stringify({ type: "like", tweet: tweet.id }),
            })
              .then((response) => {
                if (!response.ok) {
                  // Handle HTTP error (e.g., 404 Not Found, 500 Internal Server Error)
                  throw new Error("Network response was not ok");
                }
                return response.json(); // Parse the response body as JSON
              })
              .then((data) => {
                if (data.id) {
                  console.log("Liked successfully.");
                  window.location.reload();
                } else {
                  console.error("Error liking tweet.");
                }
              })
              .catch((error) => {
                alert("error occured");
                console.error("Error liking tweet:", error);
              });
          }
        }
      });

  }