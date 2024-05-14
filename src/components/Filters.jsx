import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Filters = ({
    searchTopic,
    topics,
    sortBy,
    order,
    limit,
    totalCount,
    pArr,
    setSearchTopic,
    setIsLoading,
    setSortBy,
    setOrder,
    setLimit,
    setP
}) => {
    const navigate = useNavigate()

   
    return (
        <div id='sort-filter-bar' className=" flex flex-wrap justify-center gap-4 rounded-lg p-4 mb-3 bg-accent-1/40 shadow-md w-full">
            <label htmlFor="" className="flex items-center">
                Topic:
                <select
                    className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                    defaultValue={searchTopic || ""}
                    onChange={(e) => {
                        setIsLoading(true)
                        setP('1')
                        setSearchTopic(e.target.value);
                        if (e.target.value.length) {
                            setIsLoading(true);
                            navigate(`?topic=${e.target.value}`);
                        } else {
                            navigate("");
                        }
                    }}
                >
                    <option value="">All</option>
                    {topics.map((topic) => (
                        <option key={topic.slug} value={topic.slug}>
                            {topic.slug}
                        </option>
                    ))}
                </select>
            </label>
            <label htmlFor="" className="flex items-center">
                Sort by:
                <select
                    className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                    defaultValue={sortBy}
                    onChange={(e) => {
                        setIsLoading(true)
                        setSortBy(e.target.value)}}
                >
                    <option value="created_at">date</option>
                    <option value="comment_count">comments</option>
                    <option value="votes">votes</option>
                </select>
            </label>
            <label htmlFor="" className="flex items-center">
                Sort:
                <select
                    className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                    defaultValue={order}
                    onChange={(e) => {
                        setIsLoading(true)
                        setOrder(e.target.value)}}
                >
                    <option value="DESC">DESC</option>
                    <option value="ASC">ASC</option>
                </select>
            </label>
            <label htmlFor="" className="flex items-center">
                Results per Page:
                <select
                    className="select-bg bg-transparent border border-gray-300 rounded-md px-2 py-1"
                    defaultValue={limit}
                    onChange={(e) => {
                        setIsLoading(true)
                        setLimit(e.target.value)}}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value={totalCount || "100"}>ALL</option>
                </select>
            </label>
        </div>
    )
}
