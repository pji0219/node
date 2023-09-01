import { Request, Response } from 'express';
import * as tweetResponsitory from '../data/tweets';

export async function getTweets(req: Request, res: Response): Promise<void> {
  const tweets = await tweetResponsitory.getAll();
  res.status(200).json(tweets);
}
