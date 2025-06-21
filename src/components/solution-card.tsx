'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Play, Pause } from 'lucide-react';

type SolutionCardProps = {
  solution: string;
  isDangerous: boolean;
  warning?: string;
};

export default function SolutionCard({ solution, isDangerous, warning }: SolutionCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const fullText = isDangerous && warning ? `${warning}. ${solution}` : solution;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'hi-IN';
    utterance.onend = () => setIsSpeaking(false);
    utteranceRef.current = utterance;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [solution, isDangerous, warning]);

  const handlePlayPause = () => {
    if (!utteranceRef.current || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else {
      if(window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel(); // Cancel any previous speech
        window.speechSynthesis.speak(utteranceRef.current);
      }
      setIsSpeaking(true);
    }
  };

  return (
    <Card className="mt-8 animate-in fade-in-50 duration-500 shadow-lg border-primary/50">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-2xl text-primary-foreground/95">Here's Your Jugaad!</CardTitle>
            <Button size="lg" variant="ghost" onClick={handlePlayPause} className="hover:bg-accent/20 space-x-2">
              {isSpeaking ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              <span>{isSpeaking ? 'Pause' : 'Listen'}</span>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDangerous && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="font-headline">Safety Warning!</AlertTitle>
            <AlertDescription>{warning || 'This task may be dangerous. Please consider seeking professional help.'}</AlertDescription>
          </Alert>
        )}
        <div className="prose prose-sm max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed text-base">
          {solution}
        </div>
      </CardContent>
    </Card>
  );
}
