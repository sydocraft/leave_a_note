import React from "react";
import { Button } from "@/components/ui/button";
import { Sour_Gummy } from "next/font/google";

const SG = Sour_Gummy({ subsets: ["latin"] });

export default function Supportus() {
  return (
    <div className="pt-32 container mx-auto ">
      <section className="my-20">
        <div className="flex flex-col gap-16 px-3 ">
          <div className={`${SG.className}  text-3xl sm:text-5xl text-center `}>
            LeaveANote
          </div>

          <p className="sm:text-xl text-md text-muted-foreground text-center px-8 sm:w-1/2 w-full mx-auto text-balance ">
            LeaveANote is and will always be completely free to use! However, if
            you would like to support the development and server costs, you can
            make a voluntary contribution. Any amount is deeply appreciated and
            helps keep this service running smoothly for everyone.
          </p>

          <Button disabled className="sm:w-1/6 w-1/3 mx-auto">
            Donate
          </Button>
        </div>
      </section>
    </div>
  );
}
