import Features from "../Features";
import Footer from "../Footer";
import Hero from "../Hero";
import Logos from "../Logos";
import PageNav from "../PageNav";

export default function Home() {
  return (
    <div>
      <PageNav />
      <Hero />
      <Logos />
      <Features />
      <Footer />
    </div>
  );
}
