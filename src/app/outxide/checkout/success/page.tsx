"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Ticket } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useT } from "@/i18n";

export default function CheckoutSuccessPage() {
  const t = useT();

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <CheckCircle className="h-10 w-10 text-emerald-400" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-white mb-3">
            {t("outxide.checkoutSuccess")}
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t("outxide.checkoutSuccessDesc")}
          </p>

          <div className="rounded-2xl border border-white/5 bg-zinc-950/50 p-5 mb-8">
            <div className="flex items-center gap-3 text-left">
              <Ticket className="h-5 w-5 text-outxide shrink-0" />
              <p className="text-sm text-muted-foreground">
                {t("outxide.checkoutSuccessEmail")}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/outxide#eventos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-outxide hover:bg-outxide/80 text-white px-6 py-3 text-sm font-medium transition-colors"
            >
              {t("outxide.backToEvents")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-white px-6 py-3 text-sm font-medium transition-colors"
            >
              {t("common.backToGroup")}
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
