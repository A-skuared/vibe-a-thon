import { Card, CardContent } from "@/components/ui/card";
import { Zap, Microwave, Smartphone, Car, Wrench } from "lucide-react";
import JugaadForm from "@/components/jugaad-form";

const categories = [
  { name: 'Electrical', icon: Zap },
  { name: 'Kitchen', icon: Microwave },
  { name: 'Mobile', icon: Smartphone },
  { name: 'Vehicle', icon: Car },
  { name: 'Plumbing', icon: Wrench },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-4 sm:p-6 md:p-8 font-body">
      <header className="w-full max-w-2xl mb-8 text-center">
        <h1 className="text-5xl font-extrabold font-headline text-primary-foreground bg-primary py-2 px-4 rounded-lg inline-block shadow-md">
          Jugaad.ai
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">Your AI-powered DIY assistant</p>
      </header>
      
      <main className="w-full max-w-2xl">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4 font-headline text-primary-foreground/90">Quick Categories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="p-0 text-center hover:bg-card/80 hover:border-primary transition-all cursor-pointer shadow-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                  <category.icon className="h-8 w-8 text-primary" />
                  <span className="font-semibold text-sm">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <JugaadForm />
      </main>
      <footer className="w-full max-w-2xl mt-12 text-center text-muted-foreground text-sm">
        <p>Built with ❤️ for the everyday problem solver.</p>
      </footer>
    </div>
  );
}
