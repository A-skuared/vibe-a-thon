'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Microwave, Smartphone, Car, Wrench } from "lucide-react";
import JugaadForm from "@/components/jugaad-form";

const categories = [
  { name: 'Electrical', icon: Zap, prompt: 'My electrical appliance is not working...' },
  { name: 'Kitchen', icon: Microwave, prompt: 'My kitchen appliance is broken...' },
  { name: 'Mobile', icon: Smartphone, prompt: 'My smartphone screen is cracked...' },
  { name: 'Vehicle', icon: Car, prompt: 'My car is making a weird noise...' },
  { name: 'Plumbing', icon: Wrench, prompt: 'I have a leaking pipe...' },
];

export default function Home() {
  const [problem, setProblem] = useState('');

  const handleCategoryClick = (prompt: string) => {
    setProblem(prompt);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-5xl font-bold">
          Jugaad.ai
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your friendly AI assistant for all your DIY needs.
        </p>
      </header>
      
      <main className="w-full max-w-4xl space-y-8">
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">What needs fixing today?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className="text-center hover:bg-accent hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleCategoryClick(category.prompt)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <category.icon className="h-10 w-10 text-primary" />
                    <span className="font-medium">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <JugaadForm problem={problem} setProblem={setProblem} />
      </main>

      <footer className="w-full max-w-2xl text-center text-sm text-muted-foreground">
        <p>Disclaimer: Please prioritize safety. For complex or dangerous issues, consult a professional.</p>
      </footer>
    </div>
  );
}
