console.log('home.posts.ajax.js loaded');

// Function to create a new post in the DOM
function newPostinDom(post) {
    return $(`
        <li id="post-${post._id}">
            ${post.content}
            <br>
            <small id="new-post-username"></small>
            <small>
                <a class="delete-post-button" href="/post/delete/${post._id}">Delete Post</a>
            </small>
            <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type Here to add comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    </ul>
                </div>
            </div>
        </li>
    `);
}

// Function to delete a post from the DOM
function deletePost(deleteLink) {
    $(deleteLink).click((e) => {
        e.preventDefault();

        $.ajax({
            type: 'GET',
            url: $(deleteLink).prop('href'),
            success: (data) => {
                $(`#post-${data.data.post_id}`).remove();
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });
}

function createPost() {
    let newPostForm = $('#new-post-form');

    newPostForm.submit((e) => {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/post/create',
            data: newPostForm.serialize(),
            success: (data) => {
                let newPost = newPostinDom(data.data.post);
                const username = data.data.username;
                $('#post-list-container>ul').prepend(newPost);
                $('#new-post-content').val(''); // Empty the textarea after post is created
                $(' #new-post-username').text(username);
                deletePost('.delete-post-button', newPost);
            },
            error: (error) => {
                console.log(error.responseText);
            }
        });
    });
}

// Call the createPost function
createPost();
