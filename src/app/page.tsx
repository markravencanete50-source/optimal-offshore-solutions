import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Differentiators from "@/components/Differentiators";
import Team from "@/components/Team";
import Principles from "@/components/Principles";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <ProblemSolution />
        <Services />
        <Approach />
        <Differentiators />
        <Team />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
