import { useContext, useEffect, useState } from "react";
import { Articles } from "../components/Articles";
import { Loading } from "../components/Loading";
import { getArticles } from "../services/api";
import { useParams, useSearchParams } from "react-router-dom";
import { IArticle } from "../types/Articles";
import { SearchParams } from "../types/Articles";
import { ErrorContext } from "../context/context";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setError } = useContext(ErrorContext) ?? {
    error: null,
    setError: () => {},
  };

  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const searchParamObject: SearchParams = {};
  //   for (const [key, value] of searchParams.entries()) {
  //     searchParamObject[key as keyof SearchParams] = value;
  //   }
  //   const { sort_by, order_by, limit, page, author } = searchParamObject;
  //   console.log("check for infinite loop");
  //   async function fetchArticles() {
  //     try {
  //       setIsLoading(true);
  //       const fetchedArticles: IArticle[] = await getArticles(
  //         topic,
  //         sort_by,
  //         order_by,
  //         limit,
  //         page,
  //         author
  //       );
  //       setArticles(fetchedArticles);

  //       if (articles.length) {
  //         setIsLoading(false);
  //       }
  //     } catch (err) {
  //       setError(err as Error);
  //     }
  //   }

  //   fetchArticles();
  // }, [articles.length, searchParams, setError, topic]);
  const searchParamObject: SearchParams = {};
    for (const [key, value] of searchParams.entries()) {
      searchParamObject[key as keyof SearchParams] = value;
    }
  const { sort_by, order_by, limit, page, author } = searchParamObject;

  const articlesQuery = useQuery<IArticle[], Error>({
    queryKey: ["articles", topic, sort_by, order_by, limit, page, author],
    queryFn: () =>getArticles(topic, sort_by, order_by, limit, page, author),
    })
  
    

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
          setArticles={setArticles}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      )}
    </section>
  );
};
