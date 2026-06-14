const profileCard =
document.getElementById("profile-card");

async function fetchProfile(){

    const username =
    document.getElementById("username").value.trim();

    if(username === ""){

        profileCard.innerHTML =
        "<p class='error'>Please enter a username</p>";

        return;
    }

    profileCard.innerHTML =
    "<p class='loader'>Loading...</p>";

    try{

        const response =
        await fetch(
        `https://api.github.com/users/${username}`
        );

        if(!response.ok){

            throw new Error("User Not Found");
        }

        const data =
        await response.json();

        profileCard.innerHTML =

        `
        <div class="profile">

            <img src="${data.avatar_url}" alt="Profile">

            <h2>${data.name || data.login}</h2>

            <p>${data.bio || "No bio available"}</p>

            <p>
            <strong>Followers:</strong>
            ${data.followers}
            </p>

            <p>
            <strong>Following:</strong>
            ${data.following}
            </p>

            <p>
            <strong>Repositories:</strong>
            ${data.public_repos}
            </p>

            <a href="${data.html_url}"
            target="_blank">
            Visit GitHub Profile
            </a>

        </div>
        `;

    }

    catch(error){

        profileCard.innerHTML =
        `<p class="error">${error.message}</p>`;
    }
}

document
.getElementById("username")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        fetchProfile();
    }

});