import { ExecutiveHub } from "@/components/hub";
import { Footer } from "@/components/footer";
import { SocialIntro } from "@/components/social-intro";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary flex flex-col justify-between">
      <SocialIntro />
      <main className="flex-1">
        <ExecutiveHub />
      </main>

      <Footer />
    </div>
  );
}
