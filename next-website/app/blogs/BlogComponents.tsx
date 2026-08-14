interface BlogProps {
    id: number;
    title: string;
    blogTextHTML?: string;
    imgThumbnailURL: string;
    currentTheme?: string;
    transitionClasses?: string;
    href?: string;
    onClick?: (id: number) => void;
}

export function BlogObj({
    id,
    title,
    blogTextHTML,
    imgThumbnailURL,
    currentTheme = "",
    transitionClasses = "",
    href,
    onClick,
}: BlogProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
        e.preventDefault();
        onClick(id);
        }
    };

    // Strips HTML tags to show a clean plain-text snippet on the card
    const snippet = blogTextHTML
        ? blogTextHTML.replace(/<[^>]*>?/gm, "").slice(0, 120) + "..."
        : "";

    return (
        <article
        className={`blog-card ${currentTheme} ${transitionClasses}`.trim()}
        >
            <a
                href={href || `/blog/${id}`}
                onClick={handleClick}
                className="blog-card-link"
                aria-label={`Read post: ${title}`}
            >
                <div className="blog-card-media">
                <img
                    src={imgThumbnailURL}
                    alt={title}
                    loading="lazy"
                    className="blog-card-img"
                />
                </div>

                <div className="blog-card-body">
                <h3 className="blog-card-title">{title}</h3>
                {snippet && <p className="blog-card-snippet">{snippet}</p>}
                <span className="blog-card-cta">Read more &rarr;</span>
                </div>
            </a>
        </article>
    );
}

// interface BlogPieceProps {
//     blogInfo: BlogProps;
// }

// export function BlogPiece({
//     blogInfo
// } : BlogPieceProps) {
//     const []
//     return (
//         <div></div>
//     )
// }