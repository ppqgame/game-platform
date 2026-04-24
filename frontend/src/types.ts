export type PublicTag = { slug: string; name: string };

export type PublicCategory = { slug: string; name: string };

export type PublicGameCard = {
  slug: string;
  title: string;
  shortPitch: string;
  coverUrl: string | null;
  category: PublicCategory | null;
  tags: PublicTag[];
  publishedAt: string | null;
};

export type HomeSectionDTO = {
  key: string;
  title: string;
  kind: "HERO" | "GRID" | "LIST";
  games: PublicGameCard[];
};

export type BannerDTO = {
  id: string;
  title: string;
  imageUrl: string | null;
  videoUrl: string | null;
  gameId: string | null;
  startsAt: string | null;
  endsAt: string | null;
};

export type HomeResponse = { banners: BannerDTO[]; sections: HomeSectionDTO[] };

export type GamesListResponse = {
  page: number;
  pageSize: number;
  total: number;
  games: PublicGameCard[];
};

export type GameDetailDTO = {
  slug: string;
  title: string;
  shortPitch: string;
  description: string;
  playUrl: string | null;
  embedUrl: string | null;
  coverUrl: string | null;
  bannerUrl: string | null;
  mediaAssets: Array<{ kind: "ICON" | "BANNER" | "SCREENSHOT"; url: string; alt: string | null }>;
  screenshots: Array<{ url: string; alt: string | null }>;
  category: PublicCategory | null;
  tags: PublicTag[];
  publishedAt: string | null;
  ageRating?: string;
  developer?: string | null;
  cacheBust?: number;
  /** 横屏 / 竖屏 */
  screenOrientation?: "LANDSCAPE" | "PORTRAIT";
};

export type GameDetailResponse = { game: GameDetailDTO };

export type DiscoverResponse = {
  page: number;
  pageSize: number;
  total: number;
  games: PublicGameCard[];
};

export type SearchSuggestResponse = {
  suggestions: Array<{ slug: string; title: string }>;
  hotKeywords: string[];
  historyEnabled: boolean;
};

export type CommentItem = {
  id: string;
  stars: number | null;
  content: string;
  createdAt: string;
  user: { id: string; nickname: string; avatarUrl: string | null };
  replies: Array<{
    id: string;
    content: string;
    createdAt: string;
    user: { id: string; nickname: string; avatarUrl: string | null };
  }>;
};

export type CommentsResponse = {
  page: number;
  pageSize: number;
  total: number;
  comments: CommentItem[];
};

export type CategoriesResponse = {
  categories: Array<{ slug: string; name: string }>;
};

export type AdminLoginResponse = {
  token: string;
  refreshToken?: string;
  admin: { id: string; email: string };
};

export type GameAdminStatus = "DRAFT" | "REVIEW" | "TESTING" | "PUBLISHED" | "ARCHIVED";

export type AdminGamesResponse = {
  page: number;
  pageSize: number;
  total: number;
  games: Array<{
    id: string;
    slug: string;
    title: string;
    status: GameAdminStatus;
    updatedAt: string;
    createdAt: string;
    publishedAt: string | null;
    deletedAt: string | null;
    developer: string | null;
    launchCount: number;
    cacheBust: number;
    ageRating: string | null;
    isHot: boolean;
    isHomeRecommended: boolean;
    category: PublicCategory | null;
  }>;
};

export type AdminGameDTO = {
  id: string;
  slug: string;
  title: string;
  shortPitch: string;
  description: string;
  status: GameAdminStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  playUrl: string | null;
  embedUrl: string | null;
  categorySlug: string | null;
  tagSlugs: string[];
  coverUrl: string | null;
  bannerUrl: string | null;
  screenshotUrls: string[];
  developer: string | null;
  ageRating: string | null;
  screenOrientation: "LANDSCAPE" | "PORTRAIT";
  isHot: boolean;
  isHomeRecommended: boolean;
  titleI18nJson: string;
  extConfigJson: string;
  launchCount: number;
  cacheBust: number;
  lastReviewNote: string | null;
};

export type AdminGameResponse = { game: AdminGameDTO };

export type UserProfileResponse = {
  user: {
    id: string;
    nickname: string;
    avatarUrl: string | null;
    points: number;
    totalPlayCnt: number;
    totalPlaySecs: number;
    joinDays: number;
  };
};

export type UserCenterResponse = {
  recent: Array<{
    gameId: string;
    slug: string;
    title: string;
    progress: number;
    bestScore: number | null;
    lastPlayedAt: string;
    coverUrl: string | null;
  }>;
  favorites: Array<{ gameId: string; slug: string; title: string; coverUrl: string | null }>;
};
