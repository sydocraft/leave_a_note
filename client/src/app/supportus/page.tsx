import React from "react";
import { Button } from "@/components/ui/button";
import { Sour_Gummy } from "next/font/google";

const SG = Sour_Gummy({ subsets: ["latin"] });

export default function Supportus() {
  return (
    <div className="pt-32 container mx-auto ">
      <section className="my-20">
        <div className="flex flex-col gap-16">
          <div
            className={`${SG.className}  text-5xl font-semibold text-center `}
          >
            LeaveANote
          </div>

          <code className="relative text-xl rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono  font-semibold text-center w-1/2 mx-auto">
            LeaveANote is and will always be completely free to use! However, if
            you'd like to support the development and server costs, you can make
            a voluntary contribution. Any amount is deeply appreciated and helps
            keep this service running smoothly for everyone :)
          </code>
          <Button className="w-1/5 mx-auto">Donate </Button>
        </div>
      </section>
    </div>
  );
}
