"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventUrl: string;
  eventTitle: string;
}

export function TicketDialog({ isOpen, onClose, eventUrl, eventTitle }: TicketDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Transform standard URL to embedded URL if necessary
  // Standard: https://web.fourvenues.com/es/outxide-club/events/slug
  // Embedded often uses a slightly different path or same with iframe parameters
  const embedUrl = eventUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 z-[101] flex flex-col bg-background border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-card">
              <h3 className="text-lg font-bold text-white truncate mr-4">
                Entradas: {eventTitle}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 bg-white">
              <iframe
                src={embedUrl}
                className="w-full h-full border-none"
                title={`Comprar entradas para ${eventTitle}`}
                allow="payment"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
              />
            </div>
            <div className="p-4 bg-card text-center">
              <p className="text-xs text-muted-foreground">
                Pago seguro gestionado por FourVenues
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
