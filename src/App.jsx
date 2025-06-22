import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function App() {
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
      setGamePlans([...gamePlans, { id: Date.now(), ...newGamePlan, done: false }]);
      setNewGamePlan({ title: "", category: "", dueDate: "", notes: "" });
    }
  };

  const toggleGamePlanDone = (id) => {
    setGamePlans(gamePlans.map(plan => plan.id === id ? { ...plan, done: !plan.done } : plan));
  };

  const addPossibility = () => {
    if (newPossibility.trim()) {
      setPossibilities([...possibilities, { id: Date.now(), text: newPossibility, theme: newTheme }]);
      setNewPossibility("");
      setNewTheme("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-700">🚶‍♂️ The Next Step</h1>

      <section>
        <h2 className="text-xl font-semibold mb-3">Game Plans</h2>
        {gamePlans.map(plan => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-xl transition-all shadow-sm border cursor-pointer mb-3 ${plan.done ? 'bg-green-100 line-through' : 'bg-white hover:bg-blue-50'}`}
            onClick={() => toggleGamePlanDone(plan.id)}
          >
            <div className="font-semibold text-lg">{plan.title}</div>
            <div className="text-sm text-gray-600">Category: {plan.category} | Due: {format(new Date(plan.dueDate), 'PPP')}</div>
            <div className="text-sm italic mt-1">{plan.notes}</div>
          </motion.div>
        ))}
        <div className="grid gap-2 mb-6">
          <input
            type="text"
            value={newGamePlan.title}
            onChange={(e) => setNewGamePlan({ ...newGamePlan, title: e.target.value })}
            placeholder="Plan title..."
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newGamePlan.category}
            onChange={(e) => setNewGamePlan({ ...newGamePlan, category: e.target.value })}
            placeholder="Category (e.g. Work, Life)"
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={newGamePlan.dueDate}
            onChange={(e) => setNewGamePlan({ ...newGamePlan, dueDate: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            value={newGamePlan.notes}
            onChange={(e) => setNewGamePlan({ ...newGamePlan, notes: e.target.value })}
            placeholder="Notes..."
            className="border p-2 rounded"
          />
          <button
            onClick={addGamePlan}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Game Plan
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Possibilities</h2>
        {possibilities.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-xl bg-yellow-100 shadow-sm mb-3"
          >
            <div className="text-lg font-semibold">{p.text}</div>
            {p.theme && <div className="text-sm italic text-gray-600">Theme: {p.theme}</div>}
          </motion.div>
        ))}
        <div className="grid gap-2">
          <input
            type="text"
            value={newPossibility}
            onChange={(e) => setNewPossibility(e.target.value)}
            placeholder="Add a new possibility..."
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newTheme}
            onChange={(e) => setNewTheme(e.target.value)}
            placeholder="Theme (e.g. Connection, Joy)"
            className="border p-2 rounded"
          />
          <button
            onClick={addPossibility}
            className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
          >
            Add Possibility
          </button>
        </div>
      </section>
    </div>
  );
}
