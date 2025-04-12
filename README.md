# CitySimplify
## What is it?
CitySimplify is a chatbot designed to make your life easier by condensing city and state laws into a readable format. Have you even been to a new state and been confused about what is different to your home? Our team at AAID has. With CitySimplify, you don't have to worry about issues like that ever again.

We at AAID aimed to solve a problem that plagues most of us: trying to understand all of the laws for every state. There can be small differences between each one, and it gets confusing trying to remember what you can do in which state. CitySimplify will allow specific questions about the law to be answered with ease, allowing for a seamless transition between states and cities. No more stupid tickets for parking somewhere you could have at home. CitySimplify's got your back.

## How it works
We utilized a RAG model that takes a specific locations documents and laws that processes them into a database, allowing for accurate responses about city specific questions. Using ChromaDB to locally store our files, retrieving specific answers about laws becomes a breeze. Our API is built from FastAPI and works with React to buuld an efficient and sleek fullstack design.

When a user makes a request from our webpage, the call goes through FastAPI to an LLM. Using a prompt, we then get a response through RAG that accurately answers the question based off the context from the documents. 

## Credits
Credit to Pixegami on Youtube for an amazing tutorial on building a RAG model.
