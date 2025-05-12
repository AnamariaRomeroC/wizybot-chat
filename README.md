Wizybot Chat Interface
======================

This project is an implementation of a basic chat interface that simulates the Wizybot UI/UX experience, developed as part of a technical evaluation. The interface allows users to interact with a simulated AI agent, receive text responses and product recommendations in a carousel.

Tech Stack
----------
* React.
* TypeScript.
* Tailwind CSS.
* HTML5 & CSS3.

Prerequisites
-------------
* Node.js.
* npm.
* nvm.

Configuration and Installation (After Cloning from GitHub)
-----------------------------------------------------------

1. Navigate to the Project Folder:
    Open your terminal and navigate to the directory where the repository was cloned.
    cd wizybot-chat

2. Install Dependencies:
    In the root project folder, install all necessary dependencies defined in `package.json`:
    npm install

3. Verify Proxy Configuration (Important for Development):
    This project uses a proxy for product API requests. The configuration should already be in the `package.json` file.
    Verify that the following line is present at the top level of the JSON object in `package.json`:
    “`proxy`: `https://api.wizybot.com`.

4.  Verify Public Files (Logo):
    Make sure the following files are present in the `public/` folder:
    `wizybot-logo.png`.

Running App
----------------------

1. Start the development server:
    npm start

2.  The application will automatically open in your web browser at http://localhost:3000.

API
-------------
* Wizybot Products API (Demo): https://api.wizybot.com/products/demo-product-list
    * This API is used to get the list of products when the user requests recommendations.
    * Due to browser CORS policies, direct requests from the client (browser) to this API are blocked. The `proxy` configuration in `package.json` fixes this for the development environment.

Structure
-----------------------------------------------------------------
wizybot-chat/
├── public/
│   ├── index.html         
│   ├── wizybot-logo.png   
│   └── wizybot-favicon.png 
│   └── ...                
├── src/
│   ├── components/        
│   │   ├── atoms/         
│   │   │   ├── SendIcon.tsx
│   │   │   ├── TypingDots.tsx
│   │   │   └── WizybotLogoIcon.tsx
│   │   ├── molecules/     
│   │   │   ├── MessageBubble.tsx
│   │   │   └── ProductCard.tsx
│   │   └── organisms/     
│   │       ├── ChatHeader.tsx
│   │       ├── MessageInputFooter.tsx
│   │       └── ProductCarousel.tsx
│   ├── types.ts           
│   ├── App.css            
│   ├── App.tsx            
│   ├── index.css          
│   └── index.tsx          
│   └── ...                
├── package.json          
├── tailwind.config.js     
└── tsconfig.json          
