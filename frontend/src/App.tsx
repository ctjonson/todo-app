import React from "react";
import TodoList from "./TodoList";

const App: React.FC = () => {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <TodoList />
        </div>
    );
};

export default App;