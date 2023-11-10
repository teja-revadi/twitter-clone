function clearTabContent(tabId) {
    const tab = document.getElementById(tabId);
    while (tab.firstChild) {
      tab.removeChild(tab.firstChild);
    }
  }
  // Check if a JWT token is present in localStorage
  const token = localStorage.getItem("access");

  // Redirect to the login page if the token is missing
  if (!token) {
    window.location.href = "index.html";
  }

  // Handle logout
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    // Remove the token from localStorage to log out
    localStorage.removeItem("activeTab", "myTweetsTab");
    localStorage.removeItem("access");

    // Redirect to the login page
    window.location.href = "index.html";
  });

  // get list of tweets
  function fetchTweets() {
    const tweetList = document.getElementById("tweet-list");
    clearTabContent("tweet-list"); // Clear existing content
    const apiUrl = "http://127.0.0.1:8000/api/tweets/";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((tweet) => {
          const li = document.createElement("li");
          profile_image = `<img src="default.png"></img>`
          if (tweet.profile_image) {
            profile_image = `<img src="http://127.0.0.1:8000/media/${tweet.profile_image}"></img>`
          }

          li.innerHTML = `<div class = "box">
            ${profile_image}
      <p><strong>${tweet.first_name} ${tweet.last_name}</strong> @${
            tweet.username
          }</p>
          <br>
      <div class="tweet-content">${tweet.content}</div><br>
      <button id="like-button-${tweet.id}" class="like-button ${
            tweet.interactions.liked ? "liked" : ""
          }">
          <span class="heart-icon">&#10084;</span> Like
      </button> ${tweet.interactions.likes}
      <button id="retweet-button-${tweet.id}" class="retweet-button ${
            tweet.interactions.retweeted ? "retweeted" : ""
          }">
          <span class="glyphicon glyphicon-retweet"></span> Retweet
      </button> ${tweet.interactions.retweets}</div>`;

          tweetList.appendChild(li);
          //   like button
          like(tweet);
          //   retweet button
          retweet(tweet);      
        });
      })
      .catch((error) => {
        alert("error fetching tweets");
        console.error("Error fetching tweets:", error);
      });
  }
  const allTweetsTab = document.getElementById("allTweetsTab");
  const myTweetsTab = document.getElementById("myTweetsTab");
  const allTweetsList = document.getElementById("tweet-list");
  const myTweetsList = document.getElementById("Mytweet-list");

  allTweetsTab.addEventListener("click", () => {
    allTweetsTab.classList.add("active");
    myTweetsTab.classList.remove("active");
    allTweetsList.classList.add("active");
    myTweetsList.classList.remove("active");

    fetchTweets();
    localStorage.setItem("activeTab", "allTweetsTab");
  });
  
  // get my list of tweets
  function fetchMyTweets() {
    const MytweetList = document.getElementById("Mytweet-list");
    clearTabContent("Mytweet-list"); // Clear existing content
    const apiUrl = "http://127.0.0.1:8000/api/tweets/my_tweets/";
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((tweet) => {
          const li = document.createElement("li");
          li.innerHTML = `
          <div class="tweet-content">${tweet.content}</div><br>
      <button id="like-button-${tweet.id}" class="like-button ${
            tweet.interactions.liked ? "liked" : ""
          }">
          <span class="heart-icon">&#10084;</span> Like
      </button> ${tweet.interactions.likes}
      <button id="retweet-button-${tweet.id}" class="retweet-button ${
            tweet.interactions.retweeted ? "retweeted" : ""
          }">
          <span class="glyphicon glyphicon-retweet"></span> Retweet
      </button> ${tweet.interactions.retweets}</div>`;

          MytweetList.appendChild(li);
           //   like button
           like(tweet);
           //   retweet button
           retweet(tweet); 
        });
      })
      .catch((error) => {
        alert("error fetching tweets");
        console.error("Error fetching tweets:", error);
      });
  }
  myTweetsTab.addEventListener("click", () => {
    myTweetsTab.classList.add("active");
    allTweetsTab.classList.remove("active");
    myTweetsList.classList.add("active");
    allTweetsList.classList.remove("active");
    // Fetch and display My Tweet List
    fetchMyTweets();
    localStorage.setItem("activeTab", "myTweetsTab");
  });
  document.addEventListener("DOMContentLoaded", function () {
    // Check localStorage for the active tab
    const activeTab = localStorage.getItem("activeTab");

    if (activeTab === "myTweetsTab") {
      // Set "My Tweets" tab as active
      myTweetsTab.classList.add("active");
      allTweetsTab.classList.remove("active");
      myTweetsList.classList.add("active");
      allTweetsList.classList.remove("active");

      // Fetch and display My Tweet List
      fetchMyTweets();
    } else {
      // Set "Feed" tab as active (default)
      allTweetsTab.classList.add("active");
      myTweetsTab.classList.remove("active");
      allTweetsList.classList.add("active");
      myTweetsList.classList.remove("active");

      // Fetch and display all tweets (Feed)
      fetchTweets();
    }
  });


//   like function 
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

//   retweet function 
function retweet(tweet){
    document.addEventListener("click", function (e) {
      if (e.target && e.target.id === "retweet-button-" + tweet.id) {
        if (tweet.interactions.retweeted) {
          const apiUrl =
            "http://127.0.0.1:8000/api/Interactions/" +
            tweet.interactions.retweeted +
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
                console.log("retweet deleted successfully");
                window.location.reload();
              } else {
                // Handle errors, such as unauthorized access or resource not found
                console.error("Error deleting retweet");
              }
            })
            .catch((error) => {
              alert("error occured");
              console.error("Error deleting retweet:", error);
            });
        } else {
          const apiUrl = `http://127.0.0.1:8000/api/Interactions/`;
          fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              type: "retweet",
              tweet: tweet.id,
            }),
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
                console.log("retweeted successfully.");
                window.location.reload();
              } else {
                console.error("Error retweeting tweet.");
              }
            })
            .catch((error) => {
              alert("error occured");
              console.error("Error retweeting tweet:", error);
            });
        }
      }
    });
    }