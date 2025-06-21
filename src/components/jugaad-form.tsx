'use client';
import { useActionState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mic, Camera, Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getSolutionAction, type SolutionState } from '@/app/actions';
import SolutionCard from './solution-card';

const initialState: SolutionState = { solution: null, isDangerous: false, warning: undefined, error: null };

type JugaadFormProps = {
    problem: string;
    setProblem: (problem: string) => void;
};

export default function JugaadForm({ problem, setProblem }: JugaadFormProps) {
    const [state, formAction, isPending] = useActionState(getSolutionAction, initialState);

    useEffect(() => {
        if (state.solution && !state.error && !isPending) {
            setProblem('');
        }
    }, [state, isPending, setProblem]);

    return (
        <section className="space-y-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Describe Your Problem</CardTitle>
                    <CardDescription>The more detail, the better the jugaad!</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <Textarea
                            name="problemDescription"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            placeholder="e.g., My mixer grinder is not starting..."
                            className="min-h-[120px] text-base"
                            required
                        />
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" type="button" aria-label="Use camera">
                                    <Camera className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" type="button" aria-label="Use microphone">
                                    <Mic className="h-5 w-5" />
                                </Button>
                            </div>
                            <Button type="submit" disabled={isPending || !problem} size="lg">
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
                <Alert variant="destructive">
                    <AlertTitle>Oops! Something went wrong.</AlertTitle>
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
