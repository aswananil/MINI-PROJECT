import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 z-50">
      <div className="flex w-full items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl">EcoTrack</span>
        </a>
      </div>
    </header>
  );
}
