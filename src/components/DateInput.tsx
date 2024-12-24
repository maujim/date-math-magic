import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { differenceInDays, differenceInMonths, differenceInYears, parse, format, isValid } from 'date-fns';

const DateInput = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Processing query:', query);

    try {
      // Simple pattern matching for date queries
      if (query.toLowerCase().includes('days until')) {
        const dateStr = query.toLowerCase().replace('days until', '').trim();
        const targetDate = parse(dateStr, 'MMMM d, yyyy', new Date());
        
        if (!isValid(targetDate)) {
          throw new Error('Invalid date format. Please use format like "December 25, 2024"');
        }

        const days = differenceInDays(targetDate, new Date());
        setResult(`There are ${days} days until ${format(targetDate, 'MMMM d, yyyy')}.`);
      } else if (query.toLowerCase().includes('days since')) {
        const dateStr = query.toLowerCase().replace('days since', '').trim();
        const targetDate = parse(dateStr, 'MMMM d, yyyy', new Date());
        
        if (!isValid(targetDate)) {
          throw new Error('Invalid date format. Please use format like "December 25, 2024"');
        }

        const days = differenceInDays(new Date(), targetDate);
        setResult(`It has been ${days} days since ${format(targetDate, 'MMMM d, yyyy')}.`);
      } else {
        throw new Error('Query not recognized. Try asking "Days until December 25, 2024" or "Days since January 1, 2023"');
      }
    } catch (error) {
      console.error('Error processing query:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process query",
        variant: "destructive",
      });
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6 animate-fadeIn">
      <form onSubmit={handleQuerySubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Try: Days until December 25, 2024"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 text-lg"
          />
        </div>
        <Button type="submit" className="w-full">Calculate</Button>
      </form>

      {result && (
        <div className="space-y-4 animate-fadeIn">
          <p className="text-lg font-medium text-center">{result}</p>
          <Button 
            variant="outline" 
            onClick={copyResult}
            className="w-full"
          >
            Copy Result
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DateInput;