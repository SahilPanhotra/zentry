import Hero from "./components/Hero";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
    </main>
  );
}
