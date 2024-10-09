<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel API Frontend</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Laravel API Frontend</h1>

    <div class="class1">
        <h3>Get User</h3>
        <form id="get-user-form">
            <label for="token">Token:</label>
            <input type="text" id="token" required>
            <input type="submit" value="Get User">
        </form>
        <div id="user-info"></div>
    </div>

    <div class="class2">
        <h3>Create Post</h3>
        <label for="title">Title:</label>
        <input type="text" id="title" required>
        <br><br>
        <label for="body">Body:</label>
        <textarea id="body" required></textarea>
        <br><br>
        <button id="create-post-btn">Create Post</button>
        <div id="post-message"></div>
    </div>

    <!-- Jauna sadaļa visiem postiem -->
    <div class="class3">
        <h3>All Posts</h3>
        <div id="posts-list"></div>
    </div>

    <script src="js/app.js"></script>
</body>

</html>