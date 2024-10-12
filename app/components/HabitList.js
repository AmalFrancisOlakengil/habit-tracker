"use client";
import React, { useState } from "react";
import { useHabits } from "../context/HabitContext";
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
  const { habits, addHabit, toggleHabit, deleteHabit, resetAll, resetWeek } =
    useHabits();
  const [newHabit, setNewHabit] = useState("");
  const [description, setDescription] = useState(""); // New state for description

  const handleAddHabit = () => {
    if (newHabit) {
      addHabit(newHabit, description); // Pass description to the addHabit function
      setNewHabit("");
      setDescription(""); // Clear description after adding
    }
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const calculateProgress = (completedDays) => {
    return (completedDays.length / 7) * 100;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="p-4 max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl">
      <h1 className="text-xl font-bold mb-4">Habit Tracker</h1>

      <div className="mb-4 space-y-2">
        <Input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="New Habit"
          className="w-full"
        />
        {/* Input for habit description */}
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Habit Description"
          className="w-full"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          <Button onClick={handleAddHabit} className="w-full sm:w-auto">
            Add
          </Button>
          <Button onClick={resetAll} className="w-full sm:w-auto" variant="destructive">
            Reset All
          </Button>
          <Button onClick={resetWeek} className="w-full sm:w-auto" variant="outline">
            New Week
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {habits.map((habit) => (
          <Card key={habit.name} className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="font-semibold">{habit.name}</h2>
                <p className="text-sm text-gray-600">
                  Created on: {formatDate(habit.createdAt)}
                </p>
                <p className="text-sm text-gray-600">{habit.description}</p>
              </div>
              <Button onClick={() => deleteHabit(habit.name)} variant="destructive" className="mt-2 sm:mt-0">
                Delete
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 mt-2">
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  onClick={() => toggleHabit(habit.name, day)}
                  variant={habit.completedDays.includes(day) ? "success" : "default"}
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
