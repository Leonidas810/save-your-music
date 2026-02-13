import AnimatedHero from "../components/AnimatedHero";
import { PageTemplate } from "@/components/templates/Page.template";

export default function Home() {
  return (
    <div className="min-h-screen dark:bg-black bg-white flex flex-col justify-center">
      <PageTemplate>
        <AnimatedHero />
      </PageTemplate>
    </div>
  );
}
