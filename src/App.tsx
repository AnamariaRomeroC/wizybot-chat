import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import type { Message, Product, ApiProduct } from './components/types'; 

// Importing my atomic, molecular, and organism components
import { TypingDots } from './components/atoms/TypingDots';
import { MessageBubble } from './components/molecules/MessageBubble';
import { ProductCarousel } from './components/organisms/ProductCarousel';
import { ChatHeader } from './components/organisms/ChatHeader';
import { MessageInputFooter } from './components/organisms/MessageInputFooter';

// Predefined list of random text responses for the AI.
const randomAiResponses: string[] = [
  "Interesting point! Tell me more.",
  "I understand. How can I assist you further?",
  "Got it. What else is on your mind?",
  "Thanks for sharing. Let me process that.",
  "Okay, I'm listening.",
  "That's a good question. Let me think...",
  "I see. Anything else I can help with today?"
];

// Main application component.
function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const aiTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

// Effect to initialize the chat with a welcome message from the AI.
// Runs only once when the component mounts due to the empty dependency arra
  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(), // crypto.randomUUID() is used for generating unique IDs.
        text: 'Hello there! Do you need any help?',
        sender: 'ai',
        timestamp: new Date(),
        type: 'text',
      },
    ]);
  }, []);

// Effect to automatically scroll to the latest message.
// Runs whenever the 'messages' array changes.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Effect to clean up the AI typing timeout when the component unmounts.
  // This prevents potential memory leaks or errors if the AI is "typing" when the component is removed.
  useEffect(() => {
    return () => {
      if (aiTypingTimeoutRef.current) {
        clearTimeout(aiTypingTimeoutRef.current);
      }
    };
  }, []);

  // Fetches product data from the Wizybot API.
  // Uses the development proxy (configured in package.json) to avoid CORS issues.
  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch('/products/demo-product-list'); // Relative path for the proxy.
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error! status: ${response.status}`, errorText); // Log the error details.
        throw new Error(`API error! status: ${response.status}`);
      }
      const apiData: ApiProduct[] = await response.json();

      // Maps the raw API product data to the internal Product structure.
      const mappedProducts: Product[] = apiData.map((apiItem) => ({
        id: apiItem.id,
        name: apiItem.displayTitle,
        // The API does not provide a price, so a random placeholder is generated.
        price: apiItem.price !== undefined ? apiItem.price : parseFloat((Math.random() * (200 - 10) + 10).toFixed(2)),
        imageUrl: apiItem.imageUrl,
        productUrl: apiItem.url,
      }));
      return mappedProducts;
    } catch (error) {
      console.error("Failed to fetch products:", error); // Log any failure during the fetch operation.
      return [];
    }
  };

  // Selects a specified number of random products from a given list.
  const getRandomProducts = (products: Product[], count: number): Product[] => {
    if (products.length === 0) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, products.length));
  };

  // Handles the submission of a new message from the user.
  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput === '') return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsAiTyping(true);

    if (aiTypingTimeoutRef.current) {
      clearTimeout(aiTypingTimeoutRef.current);
    }

    // Checks if the user is requesting product recommendations.
    if (trimmedInput.toLowerCase() === "i want product recommendations") {
      const allProducts = await fetchProducts();
      setIsAiTyping(false);

      if (allProducts.length > 0) {
        const recommendedProducts = getRandomProducts(allProducts, 3);
        if (recommendedProducts.length > 0) {
          const aiProductMessage: Message = {
            id: crypto.randomUUID(),
            sender: 'ai',
            timestamp: new Date(),
            type: 'product_recommendation',
            products: recommendedProducts,
          };
          setMessages((prevMessages) => [...prevMessages, aiProductMessage]);
        } else {
          // Fallback if products were fetched but recommendations couldn't be selected.
           const aiErrorMessage: Message = {
            id: crypto.randomUUID(),
            text: "I found some products, but couldn't pick recommendations at this moment. Please try again.",
            sender: 'ai',
            timestamp: new Date(),
            type: 'text',
           };
           setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
        }
      } else {
        // Fallback if fetching products failed.
        const aiErrorMessage: Message = {
          id: crypto.randomUUID(),
          text: "I'm sorry, I couldn't fetch product recommendations at the moment. Please check the console for more details or try again later.",
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
        };
        setMessages((prevMessages) => [...prevMessages, aiErrorMessage]);
      }
    } else {
      // Standard AI text response after a delay.
      aiTypingTimeoutRef.current = setTimeout(() => {
        const randomResponseText = randomAiResponses[Math.floor(Math.random() * randomAiResponses.length)];
        const aiResponseMessage: Message = {
          id: crypto.randomUUID(),
          text: randomResponseText,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
        };
        setMessages((prevMessages) => [...prevMessages, aiResponseMessage]);
        setIsAiTyping(false);
      }, 3000);
    }
  };

  // Handles changes in the input field.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handles the 'Enter' key press in the input field to send a message.
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isAiTyping) {
      handleSendMessage();
    }
  };

  // Formats a Date object into a readable time string
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Renders the main application UI.
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="flex flex-col w-full max-w-md h-[700px] bg-white shadow-xl rounded-lg overflow-hidden">
        <ChatHeader />

        <main className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar bg-gray-50">
          {messages.map((msg) => {
            if (msg.type === 'product_recommendation' && msg.products && msg.products.length > 0) {
              return (
                <div key={msg.id} className="flex justify-start">
                  <div className="max-w-[85%]">
                    <ProductCarousel products={msg.products} />
                    <p className="text-xs text-gray-500 text-left mt-1 ml-1">
                      {formatTimestamp(msg.timestamp)}
                    </p>
                  </div>
                </div>
              );
            }
            if (msg.type === 'text' && msg.text) {
              return (
                <MessageBubble key={msg.id} message={msg} formatTimestamp={formatTimestamp} />
              );
            }
            // Returns null for unknown message types or empty messages to avoid rendering issues.
            return null;
          })}
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 rounded-lg max-w-[70%] shadow rounded-bl-none">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <MessageInputFooter
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          isAiTyping={isAiTyping}
        />
      </div>
    </div>
  );
}

export default App;