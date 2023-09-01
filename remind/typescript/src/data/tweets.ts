type Tweets = {
  id: string;
  text: string;
  createAt: Date;
  name: string;
  username: string;
  url?: string;
};

const tweets: Tweets[] = [
  {
    id: '1',
    createAt: new Date(),
    text: '아무말 대잔치',
    name: '뚱이',
    username: '뚱이',
    url: '',
  },
  {
    id: '2',
    createAt: new Date(),
    text: '으하하하하하',
    name: '스펀지 밥',
    username: '스펀지 밥',
    url: '',
  },
];

export async function getAll(): Promise<Tweets[]> {
  return tweets;
}
