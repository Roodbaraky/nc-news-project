import { FocusEvent, MouseEvent, useContext, useEffect, useState } from "react"
import { BiSolidComment, BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi"
import { FaShare } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { patchArticleVotes } from "../services/api"
import { ErrorContext, UserContext } from "../context/context"
import { ArticleTileProps } from "../types/Articles"


//find a way to show article body preview
//comments preview modal(?)


export const ArticleTile = ({ article }: ArticleTileProps): JSX.Element => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext) ?? { user: null }
    const { setError } = useContext(ErrorContext) ?? { setError: () => { } }
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const [votes, setVotes] = useState(article.votes)


    useEffect(() => {

    }, [votes, upVoted, downVoted])

    async function sendVotes() {
        if (votes !== article.votes) {
            const difference = votes - article.votes
            const voteBody = { inc_votes: difference }
            try {
                await patchArticleVotes(article.article_id, voteBody)

            } catch (err) {
                setDownVoted(false)
                setUpVoted(false)
                setError({ message: 'Failed to cast vote' })
            }
        }
    }
    const voteOnArticle = (e: MouseEvent) => {
        const voteBody = { inc_votes: 0 }
        if (!user) {
            setError({ message: 'You must be logged in to vote' })
        }
        else if (article.author !== user?.username) {
            const target = e.target as HTMLButtonElement
            if (target.id === 'upvote') {
                if (!upVoted && !downVoted) {
                    voteBody.inc_votes = 1
                    setVotes(votes + 1)
                    setUpVoted(true)
                }
                if (upVoted) {
                    setUpVoted(false)
                    setVotes(votes - 1)

                }
                if (downVoted) {
                    setUpVoted(true)
                    setDownVoted(false)
                    setVotes(votes + 2)

                }
            }

            if (target.id === 'downvote') {
                if (!downVoted && !upVoted) {

                    setVotes(votes - 1)
                    setDownVoted(true)
                }
                if (downVoted) {

                    setVotes(votes + 1)
                    setDownVoted(false)
                }
                if (upVoted) {

                    setVotes(votes - 2)
                    setDownVoted(true)
                    setUpVoted(false)
                }
            }



        } else {
            setError({ message: 'You can\'t vote on your own article!' })
        }

    }

    const handleCommentsClick = () => {
        if (!user) {
            setError({ message: 'You must be logged in to comment' })
        }
        else {
            navigate(`/article/${article.article_id}`)
        }
    }

    const handleBlur = (e: FocusEvent) => {
        const currentTarget = e.currentTarget;
        setTimeout(() => {
            if (!currentTarget.contains(document.activeElement)) {
                sendVotes()
            }
        }, 0);
    };


    return (
        <section id="article-card" onBlur={handleBlur} className="w-11/12 max-w-4xl py-2" >
            <div id="content-container" className="border-t bg-base-300 p-2 max-h-52 size-full max-w-4xl overflow-hidden"
            >

                <h3 className='text-lg inline mr-2 '>{article.topic}</h3><p className='inline'>{article.created_at} ago</p>

                <div onClick={() => { navigate(`/article/${article.article_id}`) }}>
                    <h2 className='font-semibold m-2 ml-0 mt-0 text-nowrap whitespace-nowrap overflow-hidden text-ellipsis'>{article.title}</h2>

                    <div className="flex text-ellipsis overflow-hidden  max-h-60 whitespace-nowrap w-full max-w-4xl">
                        <img className='w-20 h-20 object-cover p-2' src={article.article_img_url} alt="" />
                        <div className="line-clamp-2"><p className="text-wrap overflow-hidden text-ellipsis max-w-2xl  line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique distinctio consequatur quasi, quos sed neque fugiat veniam quo voluptatibus quis cum, commodi quia sit ullam voluptas inventore placeat iure quam.</p></div>
                    </div>
                </div>
                <div className="flex relative flex-wrap size-full justify-start">
                    <div className="flex sm:flex-row">
                        <button id='upvote' onClick={voteOnArticle} className="btn"><BiSolidUpArrow className="pointer-events-none" /></button>
                        <div className="btn">{votes}</div>
                        <button id='downvote' onClick={voteOnArticle} className="btn"><BiSolidDownArrow className="pointer-events-none" /></button>
                    </div>
                    <button onClick={handleCommentsClick} className="btn">{article.comment_count} <BiSolidComment className="pointer-events-none" /></button>
                    <button className="btn"><FaShare className="pointer-events-none" /></button>
                </div>
            </div>
        </section>
    )
}
