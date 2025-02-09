"use client";

import { AnimatePresence, motion } from "framer-motion";
import LandingSections from "@/components/LandingSections";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowBigDown,
  MessageCircle,
  MessageSquareCodeIcon,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Chat() {
  const [showChatIcon, setShowChatIcon] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll Y:", window.scrollY); // Debugging line
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LandingSections />

      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 z-50 right-4"
          >
            <Button
              onClick={toggleChat}
              ref={chatIconRef}
              size={"icon"}
              className="rounded-full p-4"
            >
              {isChatOpen ? (
                <ArrowBigDown />
              ) : (
                <MessageCircle className="size-12" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 z-50 right-4 w-[95%] md:max-w-[500px]"
          >
            <Card className="border-2">
              <CardHeader className="flex justify-between items-center w-full flex-row space-y-0 pb-3">
                <CardTitle className="text-lg font-medium">Chat with AI</CardTitle>

                <Button onClick={toggleChat} variant={"ghost"} size={"sm"} className="py-0 px-2">
                  <X className="size-4" />
                  <span className="sr-only">Close Chat</span>
                </Button>
              </CardHeader>
              <CardContent className="p-0">

              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
