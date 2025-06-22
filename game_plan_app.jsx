import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function GamePlanApp() {
  const [gamePlans, setGamePlans] = useState([
    {
      id: 1,
      title: "Reach out to six organisations to promote MHFA",
      category: "Work",
      dueDate: "2025-07-01",
      done: false,
      notes: "Prepare pitch email."
    },
    {
      id: 2,
      title: "Have two commit to undertaking the training",
      category: "Work",
      dueDate: "2025-07-15",
      done: false,
      notes: "Follow up after first contact."
    },
  ]);

  const [possibilities, setPossibilities] = useState([
    {
      id: 1,
      text: "Everyone has someone to talk to",
      theme: "Connection"
    },
  ]);

  const [newGamePlan, setNewGamePlan] = useState({ title: "", category: "", dueDate: "", notes: "" });
  const [newPossibility, setNewPossibility] = useState("");
  const [newTheme, setNewTheme] = useState("");

  const addGamePlan = () => {
    if (newGamePlan.title.trim()) {
      setGamePlans([
        ...gamePlans,
        { id: Date.now(), ...newGamePlan, done: false }
      ]);
      setNewGamePlan({ title: "", category: "", dueDate: "", notes: "" });
    }
  };

  const addIdea = () => {
    if (newIdea.trim()) {
      setIdeaList([...ideaList, { id: Date.now(), text: newIdea }]);
      setNewIdea("");
    }
  };

  const toggleGamePlanDone = (id) => {
    setGamePlans(gamePlans.map(plan =>
      plan.id === id ? { ...plan, done: !plan.done } : plan
    ));
  };

  const addPossibility = () => {
    if (newPossibility.trim()) {
      setPossibilities([
        ...possibilities,
        { id: Date.now(), text: newPossibility, theme: newTheme }
      ]);
      setNewPossibility("");
      setNewTheme("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">🚶‍♂️ The Next Step</h1>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="flex justify-center gap-2 mb-4">
          <TabsTrigger value="plans">Game Plans</TabsTrigger>
          <TabsTrigger value="possibilities">Possibilities</TabsTrigger>
          <TabsTrigger value="ideas">Ideas Board</TabsTrigger>
          <TabsTrigger value="quotes">Inspiration</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <Card className="space-y-4 p-4">
            {gamePlans.map(plan => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-3 rounded-xl transition-all shadow-sm border cursor-pointer ${plan.done ? 'bg-green-100 line-through' : 'bg-white hover:bg-blue-50'}`}
                onClick={() => toggleGamePlanDone(plan.id)}
              >
                <div className="font-semibold text-lg">{plan.title}</div>
                <div className="text-sm text-gray-600">Category: {plan.category} | Due: {format(new Date(plan.dueDate), 'PPP')}</div>
                <div className="text-sm italic mt-1">{plan.notes}</div>
              </motion.div>
            ))}
            <div className="grid gap-2">
              <Input
                value={newGamePlan.title}
                onChange={(e) => setNewGamePlan({ ...newGamePlan, title: e.target.value })}
                placeholder="Plan title..."
              />
              <Input
                value={newGamePlan.category}
                onChange={(e) => setNewGamePlan({ ...newGamePlan, category: e.target.value })}
                placeholder="Category (e.g. Work, Life)"
              />
              <Input
                type="date"
                value={newGamePlan.dueDate}
                onChange={(e) => setNewGamePlan({ ...newGamePlan, dueDate: e.target.value })}
              />
              <Textarea
                value={newGamePlan.notes}
                onChange={(e) => setNewGamePlan({ ...newGamePlan, notes: e.target.value })}
                placeholder="Notes..."
              />
              <Button onClick={addGamePlan}>Add Game Plan</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="possibilities">
          <Card className="space-y-4 p-4">
            {possibilities.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-yellow-100 shadow-sm"
              >
                <div className="text-lg font-semibold">{p.text}</div>
                {p.theme && <div className="text-sm italic text-gray-600">Theme: {p.theme}</div>}
              </motion.div>
            ))}
            <div className="grid gap-2">
              <Input
                value={newPossibility}
                onChange={(e) => setNewPossibility(e.target.value)}
                placeholder="Add a new possibility..."
              />
              <Input
                value={newTheme}
                onChange={(e) => setNewTheme(e.target.value)}
                placeholder="Theme (e.g. Connection, Joy)"
              />
              <Button onClick={addPossibility}>Add Possibility</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ideas">
          <Card className="space-y-4 p-4">
            <div className="text-lg font-semibold">App Ideas</div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Gamified CPD tracker for psychologists</li>
              <li>Microchallenge app for cognitive flexibility</li>
              <li>Wellbeing check-in chatbot for remote teams</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="quotes">
          <Card className="space-y-4 p-4">
            <div className="text-lg font-semibold">Inspirational Thoughts</div>
            <ul className="text-sm italic text-gray-700 space-y-2">
              <li>“He who has a why to live can bear almost any how.” – Nietzsche</li>
              <li>“Waste no more time arguing what a good man should be. Be one.” – Marcus Aurelius</li>
              <li>“We are what we repeatedly do. Excellence, then, is not an act, but a habit.” – Aristotle</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
