type WordCount = {
  word: string;
  count: number;
};

export type Post = {
  id: number;
  title: string;
  date_gmt: string;
  link: string;
  modified_gmt: string;
  contentWords: WordCount[];
  excerptWords: WordCount[];
};
