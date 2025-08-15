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

  const {link,user,subreddit} = props;

  return (
    <blockquote
      className="reddit-embed-bq"
      style={{ height: "500px" }}
      data-embed-height="740"
    >
      <a href={link}>
        If you're given the formula, proving it is usually easier than deriving it
      </a>
      <br /> by
      <a href={`https://www.reddit.com/user/${user}/`}>u/94rud4</a> in
      <a href={`https://www.reddit.com/r/${subreddit}/`}>mathmemes</a>
    </blockquote>
  );
}
