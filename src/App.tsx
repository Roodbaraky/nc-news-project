import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";
import { useEffect, useState } from "react";
import { ErrorContext, UserContext } from "./context/context";
import { ErrorPopUp } from "./components/ErrorPopUp";
import { ErrorPage } from "./pages/ErrorPage";
import { User } from "./types/User";
import { CustomError } from "./types/Error";
import { PageContainer } from "./components/PageContainer";


function App() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<CustomError | null>(null);

  useEffect(() => {
    if (error) {
      (document.getElementById("errorModal") as HTMLDialogElement).showModal();
    }
  });
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <ErrorContext.Provider value={{ error, setError }}>
       <PageContainer>
            <section
              id="app-container"
              className="flex flex-col h-full w-full align-items-center bg-bkg text-content"
            >
              <Header />
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="/:topic" element={<Home />} />
                </Route>
                <Route path="*" element={<ErrorPage error={error} />} />
                <Route path="/article/:article_id" element={<Article />} />
                <Route path="/error" element={<ErrorPage error={error} />} />
              </Routes>
              {error !== null && (
                <ErrorPopUp error={error} setError={setError} />
              )}
            </section>
            </PageContainer>
        </ErrorContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
