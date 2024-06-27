import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Articles } from "../components/Articles";
import { Loading } from "../components/Loading";
import { ErrorContext } from "../context/context";
import { getArticles } from "../services/api";
import { IArticle, SearchParams } from "../types/Articles";

export const Home = () => {
  const { setError } = useContext(ErrorContext) ?? {
    error: null,
    setError: () => {},
  };

  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamObject: SearchParams = {};
    for (const [key, value] of searchParams.entries()) {
      searchParamObject[key as keyof SearchParams] = value;
    }
  const { sort_by, order_by, limit, page, author } = searchParamObject;

  const articlesQuery = useQuery<IArticle[], Error>({
    queryKey: ["articles", topic, sort_by, order_by, limit, page, author],
    queryFn: () =>getArticles(topic, sort_by, order_by, limit, page, author),
    })
  
    
if(articlesQuery.isError){
  setError(new Error('error fetching articles'))
}
  return (
    <section id="home-container w-full w-screen flex flex-col">
      {articlesQuery.isLoading && (
        <div className="mt-20 mx-auto text-center">
          <strong>not</strong> the front page of the internet
        </div>
      )}
      {articlesQuery.isLoading ? (
        <Loading />
      ) : (
        <Articles
          articles={articlesQuery.data!}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      )}
    </section>
  );
};
