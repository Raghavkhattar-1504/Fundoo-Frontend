import react from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import DashboardContainer from "./components/DashboardContainer/DashboardContainer";
import ArchiveContainer from "./components/ArchiveContainer/ArchiveContainer";
import NotesContainer from "./components/NotesContainer/NotesContainer";
import TrashContainer from "./components/TrashContainer/TrashContainer";
import NoteCard from "./components/NoteCard/NoteCard";
import SearchProvider from "./context/SearchContext";
import ReminderContainer from "./components/ReminderContainer/ReminderContainer";
import LabelContainer from "./components/LabelContainer/LabelContainer";

const RouterModule = () => {

    const router = createBrowserRouter([
        {
            path: "",
            element: <Login />
        },
        {
            path: "/register",
            element: <Signup />
        },
        {
            path: "/dashboard",
            element:<DashboardContainer/>,
            children: [
                {
                    path: "notes",
                    element: <NotesContainer />
                },
                {
                    path: "notes/:noteId",
                    element: <NotesContainer />
                },
                {
                    path: "archive",
                    element: <ArchiveContainer />
                },
                {
                    path: "archive/:noteId",
                    element: <ArchiveContainer />
                },
                {
                    path: "trash",
                    element: <TrashContainer />
                },
                {
                    path: "reminder",
                    element: <ReminderContainer />
                },
                {
                    path: "editlabel",
                    element: <LabelContainer />
                }
            ]
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}

export default RouterModule