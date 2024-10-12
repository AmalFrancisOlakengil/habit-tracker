"use client";
import { createContext, useState, useContext } from 'react';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  const addHabit = (habitName, description) => {
    setHabits((prev) => [
      ...prev,
      { 
        name: habitName, 
        completedDays: [], 
        createdAt: new Date(), // Save the creation time and date
        description: description || `Description of ${habitName}` // Add description, fallback to default if not provided
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
