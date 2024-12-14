import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from "./pages/CreatePage"
import { DetailsPage } from "./pages/DetailsPage"
import { AuthPage } from "./pages/AuthPage"

export const useRoutes = isAuthenticated => {
    return (
        <Routes>
            <Route path="/links" exact element={isAuthenticated ? <LinksPage /> : <Navigate to="/" />} />
            <Route path="/create" exact element={isAuthenticated ? <CreatePage /> : <Navigate to="/" />} />
            <Route path="/details/:id" element={isAuthenticated ? <DetailsPage /> : <Navigate to="/" />} />

            <Route path="/" exact element={<AuthPage />} />
            <Route path="*" exact element={<Navigate to="/" />} />
        </Routes>
    )
}
