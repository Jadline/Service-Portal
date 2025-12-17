import PageNav from "../components/PageNav";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Logos from "../components/Logos";
// import PageNav from "../PageNav";

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
