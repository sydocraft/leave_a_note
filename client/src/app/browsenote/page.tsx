"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Divide, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Sour_Gummy } from "next/font/google";
import { Send } from "lucide-react";

const SG = Sour_Gummy({ subsets: ["latin"] });

interface Notes {
  _id: string;
  recipient_name: string;
  message: string;
  sender_name: string;
  send_anon: string;
  published_date: Date;
}

export default function Browsenote() {
  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientNameSearched, setRecipientNameSearched] =
    useState<string>("");
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Oopss!",
        description: error,
        variant: "destructive",
      });
    }

    setError("");
  }, [error]);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  const handleRecipientNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!recipientName) {
      setError("Recipient name are required.");
      return;
    } else {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/for/browsenote?search=${recipientName}`
        )
        .then((res) => {
          setRecipientNameSearched(recipientName);
          setRecipientName("");
          if (res.data.nonotesfound) {
            setError("No notes found.");
            setNotes([]);
          } else {
            setNotes(res.data);
          }
        })
        .catch((err) => {
          setError("Error retrieving notes.");
          setNotes([]);
        });
    }

    console.log(recipientName);
  };

  return (
    <div className="pt-32 container mx-auto ">
      <section className="my-20">
        <div className={`${SG.className}  text-5xl  text-center mb-10 `}>
          LeaveANote
        </div>
        <div className="flex flex-row w-1/3 p-6 mx-auto gap-3">
          <Input
            placeholder="Recipient Name"
            type="text"
            value={recipientName}
            onChange={handleRecipientNameChange}
          />
          <Button type="submit" onClick={handleSubmit}>
            <Search />
            Search
          </Button>
        </div>
        {notes.length > 0 && (
          <div className="px-9 text-md italic font-semibold ">
            Notes left for {recipientNameSearched} :
          </div>
        )}
        {notes.length > 0 && (
          <div className="grid grid-cols-3 gap-5 p-8">
            {notes.map((note, index) => (
              <Card key={note._id} className="break-words">
                <CardHeader>
                  <CardTitle className="flex flex-row gap-5">
                    <div className="my-auto ">to: {note.recipient_name}</div>
                    <Send />
                  </CardTitle>
                  <CardDescription className={`${SG.className}  `}>
                    {note.message}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {note.send_anon ? (
                    <CardTitle>Sent anonymously</CardTitle>
                  ) : (
                    <CardTitle>from: {note.sender_name}</CardTitle>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
