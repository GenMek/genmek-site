import { IntroScreen } from "@/components/IntroScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorGlow } from "@/components/CursorGlow";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Problems } from "@/components/sections/Problems";
import { Solutions } from "@/components/sections/Solutions";
import { Process } from "@/components/sections/Process";
import { Differentials } from "@/components/sections/Differentials";
// import { Projects } from "@/components/sections/Projects";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <IntroScreen />
      <ScrollProgress />
      <CursorGlow />
      <Header />

      <main>
        <Hero />
        <About />
        <Problems />
        <Solutions />
        <Process />
        <Differentials />
        {/* <Projects /> */}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
