// components/HabitList.js
"use client";
import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const HabitList = () => {
    const { habits, addHabit, toggleHabit, deleteHabit, resetAll } = useHabits();
    const [newHabit, setNewHabit] = useState('');
  
    const handleAddHabit = () => {
      if (newHabit) {
        addHabit(newHabit);
        setNewHabit('');
      }
    };
  
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
    const calculateProgress = (completedDays) => {
      return (completedDays.length / 7) * 100; // Assuming 7 days in a week
    };
  
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Habit Tracker</h1>
  
        <div className="flex mb-4">
          <Input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New Habit"
          />
          <Button onClick={handleAddHabit} className="ml-2">
            Add
          </Button>
          <Button onClick={resetAll} className="ml-2" variant="destructive">
            Reset All
          </Button>
        </div>
  
        <div className="space-y-4">
          {habits.map((habit) => (
            <Card key={habit.id} className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{habit.name}</h2>
                <Button onClick={() => deleteHabit(habit.id)} variant="destructive">
                  Delete
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mt-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day}
                    onClick={() => toggleHabit(habit.id, day)}
                    variant={habit.completedDays.includes(day) ? 'success' : 'default'}
                  >
                    {day}
                  </Button>
                ))}
              </div>
              <br />
              <Progress value={calculateProgress(habit.completedDays)} />
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default HabitList;
  