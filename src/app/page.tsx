import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Hero } from "@/components/sections/Hero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Skills } from "@/components/sections/Skills";
import { CaseStudyContent } from "@/components/projects/CaseStudyContent";
import { CaseStudyProvider } from "@/components/projects/CaseStudyProvider";
import { isCvAvailable } from "@/lib/assets";

export default async function HomePage() {
  const cvAvailable = await isCvAvailable();

  return (
    <CaseStudyProvider dialogContent={<CaseStudyContent />}>
      <Hero cvAvailable={cvAvailable} />
      <About />
      <Skills />
      <Experience />
      <FeaturedProject />
      <ProjectsGrid />
      <Approach />
      <Education />
      <Contact />
    </CaseStudyProvider>
  );
}