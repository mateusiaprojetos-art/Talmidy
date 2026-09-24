import React from 'react';
import { parseStudyContentBlocks, containsHebrew } from '../utils/hebrewUtils';

interface FormattedStudyContentProps {
  content: string;
  className?: string;
}

export const FormattedStudyContent: React.FC<FormattedStudyContentProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const blocks = parseStudyContentBlocks(content);

  return (
    <div className={`space-y-2 leading-relaxed ${className}`}>
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          const cleanHeading = block.content.replace(/^#+\s*/, '');
          return (
            <h3 key={idx} className="font-extrabold text-sm sm:text-base text-[#34344e] dark:text-[#cbdad5] mt-5 mb-2 border-b border-[#89a7b1]/40 dark:border-[#566981] pb-1">
              {cleanHeading}
            </h3>
          );
        }

        if (block.type === 'hebrew' || block.isHebrew) {
          return (
            <div key={idx} className="my-2 p-3 sm:p-4 rounded-xl bg-[#89a7b1]/10 dark:bg-[#34344e] border border-[#89a7b1]/40 dark:border-[#566981] shadow-xs">
              <p className="font-hebrew text-right text-xl sm:text-2xl text-[#34344e] dark:text-[#cbdad5] font-bold leading-relaxed tracking-wide" dir="rtl">
                {block.content}
              </p>
            </div>
          );
        }

        if (block.type === 'transliteration') {
          return (
            <div key={idx} className="pl-3 py-1 border-l-2 border-[#566981] bg-[#89a7b1]/10 dark:bg-[#3a415a] rounded-r-lg my-1">
              <p className="text-left font-sans italic font-bold text-xs text-[#3a415a] dark:text-[#89a7b1]" dir="ltr">
                {block.content}
              </p>
            </div>
          );
        }

        if (block.type === 'translation') {
          return (
            <div key={idx} className="my-1">
              <p className="text-left font-sans font-semibold text-xs text-[#34344e] dark:text-[#cbdad5]" dir="ltr">
                {block.content}
              </p>
            </div>
          );
        }

        // Default text line
        return (
          <p key={idx} className="text-left text-xs sm:text-sm text-[#3a415a] dark:text-[#cbdad5]/90 font-normal leading-relaxed my-1.5" dir="ltr">
            {block.content}
          </p>
        );
      })}
    </div>
  );
};
