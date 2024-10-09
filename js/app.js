document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.querySelector("#get-user-form");
    const userInfoDiv = document.querySelector("#user-info");
    const createPostBtn = document.querySelector("#create-post-btn");
    const postMessageDiv = document.querySelector("#post-message");
    const postsListDiv = document.querySelector("#posts-list");

    // Funkcija, lai iegūtu visus postus
    async function fetchPosts() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                displayPosts(posts);
            } else {
                postsListDiv.innerHTML = `<p>${posts.message || 'Unable to fetch posts.'}</p>`;
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            postsListDiv.innerHTML = "<p>Error fetching posts.</p>";
        }
    }

    // Funkcija, lai parādītu postus lapā
    function displayPosts(posts) {
        postsListDiv.innerHTML = ''; // Notīra iepriekšējos postus

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.body}</p>
                <small>Post ID: ${post.id}</small>
                <hr>
            `;
            postsListDiv.appendChild(postElement);
        });
    }

    // Iegūst lietotāju, pamatojoties uz tokenu
    userForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const token = document.querySelector("#token").value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const user = await response.json();

            if (response.ok) {
                userInfoDiv.innerHTML = `
                    <h2>Welcome, ${user.name}</h2>
                    <p>Email: ${user.email}</p>
                `;
                fetchPosts(); // Iegūst visus postus pēc lietotāja validācijas
            } else {
                userInfoDiv.innerHTML = `<p>${user.message || 'Unable to fetch user information.'}</p>`;
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            userInfoDiv.innerHTML = "<p>Error fetching user info.</p>";
        }
    });

    // Izveido jaunu ierakstu (post)
    createPostBtn.addEventListener("click", async function () {
        const token = document.querySelector("#token").value; // Token, kas jau ir ievadīts
        const title = document.querySelector("#title").value;
        const body = document.querySelector("#body").value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', { // Pareizs maršruts
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            });

            const post = await response.json();

            if (response.ok) {
                postMessageDiv.innerHTML = `<p>Post created successfully! ID: ${post.id}</p>`;
                fetchPosts(); // Atjauno postu sarakstu pēc jauna posta izveides
            } else {
                postMessageDiv.innerHTML = `<p>${post.message || 'Unable to create post.'}</p>`;
            }
        } catch (error) {
            console.error("Error creating post:", error);
            postMessageDiv.innerHTML = "<p>Error creating post.</p>";
        }
    });

    // Ielādē visus postus, kad lapa tiek ielādēta
    fetchPosts();
});

