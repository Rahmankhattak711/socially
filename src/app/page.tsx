import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-2xl tracking-tighter  font-dmSerifText text-orange-500 uppercase">
          Welcome to Socially WEB App!
        </h1>
        <Button>Sign In</Button>

        <ModeToggle />
      </div>
    </div>
  );
}
