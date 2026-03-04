import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "What is Doginalspad?",
    answer:
      "Doginalspad is the #1 DRC20 token launchpad built on Dogechain. It allows token projects to launch their DRC20 tokens transparently, and enables the community to participate in launches using DOGE.",
  },
  {
    question: "What is DRC20?",
    answer:
      "DRC20 is a token standard on Dogechain — similar to ERC20 on Ethereum. DRC20 tokens enable projects to create fungible tokens on the Dogechain network with full smart contract support.",
  },
  {
    question: "What is $PAD?",
    answer:
      "$PAD is the first token launching on Doginalspad. It serves as the native utility token of the Doginalspad ecosystem, granting holders special access, reduced fees, and governance rights on the platform.",
  },
  {
    question: "How do I participate in a launch?",
    answer:
      "To participate in a launch, connect your wallet on Doginalspad, navigate to the active launch, and click 'Participate with DOGE'. You'll be able to contribute DOGE in exchange for the project's DRC20 tokens. Wallet integration is coming soon!",
  },
  {
    question: "Which wallets are supported?",
    answer:
      "Doginalspad will support major Dogechain-compatible wallets including MetaMask (configured for Dogechain), and dedicated Doge ecosystem wallets. Wallet integration is actively in development.",
  },
  {
    question: "Is there a minimum or maximum contribution?",
    answer:
      "Each launch sets its own contribution limits. These details are displayed on each launch card and detailed view. Always check the specific launch's parameters before participating.",
  },
  {
    question: "How are tokens distributed?",
    answer:
      "Token distribution varies by project. Details including total supply, price per token in DOGE, and fundraise goals are clearly shown on each launch page.",
  },
  {
    question: "How do I launch my own project on Doginalspad?",
    answer:
      "If you're a project team looking to launch on Doginalspad, please reach out to our team through our social media channels. We'll guide you through the vetting process and help set up your launch.",
  },
];

export function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Everything you need to know about Doginalspad and participating in
          DRC20 token launches.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="rounded-xl border border-border/60 overflow-hidden px-0"
              style={{ background: "oklch(var(--card))" }}
            >
              <AccordionTrigger className="px-5 py-4 font-heading font-semibold text-sm text-foreground hover:text-gold transition-colors hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
