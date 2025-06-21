'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Microwave, Smartphone, Car, Wrench, HeartPulse } from "lucide-react";
import JugaadForm from "@/components/jugaad-form";

const categories = [
  { name: 'Electrical', icon: Zap, prompt: 'My electrical appliance is not working...' },
  { name: 'Kitchen', icon: Microwave, prompt: 'My kitchen appliance is broken...' },
  { name: 'Mobile', icon: Smartphone, prompt: 'My smartphone screen is cracked...' },
  { name: 'Vehicle', icon: Car, prompt: 'My car is making a weird noise...' },
  { name: 'Plumbing', icon: Wrench, prompt: 'I have a leaking pipe...' },
  { name: 'Health', icon: HeartPulse, prompt: 'I am not feeling well and have symptoms like...' },
];

export default function Home() {
  const [problem, setProblem] = useState('');

  const handleCategoryClick = (prompt: string) => {
    setProblem(prompt);
    const formElement = document.getElementById('jugaad-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-background via-amber-50 to-orange-50 p-4 sm:p-6 md:p-8 font-body">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-headline text-primary drop-shadow-sm">
          Jugaad.ai
        </h1>
        <p className="mt-4 text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
          Your friendly AI assistant for all your DIY needs. Ghar baithe, problem solve karein!
        </p>
      </header>
      
      <main className="w-full max-w-4xl">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold font-headline text-foreground/90 mb-6">What needs fixing today?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className="p-0 text-center bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary hover:bg-primary/5 hover:shadow-lg transition-all duration-300 cursor-pointer group rounded-xl"
                onClick={() => handleCategoryClick(category.prompt)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center gap-3">
                  <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <div id="jugaad-form">
          <JugaadForm problem={problem} setProblem={setProblem} />
        </div>
      </main>
      <footer className="w-full max-w-2xl mt-16 text-center text-muted-foreground">
        <p>Built with ❤️ for the great Indian problem-solver.</p>
        <p className="text-xs mt-1">Disclaimer: Please prioritize safety. For complex or dangerous issues, including health problems, consult a professional.</p>
      </footer>
    </div>
  );
}
