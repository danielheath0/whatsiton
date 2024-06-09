export interface Genre {
  id: string;
  name: string;
}

export interface ImageSet {
  verticalPoster?: ImageURLs;
  horizontalPoster?: ImageURLs;
  verticalBackdrop?: ImageURLs;
  horizontalBackdrop?: ImageURLs;
}

export interface ImageURLs {
  w240?: string;
  w360?: string;
  w480?: string;
  w600?: string;
  w720?: string;
  w1080?: string;
  w1440?: string;
}

export interface StreamingService {
  id: string;
  name: string;
  homePage: string;
  themeColorCode: string;
  imageSet: {
    lightThemeImage: string;
    darkThemeImage: string;
    whiteImage: string;
  };
}

export interface StreamingOption {
  service: StreamingService;

  type: string;
  link: string;
  quality: string;
  audios: string[];
  subtitles: string[];
  price: {
    amount: string;
    currency: string;
    formatted: string;
  };
  expiresSoon: boolean;
  availableSince: number;
}

export interface Show {
  itemType: string;
  showType: string;
  id: string;
  imdbId: string;
  tmdbId: string;
  title: string;
  overview: string;
  releaseYear: number;
  originalTitle: string;
  genres: Genre[];
  directors: string[];
  cast: string[];
  rating: number;
  imageSet: ImageSet;
  streamingOptions: {
    [key: string]: StreamingOption[];
  };
}

export type ShowArray = Show[];

export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface ShowsState {
  shows: Show[];
  status: Status;
  error: null | string;
}

export interface FetchShowsParams {
  country: string;
  title: string;
  outputLanguage?: string;
}

// export interface RootState {
//   shows: ShowsState;
// }

export interface SearchFormProps {
  onCountryChange: (countryCode: string) => void;
}

export interface DisplayResultsProps {
  countryCode: string;
}

export interface User {
  fName: string;
  lName: string;
  email: string;
  uName: string;
  password: string;
  countryCode: string;
}

export interface UserShort {
  uName: string;
  password: string;
}

export interface UsersState {
  user: User;
  status: Status;
  error: null | string;
}

export interface RegisterFormProps {
  onRegister: () => void;
}

export interface LoginFormProps {
  onLogin: () => void;
}

export type WatchlistItem = {
  showId: string;
  showTitle: string;
  watched: boolean;
};

export interface WatchlistState {
  items: WatchlistItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
}

export type WatchListItemFromDB = {
  show_id: string;
  show_name: string;
  watched: boolean;
};
