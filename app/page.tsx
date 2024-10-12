// pages/index.js
import { HabitProvider } from './context/HabitContext';
import HabitList from './components/HabitList';
import { CopilotPopup } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <>
    <HabitProvider>
      <div className="container mx-auto p-4">
        <HabitList />
      </div>
    </HabitProvider>
    <CopilotPopup
      instructions={"You are assisting the user as best as you can. Ansewr in the best way possible given the data you have."}
      labels={{
        title: "Popup Assistant",
        initial: "Need any help?",
      }}
    />
    </>
  );
}