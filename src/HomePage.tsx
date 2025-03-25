import React, { useState } from 'react';
import './HomePage.css';

interface Thread {
  id: string;
  title: string;
  content: string;
}

const HomePage: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [threadCount, setThreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const createNewThread = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const newCount = threadCount + 1;
    setThreadCount(newCount);

    const newThread: Thread = {
      id: `thread-${newCount}`,
      title: `Thread ${newCount}`,
      content: `This is the content for thread-${newCount}`
    };

    setThreads(prevThreads => [...prevThreads, newThread]);
    setActiveThread(newThread);
  };

  const showThread = (thread: Thread, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setActiveThread(thread);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);

    try {
      const response = await fetch('http://localhost:8000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error fetching from FastAPI:", error);
    }
  };

  return (
    <div className="home">
      <nav>
        <div className="logo">
          <h1>
            City<span>Simplify</span>
          </h1>
        </div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="#whoweare">Who We Are</a></li>
        </ul>
      </nav>

      <div className="side-nav">
        <ul id="thread-list">
          <li>
            <a href="#" className="new-thread" onClick={createNewThread}>
              <i className="fa fa-plus" style={{ fontSize: "24px" }}></i>
              <span className="nav-item">New Thread</span>
            </a>
          </li>
          {threads.map(thread => (
            <li key={thread.id}>
              <a href="#" className="thread-link" onClick={(e) => showThread(thread, e)}>
                <span className="nav-item">{thread.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div id="thread-content" className="thread-content" style={{ display: activeThread ? 'block' : 'none' }}>
        {activeThread && (
          <div className="thread-page">
            <h2>{activeThread.title}</h2>
            <div className="thread-body">
              <p>{activeThread.content}</p>
            </div>
          </div>
        )}
      </div>

      <div className="banner">
        <h2>
          City<span>Simplify</span>
        </h2>
      </div>

      <div className="search-box">
        <span className="search-icon material-symbols-outlined">search</span>
        <form onSubmit={handleSearch}>
          <input
            className="search-input"
            type="search"
            placeholder="Search CitySimplify"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default HomePage;
