import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sour_Gummy } from "next/font/google";
import { ArrowRight, HeartHandshake } from "lucide-react";
import Link from "next/link";

const SG = Sour_Gummy({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="pt-32 container mx-auto ">
      <section className="my-20">
        <div className="flex flex-col gap-10">
          <div
            className={`${SG.className} mx-auto text-3xl font-semibold w-1/3 text-center`}
          >
            a bunch of the untold words, sent through the song
          </div>
          <p className="text-lg text-muted-foreground mx-auto">
            Express your untold message through the song.
          </p>
          <div className="flex flex-row justify-center gap-4">
            <Link href="/createnote">
              <Button>
                Leave a note <ArrowRight />
              </Button>
            </Link>
            <Button>
              Support Us
              <HeartHandshake />
            </Button>
          </div>
        </div>
      </section>
      <section className="my-20">
        <div className="flex flex-row justify-center gap-10">
          <Card className="basis-1/3 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Share Your Message</CardTitle>
              <CardDescription>
                Choose a song and write a heartfelt message to someone special.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/createnote" className="w-full">
                <Button className="w-full py-5" variant="outline">
                  Leave your note
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="basis-1/3 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Browse Messages</CardTitle>
              <CardDescription>
                Find messages that were written for you. Search by your name to
                discover heartfelt dedications.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/browsenote" className="w-full">
                <Button className="w-full py-5" variant="outline">
                  Browse notes
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="basis-1/3 flex flex-col justify-between">
            <CardHeader>
              <CardTitle>Detail Messages</CardTitle>
              <CardDescription>
                You can click on any message card to read the full story and
                listen to the chosen song!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
