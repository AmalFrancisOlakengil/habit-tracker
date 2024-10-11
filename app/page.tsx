// pages/index.js
import { HabitProvider } from './context/HabitContext';
import HabitList from './components/HabitList';

export default function Home() {
  return (
    <HabitProvider>
      <div className="container mx-auto p-4">
        <HabitList />
      </div>
    </HabitProvider>
  );
}