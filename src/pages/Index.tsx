import DateInput from "@/components/DateInput";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 to-white p-4 pt-8">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Date Math Solver</h1>
        <p className="text-gray-600">Ask questions about dates in natural language</p>
      </div>
      <DateInput />
    </div>
  );
};

export default Index;