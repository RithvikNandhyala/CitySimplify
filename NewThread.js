let threadCount = 0;

function createNewThread(event) {
    if (event) event.preventDefault();
    threadCount++;
    
    // Create new thread in sidebar
    const threadList = document.getElementById('thread-list');
    const newThreadItem = document.createElement('li');
    const threadId = 'thread-' + threadCount;
    newThreadItem.innerHTML = `
        <a href="#" class="thread-link" onclick="showThread('${threadId}', event)">
            <span class="nav-item">Thread ${threadCount}</span>
        </a>
    `;
    threadList.appendChild(newThreadItem);

    // Show the new thread content
    showThread(threadId, event);
}

function showThread(threadId, event) {
    if (event) event.preventDefault();
    const threadContent = document.getElementById('thread-content');
    if (!threadContent) {
        // Create thread-content div if it doesn't exist
        const threadContentDiv = document.createElement('div');
        threadContentDiv.id = 'thread-content';
        threadContentDiv.className = 'thread-content';
        document.querySelector('.home').appendChild(threadContentDiv);
    }
    
    threadContent.innerHTML = `
        <div class="thread-page">
            <h2>Thread ${threadId.split('-')[1]}</h2>
            <div class="thread-body">
                <p>This is the content for ${threadId}</p>
            </div>
        </div>
    `;
    threadContent.style.display = 'block';
}