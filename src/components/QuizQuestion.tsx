import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/quiz';
import { useState } from 'react';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  selectedAnswer?: number;
}

export const QuizQuestion = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  onNext,
  selectedAnswer 
}: QuizQuestionProps) => {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="iq-card mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            {question.question}
          </h2>

          {question.type === 'text' ? (
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`option-card ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => onAnswer(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {question.images.map((image, index) => (
                <div
                  key={index}
                  className={`option-card ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => onAnswer(index)}
                >
                  <div className="text-center">
                    <img 
                      src={image} 
                      alt={`Option ${String.fromCharCode(65 + index)}`}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-lg font-semibold mx-auto">
                      {String.fromCharCode(65 + index)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Button */}
        <div className="text-center">
          <Button
            onClick={onNext}
            disabled={selectedAnswer === undefined}
            size="lg"
            className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {questionNumber === totalQuestions ? 'Finish Test' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};