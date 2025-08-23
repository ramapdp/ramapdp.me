import { Button } from "components/ui/button";
import DialogForm from "layouts/form-email";
import { Sparkles } from "lucide-react";
import { Fragment } from "react";

const HeroInfo = () => {
  return (
    <Fragment>
      <div className="text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-3 text-xs backdrop-blur-md">
        <Sparkles className="size-3.5" />
        <span className="hidden sm:inline">Building delightful, fast web experiences</span>
        <span className="sm:hidden">Building fast web experiences</span>
      </div>

      <h1 className="font-rethink-sans text-4xl leading-tight font-bold text-balance sm:text-5xl md:text-6xl lg:text-7xl">
        I'm Rama.
      </h1>

      <p className="text-muted-foreground mt-5 max-w-[70ch] text-base text-pretty sm:text-base">
        I work with the React Ecosystem for about 2 years, focusing on crafting small reusable components to large-scale
        applications.
      </p>

      {/* CTAs */}
      <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
        <DialogForm />
        <Button asChild variant="outline" className="cursor-pointer">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            Check Resume
          </a>
        </Button>
      </div>

      {/* Socials */}
      <div className="text-muted-foreground mt-5 flex flex-wrap gap-2 text-sm sm:gap-4">
        <a className="hover:underline" href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <span>•</span>
        <a className="hover:underline" href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span>•</span>
        <a className="hover:underline" href="https://x.com" target="_blank" rel="noreferrer">
          Twitter / X
        </a>
      </div>
    </Fragment>
  );
};

export default HeroInfo;
