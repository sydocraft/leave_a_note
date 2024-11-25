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
        <section className="my-20">
          <div className="flex flex-col gap-10">
            <div
              className={`${SG.className} mx-auto text-6xl font-semibold w-1/3 text-center`}
            >
              messages that matter, notes that last
            </div>
            <p className="text-lg text-muted-foreground mx-auto">
              Because sometimes, a note is all it takes to brighten someone's
              world.
            </p>
            <div className="flex flex-row justify-center gap-4">
              <Link href="/createnote">
                <Button>
                  Leave a note <ArrowRight />
                </Button>
              </Link>
              <Link href="/supportus">
                <Button>
                  Support Us
                  <HeartHandshake />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="my-20">
          <div className="flex flex-row justify-center gap-10">
            <Card className="basis-1/3 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="my-2">Share Your Message</CardTitle>
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
            <Card className="basis-1/3 flex flex-col justify-between">
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
            <Card className="basis-1/3 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="my-2">Leave a Like</CardTitle>
                <CardDescription>
                  "Like" notes that resonate with you, showing appreciation for
                  the message and encourage others to spread positivity.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/browsenote" className="w-full">
                  <Button className="w-full py-5" variant="outline">
                    Fav notes
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
              <Card key={note._id} className="break-words mx-1  w-80 h-60 ">
                <CardHeader>
                  <CardTitle className="flex flex-row gap-5">
                    <div className="my-auto">to: {note.recipient_name}</div>
                  </CardTitle>
                  <CardDescription className="line-clamp-5">
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
              <Card key={note._id} className="break-words mx-1  w-80 h-60 ">
                <CardHeader>
                  <CardTitle className="flex flex-row gap-5">
                    <div className="my-auto">to: {note.recipient_name}</div>
                  </CardTitle>
                  <CardDescription className="line-clamp-5">
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
