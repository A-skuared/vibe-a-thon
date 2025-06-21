'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

type SolutionCardProps = {
  solution: string;
  isDangerous: boolean;
  warning?: string;
};

export default function SolutionCard({ solution, isDangerous, warning }: SolutionCardProps) {
  return (
    <Card className="mt-8 animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle>Here's Your Jugaad!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDangerous && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Safety First!</AlertTitle>
            <AlertDescription>{warning || 'This task may be dangerous. Please consider seeking professional help.'}</AlertDescription>
          </Alert>
        )}
        <div className="whitespace-pre-wrap leading-relaxed">
          {solution}
        </div>
      </CardContent>
    </Card>
  );
}
