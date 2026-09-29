import { ExecutiveHub } from "@/components/hub";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-foreground selection:text-background flex flex-col justify-between">
      <main className="flex-1 w-full">
        <ExecutiveHub />
      </main>

      <Footer />
    </div>
  );
}
