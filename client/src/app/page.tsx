"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Marquee from "react-fast-marquee";
import { TypeAnimation } from "react-type-animation";

const SG = Sour_Gummy({ subsets: ["latin"] });

interface Notes {
  _id: string;
  recipient_name: string;
  message: string;
  sender_name: string;
  send_anon: string;
  published_date: Date;
}

export default function Home() {
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/notes/for/browsenote`)
      .then((res) => {
        if (res.data.nonotesfound) {
          setNotes([]);
        } else {
          setNotes(res.data.notes);
        }
      })
      .catch((err) => {
        setNotes([]);
      });
  }, []);

  return (
    <>
      <div className="pt-32 container mx-auto ">
        <section className="my-20 px-10 flex flex-col gap-5">
          {/* <div
            className={`${SG.className} font-semibold text-3xl sm:text-5xl text-center md:w-1/2 md:mx-auto`}
          >
            messages that matter, notes that last
          </div> */}
          <div
            className={`${SG.className} font-semibold text-3xl sm:text-5xl text-center md:w-1/2 md:mx-auto`}
          >
            <TypeAnimation
              sequence={[
                "messages that matter, notes that last", // Types 'One'
                1000, // Waits 1s

                () => {
                  console.log("Sequence completed");
                },
              ]}
              wrapper="span"
              cursor={false}
              repeat={1}
            />
          </div>

          <p className="text-sm mt-10 sm:text-lg text-muted-foreground text-center ">
            <TypeAnimation
              sequence={[
                ` Because sometimes, a note is all it takes to brighten someone's world.`, // Types 'One'
                1000, // Waits 1s

                () => {
                  console.log("Sequence completed");
                },
              ]}
              wrapper="span"
              cursor={false}
              repeat={1}
            />
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-5 mt-10">
            <Link
              href="/createnote"
              className="w-full sm:w-1/4 md:w-1/5 lg:w-1/6"
            >
              <Button className="w-full">
                Leave a note <ArrowRight />
              </Button>
            </Link>
            <Link
              href="/supportus"
              className="w-full sm:w-1/4 md:w-1/5 lg:w-1/6"
            >
              <Button className="w-full">
                Support Us
                <HeartHandshake />
              </Button>
            </Link>
          </div>
        </section>
        <section className="my-20 px-10">
          <div className="grid grid-cols-1 md:grid-cols-3  gap-5">
            <Card className=" flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="my-2">Send Your Message</CardTitle>
                <CardDescription>
                  Leave a heartfelt note for your loved ones to cherish forever.
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
            <Card className=" flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="my-2">Browse Messages</CardTitle>
                <CardDescription>
                  Find messages that were written for you. Search by your name
                  to discover heartfelt dedications.
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
            <Card className=" flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="my-2">Save Messages</CardTitle>
                <CardDescription>
                  Save your favorite note if it means a lot to you.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/browsenote" className="w-full">
                  <Button className="w-full py-5" variant="outline">
                    Save notes
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
      {notes.length > 0 && (
        <section className="my-20">
          <Marquee
            speed={50}
            direction="right"
            pauseOnHover={true}
            className="mb-5"
          >
            {notes.map((note) => (
              <Card key={note._id} className="break-words mx-1  w-80 h-52 ">
                <CardHeader>
                  <CardTitle className="flex flex-row gap-5">
                    <div className="my-auto">to: {note.recipient_name}</div>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {note.message}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {note.send_anon ? (
                    <CardTitle>*sent anonymously</CardTitle>
                  ) : (
                    <CardTitle>from: {note.sender_name}</CardTitle>
                  )}
                </CardContent>
              </Card>
            ))}
          </Marquee>
          <Marquee speed={50} direction="left" pauseOnHover={true}>
            {notes.map((note) => (
              <Card key={note._id} className="break-words mx-1  w-80 h-52 ">
                <CardHeader>
                  <CardTitle className="flex flex-row gap-5">
                    <div className="my-auto">to: {note.recipient_name}</div>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {note.message}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {note.send_anon ? (
                    <CardTitle>*sent anonymously</CardTitle>
                  ) : (
                    <CardTitle>from: {note.sender_name}</CardTitle>
                  )}
                </CardContent>
              </Card>
            ))}
          </Marquee>
        </section>
      )}
    </>
  );
}
