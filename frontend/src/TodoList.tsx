import React, { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch todos from the backend
    const fetchTodos = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Todo[]>("/todos"); // Adjust URL if needed
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
        setLoading(false);
    };

    // Mark a to-do as completed
    const toggleTodo = async (id: number, completed: boolean) => {
        try {
            await axios.patch(`/todos/${id}`, { completed: !completed }); // Use the opposite value
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, completed: !completed } : todo
                )
            );
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };


    // Fetch todos on initial render
    useEffect(() => {
        fetchTodos();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id, todo.completed)}
                            />
                            {todo.title}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;