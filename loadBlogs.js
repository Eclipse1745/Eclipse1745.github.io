async function loadBlogs() {
  try {
    const response = await fetch('blogs.json');
    const blogs = await response.json();
    const container = document.getElementById('blog-container');
    
    blogs.forEach(blog => {
      const postDiv = document.createElement('div');
      postDiv.className = 'blog-post';
      
      postDiv.innerHTML = `
        <h2 class="post-title">${blog.title}</h2>
        <p class="post-date">${blog.date}</p>
        <hr>
        <img src="${blog.image.src}" alt="${blog.image.alt}" class="post-image" style="object-fit: ${blog.image.displayMode || 'cover'}">
        <div class="post-text">${blog.content}</div>
      `;
      
      container.appendChild(postDiv);
    });
  } catch (error) {
    console.error('Error loading blogs:', error);
  }
}

loadBlogs();
