export const UserCard = ({ user }) => {
    return (
        <section id='user-card-container' className="bg-bkg rounded-lg shadow-md p-4 flex items-center">
            <img className="user-img w-16 h-16 rounded-full mr-4" src={user.avatar_url} alt="" />
            <div>
                <p className="text-content font-bold">{user.username}</p>
                <p className="text-content">{user.name}</p>
            </div>
        </section>
    )
}
