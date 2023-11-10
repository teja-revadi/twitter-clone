const token2 = localStorage.getItem("access");


const listSelector = document.getElementById("listSelector");
const AccountsButton = document.getElementById("accoutstofollow");
const AccountslistContainer = document.getElementById("users");
const myfollowingButton = document.getElementById("myfollowing");
const myfollowinglistContainer = document.getElementById("my_following");
const myfollowersButton = document.getElementById("myfollowers");
const myfollowerslistContainer = document.getElementById("my_followers");
function hideAllLists() {
  const UserList = document.getElementById("users");
  const MyfollowingList = document.getElementById("my_following");
  const MyfollowersList = document.getElementById("my_followers");
  UserList.style.display = "none";
  MyfollowingList.style.display = "none";
  MyfollowersList.style.display = "none";
}
// Event listener for the select element when an option is selected
listSelector.addEventListener("change", () => {
  const selectedValue = listSelector.value;
  const UserList = document.getElementById("users");
  const MyfollowingList = document.getElementById("my_following");
  const MyfollowersList = document.getElementById("my_followers");
  hideAllLists();

  if (selectedValue === "accounts-to-follow") {
    UserList.style.display = "block";
    // Fetch and display the "Accounts to Follow" list
    // Call fetchUsers() here to fetch and display the list
  } else if (selectedValue === "my-following") {
    MyfollowingList.style.display = "block";
    // Fetch and display the "My Following" list
    // Call fetchMyFollowing() here to fetch and display the list
  } else if (selectedValue === "my-followers") {
    MyfollowersList.style.display = "block";
    // Fetch and display the "My Followers" list
    // Call fetchMyFollowers() here to fetch and display the list
  }
});

//   get lits of users
function fetchUsers() {
    const UserList = document.getElementById("users");
    const apiUrl = "http://127.0.0.1:8000/api/users/accounts_to_follow/";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token2,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => {
          const li = document.createElement("li");
          li.innerHTML = `${user.username}<button id="follow-button-${user.id}" class="follow-button" > Follow
      </button><br><br>`;

          UserList.appendChild(li);
          document.addEventListener("click", function (e) {
            if (e.target && e.target.id === "follow-button-" + user.id) {
              // Replace with your API endpoint for liking a tweet
              const apiUrl = `http://127.0.0.1:8000/api/user-profiles/`;
              fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + token,
                },
                body: JSON.stringify({ following: user.id }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  if (data.id) {
                    alert("following successfully.");
                    window.location.reload();
                    console.log("following successfully.");
                  } else {
                    alert("Already following");
                    console.log("Error following user.");
                  }
                })
                .catch((error) => {
                  alert("error");
                  console.error("Error following user:", error);
                });
              //   window.location.reload();
            }
          });
        });
      })
      .catch((error) => {
        alert("error");
        console.error("Error fetching users:", error);
      });
  }
  fetchUsers();

  //   get lits of My following
  function fetchMyfollowing() {
    const MyfollowingList = document.getElementById("my_following");
    const apiUrl = "http://127.0.0.1:8000/api/user-profiles/my_following/";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token2,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => {
          const li = document.createElement("li");
          li.innerHTML = `${user.following_username}<br><br>`;

          MyfollowingList.appendChild(li);
        });
      })
      .catch((error) => {
        alert("error");
        console.error("Error fetching your following:", error);
      });
  }
  fetchMyfollowing();

  //   get lits of My followers
  function fetchMyfollowers() {
    const MyfollowersList = document.getElementById("my_followers");
    const apiUrl = "http://127.0.0.1:8000/api/user-profiles/my_followers/";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token2,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => {
          const li = document.createElement("li");
          li.innerHTML = `${user.follower_username}<br><br>`;

          MyfollowersList.appendChild(li);
        });
      })
      .catch((error) => {
        alert("error");
        console.error("Error fetching your followers:", error);
      });
  }
  fetchMyfollowers();