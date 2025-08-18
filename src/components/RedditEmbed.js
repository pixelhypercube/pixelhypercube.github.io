import { useEffect } from "react";

export default function RedditEmbed(props) {
  useEffect(() => {
    if (!document.querySelector('script[src="https://embed.reddit.com/widgets.js"]')) {
      const script = document.createElement("script");
      script.src = "https://embed.reddit.com/widgets.js";
      script.async = true;
      script.charset = "UTF-8";
      document.body.appendChild(script);
    } else {
      if (window.___reddit) {
        window.___reddit.init();
      }
    }
  }, []);

  const {link,user,subreddit,title,height} = props;

  return (
    <blockquote
      className="reddit-embed-bq"
      data-embed-height={height || 500}
    >
      <a href={link}>
        {title}
      </a>
      <br/> by {" "}
      <a href={`https://www.reddit.com/user/${user}/`}>{user}</a> in
      <a href={`https://www.reddit.com/r/${subreddit}/`}>{subreddit}</a>
    </blockquote>
  );
}
