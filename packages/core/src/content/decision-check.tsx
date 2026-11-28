import { CheckCircle2, XCircle } from 'lucide-react';
import { CollapsibleMotion, RadioGroup, RadioGroupItem, cn } from '@tutor/ui';
import type { PracticeQuestion } from '../types/course';
import { useLanguage } from '../i18n/language-provider';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from './math-markdown';

/** One shared decision check for micro-theory and guided practice. */
export function DecisionCheck({ question, answerKey }: { question: PracticeQuestion; answerKey: string }) {
  const { t } = useLanguage();
  const selected = useTutorStore((state) => state.practiceAnswers[answerKey] ?? '');
  const setAnswer = useTutorStore((state) => state.setPracticeAnswer);
  const option = question.options.find((candidate) => candidate.id === selected);
  const correct = selected === question.correctOptionId;
  return (
    <div className="space-y-3">
      <div id={`${answerKey}:prompt`}><MathMarkdown content={question.prompt} className="text-sm" /></div>
      <RadioGroup aria-labelledby={`${answerKey}:prompt`} value={selected} onValueChange={(value) => setAnswer(answerKey, value)}>
        {question.options.map((candidate) => (
          <label key={candidate.id} className={cn('flex cursor-pointer items-start gap-2.5 border-l-2 py-1.5 pl-3', candidate.id === selected ? 'border-primary' : 'border-transparent hover:border-border')}>
            <RadioGroupItem value={candidate.id} className="mt-1" />
            <MathMarkdown content={candidate.label} className="min-w-0 flex-1 text-sm" />
          </label>
        ))}
      </RadioGroup>
      <CollapsibleMotion open={!!option}>
        {option && (
          <div role="status" className={cn('space-y-2 border-l-2 py-1 pl-3 text-sm', correct ? 'border-success' : 'border-warning')}>
            <p className="flex items-center gap-2 text-xs font-medium">
              {correct ? <CheckCircle2 className="size-3.5 text-success" /> : <XCircle className="size-3.5 text-warning" />}
              {correct ? t('Keputusan tepat', 'Correct decision') : t('Tinjau alasan pilihan Anda', 'Review the reason for your choice')}
            </p>
            {option.feedback && <MathMarkdown content={option.feedback} className="text-sm" />}
            <MathMarkdown content={question.explanation} className="text-sm text-muted-foreground" />
          </div>
        )}
      </CollapsibleMotion>
    </div>
  );
}
