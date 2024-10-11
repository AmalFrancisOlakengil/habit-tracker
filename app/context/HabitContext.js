// context/HabitContext.js
"use client";  // Mark this file as a Client Component

import { updateDoc} from "firebase/firestore"; // Import Firestore methods

import { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';  // Import your Firestore db
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "habits"), (snapshot) => {
      const habitsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHabits(habitsList);
    });
    
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const addHabit = async (habitName) => {
    await addDoc(collection(db, "habits"), { name: habitName, completedDays: [] });
  };

  const toggleHabit = async (habitId, day) => {
    const habitRef = doc(db, "habits", habitId);
    const habit = habits.find(habit => habit.id === habitId);
    const newCompletedDays = habit.completedDays.includes(day)
      ? habit.completedDays.filter((d) => d !== day)
      : [...habit.completedDays, day];

    await updateDoc(habitRef, { completedDays: newCompletedDays });
  };

  const deleteHabit = async (habitId) => {
    const habitRef = doc(db, "habits", habitId);
    await deleteDoc(habitRef);
  };

  const resetAll = async () => {
    const batch = db.batch();
    habits.forEach(habit => {
      const habitRef = doc(db, "habits", habit.id);
      batch.delete(habitRef);
    });
    await batch.commit();
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabit, deleteHabit, resetAll }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);

