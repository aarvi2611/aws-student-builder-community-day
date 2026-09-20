import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircleQuestion } from 'lucide-react';
import { FAQS } from '../data/eventData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aws-blue/10 border border-aws-blue/30 text-aws-brightBlue text-xs font-mono font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? <span className="text-gradient-aws">We Have Answers.</span>
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Everything you need to know about preparing for the event, eligibility, logistics, and hands-on workshops.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-surface/80 border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-aws-orange transition-colors hover:bg-surface-light/50"
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg bg-surface-light border border-white/10 text-muted transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-aws-orange border-aws-orange/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed animate-in fade-in duration-200"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0B1118]/60 border border-white/10 text-center space-y-2">
          <p className="text-xs sm:text-sm text-gray-300">
            Have additional questions not listed here?
          </p>
          <p className="text-xs text-muted font-mono">
            Connect with our student organizing cohort at{' '}
            <span className="text-aws-brightBlue">builder-community@rungta.edu.in</span>
          </p>
        </div>

      </div>
    </section>
  );
};
