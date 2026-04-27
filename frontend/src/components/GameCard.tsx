import { Link } from "react-router-dom";
import type { PublicGameCard } from "../types";

export function GameCard({ game }: { game: PublicGameCard }) {
  const cover = game.coverUrl ?? "https://picsum.photos/seed/placeholder/640/360";
  const score = (game.slug.length % 4) + 6;

  return (
    <Link className="gameCard" to={`/games/${encodeURIComponent(game.slug)}`}>
      <div className="gameCardCover">
        <img src={cover} alt="" loading="lazy" />
        {game.category ? (
          <span className="pill pill--onImage gameCategoryBadge" title={game.category.name}>
            <span className="gameCategoryHamburger" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            <span className="gameCategoryText">{game.category.name}</span>
          </span>
        ) : null}
        <span className="playBadge">Play</span>
      </div>
      <div className="gameCardBody">
        <div className="gameCardTitle">{game.title}</div>
        <div className="gameCardMeta">
          <span>★ {score}.0</span>
          <span>{game.publishedAt ? "Updated" : "New"}</span>
        </div>
        <div className="tagRow">
          {game.tags.slice(0, 3).map((t) => (
            <span key={t.slug} className="pill">
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
