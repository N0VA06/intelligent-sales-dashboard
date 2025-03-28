
import React, { useState } from 'react';
import { Bot, Send, X, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

// This is a simple implementation - in a real app, this would connect to an AI API
const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    {role: 'assistant', content: 'Hello! I can help you analyze your sales data. Try asking about top-selling products, sales trends, or customer preferences.'}
  ]);
  const [isListening, setIsListening] = useState(false);
  
  // Simulate AI response
  const mockResponses = [
    "Based on current trends, electronics products are showing a 12% increase in sales compared to last month.",
    "Your top-selling region is California, with 24% of total revenue this quarter.",
    "Customer retention has improved by 8% since implementing your new loyalty program.",
    "I recommend focusing marketing efforts on the Midwest region where sales are underperforming by 15%.",
    "The best-selling product category this month is smartphones, followed by laptops and smart home devices."
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {role: 'user', content: message}]);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages(prev => [...prev, {role: 'assistant', content: randomResponse}]);
    }, 1000);
  };
  
  const toggleVoiceInput = () => {
    if (!isListening) {
      // Check if speech recognition is available
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // This would implement actual speech recognition in a real app
        setIsListening(true);
        toast.info('Voice recognition activated');
        
        // Simulate voice input after 3 seconds
        setTimeout(() => {
          setIsListening(false);
          setMessage('What are the top-selling products this month?');
          toast.success('Voice input received');
        }, 3000);
      } else {
        toast.error('Speech recognition not supported in your browser');
      }
    } else {
      setIsListening(false);
      toast.info('Voice recognition stopped');
    }
  };
  
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 rounded-full h-14 w-14 shadow-lg"
        size="icon"
      >
        <Bot size={24} />
      </Button>
    );
  }
  
  return (
    <Card className="fixed right-6 bottom-6 w-80 md:w-96 h-[550px] shadow-lg flex flex-col z-50">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">AI Sales Assistant</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary/80"
        >
          <X size={18} />
        </Button>
      </CardHeader>
      
      <CardContent className="px-3 py-4 flex-1 overflow-auto flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={toggleVoiceInput}
            className={isListening ? 'bg-red-100 text-red-500' : ''}
          >
            <Mic size={18} />
          </Button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-md px-3 py-2"
            placeholder="Ask about your sales data..."
          />
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
