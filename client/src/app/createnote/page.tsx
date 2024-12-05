"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";
import { Sour_Gummy } from "next/font/google";

const SG = Sour_Gummy({ subsets: ["latin"] });

export default function Createnote() {
  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [sendAnon, setSendAnon] = useState<boolean>(false);

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

  const handleRecipientNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientName(event.target.value);
  };
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleSenderNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSenderName(event.target.value);
  };
  const handleSendAnonChange = () => {
    setSendAnon(!sendAnon);
    setSenderName("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (sendAnon) {
      if (!recipientName || !message) {
        setError("Both recipient name and message are required.");
        return;
      } else {
        const body = {
          recipient_name: recipientName,
          message: message,
          sender_name: "",
          send_anon: true,
        };

        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, body)
          .then((res) => {
            setRecipientName("");
            setMessage("");
            setSenderName("");
            setSendAnon(false);

            toast({
              title: "Yay!",
              description: "Notes succesfully submitted.",
            });
          })
          .catch((err) => {
            setError("Error submitting notes.");
          });
      }
    } else {
      if (!recipientName || !message || !senderName) {
        setError("Recipient name, sender name and message are required.");
        return;
      } else {
        const body = {
          recipient_name: recipientName,
          message: message,
          sender_name: senderName,
          send_anon: false,
        };

        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, body)
          .then((res) => {
            setRecipientName("");
            setMessage("");
            setSenderName("");
            setSendAnon(false);

            toast({
              title: "Yay!",
              description: "Notes succesfully submitted.",
            });
          })
          .catch((err) => {
            setError("Error submitting notes.");
          });
      }
    }
  };

  return (
    <div className="pt-32 container mx-auto ">
      <section className="my-20">
        <div
          className={`${SG.className}  text-3xl sm:text-5xl  text-center mb-10 `}
        >
          LeaveANote
        </div>
        <Card className="w-10/12 lg:w-1/2 p-2 lg:p-6 mx-auto">
          <CardHeader>
            <CardTitle className="flex flex-row gap-5">
              <div>Dear {"{Someone}"}, ... </div> <Send />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Label>Recipient Name</Label>
                <Input
                  type="text"
                  value={recipientName}
                  onChange={handleRecipientNameChange}
                  maxLength={25}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Message</Label>
                <Input
                  type="text"
                  value={message}
                  onChange={handleMessageChange}
                  maxLength={600}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label>Your Name</Label>
                <Input
                  type="text"
                  value={senderName}
                  onChange={handleSenderNameChange}
                  disabled={sendAnon}
                  maxLength={25}
                />
              </div>
              <div className="flex flex-row gap-3 mt-auto">
                <Checkbox onClick={handleSendAnonChange} checked={sendAnon} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Send anonymously
                </label>
              </div>

              <Button className="mt-5" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
