"use client";
import { createContext, useState, useContext } from 'react';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  // Make the habits state readable to Copilot
  useCopilotReadable({
    description: "The current list of habits",
    value: JSON.stringify(habits),
  });

  // Define actions for Copilot
  useCopilotAction({
    name: "addHabit",
    description: "Adds a new habit",
    parameters: [
      {
        name: "habitName",
        type: "string",
        description: "The name of the habit to add",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "Description of the habit",
        required: false,
      },
    ],
    handler: ({ habitName, description }) => {
      addHabit(habitName, description);
    },
  });

  useCopilotAction({
    name: "deleteHabit",
    description: "Deletes a habit by name",
    parameters: [
      {
        name: "habitName",
        type: "string",
        description: "The name of the habit to delete",
        required: true,
      },
    ],
    handler: ({ habitName }) => {
      deleteHabit(habitName);
    },
  });

  useCopilotAction({
    name: "toggleHabit",
    description: "Toggles a habit's status for a given day",
    parameters: [
      {
        name: "habitName",
        type: "string",
        description: "The name of the habit to toggle",
        required: true,
      },
      {
        name: "day",
        type: "string",
        description: "The day of the week (e.g., 'Mon', 'Tue')",
        required: true,
      },
    ],
    handler: ({ habitName, day }) => {
      toggleHabit(habitName, day);
    },
  });

  const addHabit = (habitName, description) => {
    setHabits((prev) => [
      ...prev,
      { 
        name: habitName, 
        completedDays: [], 
        createdAt: new Date(),
        description: description || `Description of ${habitName}`,
      }
    ]);
  };

  const toggleHabit = (habitName, day) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.name === habitName
          ? {
              ...habit,
              completedDays: habit.completedDays.includes(day)
                ? habit.completedDays.filter((d) => d !== day)
                : [...habit.completedDays, day],
            }
          : habit
      )
    );
  };

  const deleteHabit = (habitName) => {
    setHabits((prev) => prev.filter((habit) => habit.name !== habitName));
  };

  const resetAll = () => {
    setHabits([]);
  };

  const resetWeek = () => {
    setHabits((prev) => 
      prev.map((habit) => ({
        ...habit,
        completedDays: []
      }))
    );
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabit, deleteHabit, resetAll, resetWeek }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);

