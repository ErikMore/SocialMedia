
window.onload = function () {
    loadProfile();
    loadPosts();
};


function loadProfile() {
    const profileName = localStorage.getItem('profileName') || 'User Name';
    const aboutText = localStorage.getItem('aboutText') || 'Write something about yourself...';

    document.getElementById('profileName').innerText = profileName;
    document.getElementById('aboutText').value = aboutText;
}


function saveProfile() {
    const profileName = document.getElementById('profileName').innerText;
    const aboutText = document.getElementById('aboutText').value;

    localStorage.setItem('profileName', profileName);
    localStorage.setItem('aboutText', aboutText);
}


function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('postsContainer');


    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerText = post;
        postsContainer.appendChild(postElement);
    });
}


function savePost(newPostText) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(newPostText);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();  // Re-load the posts to display them
}


document.getElementById('editProfileBtn').addEventListener('click', () => {
    const newProfileName = prompt('Enter your new profile name:', document.getElementById('profileName').innerText);
    if (newProfileName !== null && newProfileName.trim() !== '') {
        document.getElementById('profileName').innerText = newProfileName;
        saveProfile();  // Save the new profile name
    }
});

document.getElementById('editAboutBtn').addEventListener('click', () => {
    const aboutTextField = document.getElementById('aboutText');
    aboutTextField.readOnly = false;  // Make the textarea editable
    aboutTextField.focus();  // Focus on the textarea
});

// Save the changes to about text when the user presses Enter
document.getElementById('aboutText').addEventListener('blur', () => {
    const aboutText = document.getElementById('aboutText').value;
    localStorage.setItem('aboutText', aboutText);
});


document.getElementById('addPostBtn').addEventListener('click', () => {
    const newPostText = document.getElementById('newPost').value.trim();
    if (newPostText !== '') {
        savePost(newPostText);
        document.getElementById('newPost').value = '';  // Clear the input after posting
    }
});
