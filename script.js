//getting elements from HTML for JS
const fetchedDiv = document.getElementById('fetchedDiv');
const fetchButton = document.getElementById('fetchBtn');
const xhrButton = document.getElementById('xhrBtn');
const dataForm = document.getElementById('createPost');
const updateForm = document.getElementById('editPost');

//event listener for fetch with fetch()
fetchBtn.addEventListener('click', fetchFetch);

//function to fetch with fetch()
function fetchFetch() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      fetchedDiv.innerHTML = `
        <h3>Fetched data using fetch()</h3>
        <p>Title: ${data.title}</p>
        <p>Body: ${data.body}</p>
      `;
    })
    .catch(error => {
      fetchedDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    });
}

//event listener for fetch with XHR
xhrButton.addEventListener('click', xhrFetch);

//function tto fetch with XHR
function xhrFetch() {
  const url = 'https://jsonplaceholder.typicode.com/posts/2';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      fetchedDiv.innerHTML = `
        <h3>Fetched data using XHR</h3>
        <p>Title: ${data.title}</p>
        <p>Body: ${data.body}</p>
      `;
    } else {
      fetchedDiv.innerHTML = `<p class="error">Error: ${xhr.statusText}</p>`;
    }
  };

  xhr.onerror = function () {
    fetchedDiv.innerHTML = '<p class="error">Network Error</p>';
  };

  xhr.send();
}

//
dataForm.addEventListener('submit', postMessage);

function postMessage(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const url = 'https://jsonplaceholder.typicode.com/posts';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    fetchedDiv.innerHTML = 
    `<p>Post created successfully. ID: ${data.id}</p>
    
    <h3>Post Created</h3>
    
    <p>Title: ${data.title}</p>
    <p>Content: ${data.body}
    `
  })
  .catch(error => {
    fetchedDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  });
}


function putMessage(event) {
    event.preventDefault();
    const id = document.getElementById('editPostId').value;
    const title = document.getElementById('editPostTitle').value;
    const body = document.getElementById('update-body').value;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Display the updated post in fetchedDiv
        fetchedDiv.innerHTML = `
          <h3>Post Updated</h3>
          <p>Post ID: ${data.id}</p>
          <p>Title: ${data.title}</p>
          <p>Body: ${data.body}</p>
        `;
      } else {
        fetchedDiv.innerHTML = `<p class="error">Error: ${xhr.statusText}</p>`;
      }
    };
  
    xhr.onerror = function () {
      fetchedDiv.innerHTML = '<p class="error">Network Error</p>';
    };
  
    xhr.send(JSON.stringify({ title, body }));
  }

  xhr.send(JSON.stringify({ title, body }));
