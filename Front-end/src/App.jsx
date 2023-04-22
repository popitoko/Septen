import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Artigo from "./pages/Artigo"
import AdminMenu from "./AdminPages/AdminMenu"
import CriarArtigo from "./AdminPages/CriarArtigo"
import AlterarArtigo from "./AdminPages/AlterarArtigo"
import AtualizarCategorias from "./AdminPages/AtualizarCategorias"
import AtualizarArtigo from "./AdminPages/AtualizarArtigo"
import Login from "./AdminPages/Login"

function App() {
    const PrivateRoute = ({ Admin, Component }) => {
        const isLogged = localStorage.getItem(
            import.meta.env.REACT_APP_TOKEN_KEY
        )

        if (isLogged) return Component
        else if (Admin) return <Login />
        return <Navigate to={"/admin"} />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/artigo/:slug'
                    element={<Artigo />}
                />

                <Route
                    path='/admin/'
                    element={
                        <PrivateRoute
                            Admin
                            Component={<AdminMenu />}
                        />
                    }
                />
                <Route
                    path='/admin/criarArtigos'
                    element={<PrivateRoute Component={<CriarArtigo />} />}
                />
                <Route
                    path='/admin/categorias'
                    element={
                        <PrivateRoute Component={<AtualizarCategorias />} />
                    }
                />
                <Route
                    path='/admin/atualizar'
                    element={<PrivateRoute Component={<AlterarArtigo />} />}
                />
                <Route
                    path='/admin/atualizar/artigo/:slug'
                    element={<PrivateRoute Component={<AtualizarArtigo />} />}
                />
                <Route
                    path='/admin/atualizar/sub-artigo/:slug'
                    element={
                        <PrivateRoute
                            Component={<AtualizarArtigo subArtigo />}
                        />
                    }
                />
                <Route
                    path='/admin/*'
                    element={
                        <PrivateRoute Component={<Navigate to={"/admin"} />} />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
