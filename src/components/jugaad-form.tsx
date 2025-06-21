'use client';
import { useActionState, useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mic, Camera, Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getSolutionAction, type SolutionState } from '@/app/actions';
import SolutionCard from './solution-card';

const initialState: SolutionState = { solution: null, isDangerous: false, warning: undefined, error: null };

export default function JugaadForm() {
    const [state, formAction, isPending] = useActionState(getSolutionAction, initialState);
    const [problem, setProblem] = useState('');

    return (
        <section className="space-y-6">
            <Card className="shadow-lg border-primary/50">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary-foreground/95">Describe Your Problem</CardTitle>
                    <CardDescription>Type it out, use your voice, or upload a photo of the issue.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={(formData) => {
                      if(problem) formAction(formData);
                    }} className="space-y-4">
                        <Textarea
                            name="problemDescription"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            placeholder="e.g., My mixer grinder is not starting..."
                            className="min-h-[120px] text-base bg-background"
                            required
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" type="button" aria-label="Use camera" className="bg-card hover:bg-accent/20">
                                    <Camera className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" type="button" aria-label="Use microphone" className="bg-card hover:bg-accent/20">
                                    <Mic className="h-5 w-5" />
                                </Button>
                            </div>
                            <Button type="submit" disabled={isPending || !problem} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent-foreground disabled:bg-accent/50">
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Thinking...
                                    </>
                                ) : (
                                    <>
                                        <Bot className="mr-2 h-5 w-5" />
                                        Get Jugaad
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {state?.error && (
                <Alert variant="destructive" className="animate-in fade-in-50">
                    <AlertTitle className="font-headline">Oops! Something went wrong.</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}

            {state?.solution && !state.error && (
                <SolutionCard
                    solution={state.solution}
                    isDangerous={state.isDangerous}
                    warning={state.warning}
                />
            )}
        </section>
    );
}
