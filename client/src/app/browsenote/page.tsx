"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Sour_Gummy } from "next/font/google";

const SG = Sour_Gummy({ subsets: ["latin"] });

interface Notes {
  _id: string;
  recipient_name: string;
  message: string;
  sender_name: string;
  send_anon: string;
  published_date: Date;
}

Font.register({
  family: "Montserrat",
  src: "https://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 40,
    flexGrow: 1,
  },
  text_message: {
    fontSize: 14,
    fontFamily: "Montserrat",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "justify",
  },
  text_people: {
    fontSize: 14,
    fontFamily: "Montserrat",
  },
  text_footer: {
    fontSize: 10,
    marginTop: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Montserrat",
  },
});

// MyDocument accepts dynamic props (message, sender, recipient, etc.)
const MyDocument = ({
  message,
  recipient,
  sender,
}: {
  message: string;
  recipient: string;
  sender: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text_people}>Dear {recipient},</Text>
        <Text style={styles.text_message}>{message}</Text>
        <Text style={styles.text_people}>
          Sincerely, {sender || "Anonymous"}
        </Text>
        <Text style={styles.text_footer}>- Created with LeaveANote -</Text>
      </View>
    </Page>
  </Document>
);

export default function Browsenote() {
  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const [recipientName, setRecipientName] = useState<string>("");
  const [recipientNameSearched, setRecipientNameSearched] =
    useState<string>("");
  const [notes, setNotes] = useState<Notes[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    // Fetch notes when page or search term changes
    if (recipientNameSearched) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/notes/for/browsenote?search=${recipientNameSearched}&page=${currentPage}&limit=9`
        )
        .then((res) => {
          if (res.data.nonotesfound) {
            setError("No notes found.");
            setNotes([]);
            setTotalPages(1);
          } else {
            setNotes(res.data.notes);
            setTotalPages(res.data.totalPages);
          }
        })
        .catch((err) => {
          setError("Error retrieving notes.");
          setNotes([]);
        });
    }
  }, [recipientNameSearched, currentPage]); // Dependency array includes both search term and page

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
      setRecipientNameSearched(recipientName); // Set searched name
      setRecipientName(""); // Clear input field after search
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update current page
    }
  };

  const handleDownloadPDF = (note: Notes) => {
    // Generate the PDF with dynamic data from the note
    ReactPDF.pdf(
      <MyDocument
        message={note.message}
        recipient={note.recipient_name}
        sender={note.sender_name}
      />
    )
      .toBlob()
      .then((blob) => {
        // Create a download link for the generated PDF
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Note_for_${note.recipient_name}.pdf`; // Dynamic filename based on recipient
        link.click(); // Trigger the download
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        setError("Failed to generate PDF.");
      });
  };

  return (
    <div className="pt-32 container mx-auto ">
      <section className="my-20">
        <div
          className={`${SG.className} text-3xl sm:text-5xl  text-center mb-10`}
        >
          LeaveANote
        </div>
        <div className="flex sm:flex-row flex-col sm:w-1/2 lg:w-1/3 w-10/12 p-6 mx-auto gap-3">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-8 ">
            {notes.map((note) => (
              <Dialog key={note._id}>
                <DialogTrigger>
                  <Card className="break-words h-full">
                    <CardHeader>
                      <CardTitle className="flex flex-row gap-5">
                        <div className="my-auto">to: {note.recipient_name}</div>
                        <Send />
                      </CardTitle>
                      <CardDescription
                        className={`${SG.className} text-left	line-clamp-4`}
                      >
                        {note.message}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-left	">
                      {note.send_anon ? (
                        <CardTitle>*sent anonymously</CardTitle>
                      ) : (
                        <CardTitle>from: {note.sender_name}</CardTitle>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="w-10/12">
                  <DialogTitle>Dear {note.recipient_name},</DialogTitle>
                  <DialogDescription className="italic ">
                    {note.message}
                  </DialogDescription>
                  <DialogFooter>
                    <CardContent className="px-0	">
                      {note.send_anon ? (
                        <div>
                          <CardTitle>Sincerely,</CardTitle>
                          <CardTitle>anonymous.</CardTitle>
                        </div>
                      ) : (
                        <div>
                          <CardTitle>Sincerely,</CardTitle>
                          <CardTitle>{note.sender_name}.</CardTitle>
                        </div>
                      )}
                    </CardContent>
                  </DialogFooter>
                  <div>
                    <Button
                      className="w-full sm:w-min"
                      onClick={() => handleDownloadPDF(note)}
                    >
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {notes.length > 0 && (
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              className="sm:w-36 w-10"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>
            <span className="my-auto text-sm">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              className="sm:w-36 w-10"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
