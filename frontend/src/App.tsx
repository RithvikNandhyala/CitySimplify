import React, { useState } from 'react';
 import './HomePage.css';

 //plzzzzzz work this time im begg8ing gg ginaouharohu adoufhadoufhadoufhad
 
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
   const [response, setResponse] = useState<string | null>(null);
 
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
       const res = await fetch('https://citysimplify.onrender.com/chatbot', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ query: searchQuery })
       });
 
       if (!res.ok) {
         throw new Error('Network response was not ok');
       }
 
       const data = await res.json();
       // Clean the response to remove any unwanted text
       let cleanResponse = data.message;
       
       // Remove any potential metadata or prefixes
       cleanResponse = cleanResponse.replace(/^.*content=/i, '');
       cleanResponse = cleanResponse.replace(/^["']/, '').replace(/["']$/, '');
       cleanResponse = cleanResponse.replace(/additional_kwargs=.*$/s, '');
       cleanResponse = cleanResponse.replace(/response_metadata=.*$/s, '');
       cleanResponse = cleanResponse.replace(/id=.*$/s, '');
       cleanResponse = cleanResponse.replace(/usage_metadata=.*$/s, '');
       
       // Remove any multi-line patterns that might span many lines
       cleanResponse = cleanResponse.replace(/(\n.*?(prompt_tokens|completion_tokens|cache_.*tokens|total_tokens).*?)+/g, '');
       
       // Trim any excessive whitespace
       cleanResponse = cleanResponse.trim();
       
       setResponse(cleanResponse);
     } catch (error) {
       console.error("Error fetching from FastAPI:", error);
       setResponse("Error fetching response from chatbot.");
     }
   };
 
   return (
     <div className="home">
       <nav>
         <div className="logo">
           <img src="/city-logo.png" alt="CitySimplify Logo" className="nav-logo" />
           <h1>
             <span className="city-text">City</span><span className="simplify-text">Simplify</span>
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
             <a href="/#" className="new-thread" onClick={createNewThread}>
               <i className="fa fa-plus" style={{ fontSize: "24px" }}></i>
               <span className="nav-item">New Thread</span>
             </a>
           </li>
           {threads.map(thread => (
             <li key={thread.id}>
               <a href="/#" className="thread-link" onClick={(e) => showThread(thread, e)}>
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
         <div className="banner-content">
           <h2>
             <span className="city-text">City</span><span className="simplify-text">Simplify</span>
           </h2>
         </div>
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
           {/* Hidden submit button allows Enter key to trigger the form submission */}
           <button type="submit" style={{ display: 'none' }}>Search</button>
         </form>
       </div>
 
       {/* Chatbot Response Display Section */}
       {response && (
         <div className="response">
           <h2>Chatbot Response</h2>
           <div className="response-content">
             <p>{response}</p>
           </div>
         </div>
       )}
     </div>
   );
 };
 export default HomePage;
