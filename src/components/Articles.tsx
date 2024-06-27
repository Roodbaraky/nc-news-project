import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { ArticleTile } from "./ArticleTile";
import { ChangeEvent, MouseEvent, useEffect } from "react";
import { IArticle, ArticlesProps } from "../types/Articles";

export const Articles = ({
  articles,
  searchParams,
  setSearchParams,
}: ArticlesProps): JSX.Element => {
  let orderBy = searchParams.get("order_by");
  let sortBy = searchParams.get("sort_by");
  const handleFilterChange = (e: MouseEvent | ChangeEvent) => {
    const target = e.target as HTMLButtonElement;
    if (e.type === "click") {
      orderBy = target.id;
    } else {
      orderBy = searchParams.get("order_by") || "DESC";
    }

    sortBy =
      (document.getElementById("sort-by") as HTMLSelectElement).value ||
      "created_at";
    if (orderBy && sortBy) {
      refreshSearch(orderBy, sortBy);
    }
  };

  async function refreshSearch(
    order_by: string = "DESC",
    sort_by: string = "created_at"
  ) {
    setSearchParams((searchParams) => {
      return { ...searchParams, sort_by, order_by };
    });
  }
  useEffect(() => {}, [setSearchParams]);
  return (
    <section
      id="articles-container"
      className="flex flex-col w-full items-center mt-20"
    >
      <section
        id="filters selector"
        className="flex place-content-center gap-32 size-full"
      >
        <select
          name=""
          id="sort-by"
          className="place-self-center"
          onChange={handleFilterChange}
          defaultValue={sortBy ? sortBy : "created_at"}
        >
          <option value="created_at">Date created</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>

        <div>
          <div
            className={`btn ${orderBy === "ASC" ? "btn-disabled" : ""}`}
            onClick={handleFilterChange}
            id="ASC"
          >
            <BiUpArrow className="pointer-events-none" />
          </div>
          <div
            className={`btn ${orderBy === "DESC" ? "btn-disabled" : ""}`}
            onClick={handleFilterChange}
            id="DESC"
          >
            <BiDownArrow className="pointer-events-none" />
          </div>
        </div>
      </section>
      {articles?.map((article: IArticle) => (
        <ArticleTile key={article.article_id} article={article} />
      ))}
    </section>
  );
};
