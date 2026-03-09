'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/app/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  SiTwitter,
  SiInstagram,
  SiYoutube,
  SiTwitch,
  SiTiktok,
} from '@/app/components/social/social-icons';
import { Video, Music } from 'lucide-react';

export function TwitterTable({ data }: { data: any[] }) {
  return (
    <Card className="shadow-none border-[var(--border-light)]">
      <CardHeader>
        <CardTitle className="text-base font-bold">Top tweets</CardTitle>
        <CardDescription className="text-xs">
          Top 5 tweets by engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
              <TableHead className="font-normal text-[var(--text-muted)] w-1/2">
                Tweet
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Impressions
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Engagement
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Likes
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Retweets
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Replies
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tweet) => (
              <TableRow key={tweet.id} className="border-[var(--border-light)]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                      <SiTwitter size={14} />
                    </div>
                    <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">
                      {tweet.text}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-sm">
                  {tweet.impressions}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center rounded bg-[var(--color-green-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-green)]">
                    {tweet.engagement}
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm">
                  {tweet.likes}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {tweet.retweets}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {tweet.replies}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function InstagramTable({ data }: { data: any[] }) {
  return (
    <Card className="shadow-none border-[var(--border-light)]">
      <CardHeader>
        <CardTitle className="text-base font-bold">Top Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
              <TableHead className="font-normal text-[var(--text-muted)] w-1/2">
                Post
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Type
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Reach
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Eng. Rate
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Likes
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Comments
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((post) => (
              <TableRow key={post.id} className="border-[var(--border-light)]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                      <SiInstagram size={14} />
                    </div>
                    <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">
                      {post.text}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-[var(--text-muted)]">
                  {post.type}
                </TableCell>
                <TableCell className="text-right font-bold text-sm">
                  {post.reach}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center rounded bg-[var(--color-green-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-green)]">
                    {post.engagement}
                  </span>
                </TableCell>
                <TableCell className="text-right text-sm">
                  {post.likes}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {post.comments}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function YoutubeTable({ data }: { data: any[] }) {
  return (
    <Card className="shadow-none border-[var(--border-light)]">
      <CardHeader>
        <CardTitle className="text-base font-bold">Top Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
              <TableHead className="font-normal text-[var(--text-muted)] w-1/2">
                Video
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Views
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Watch time
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Likes
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                CTR
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((video) => (
              <TableRow key={video.id} className="border-[var(--border-light)]">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded bg-[#f5f5f5] text-[var(--text-muted)]">
                      <Video size={14} />
                    </div>
                    <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">
                      {video.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-sm">
                  {video.views}
                </TableCell>
                <TableCell className="text-right text-sm text-[var(--text-muted)]">
                  {video.watchTime}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {video.likes}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center rounded bg-[var(--color-green-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-green)]">
                    {video.ctr}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function TwitchTable({ data }: { data: any[] }) {
  return (
    <Card className="shadow-none border-[var(--border-light)]">
      <CardHeader>
        <CardTitle className="text-base font-bold">Latest streams</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
              <TableHead className="font-normal text-[var(--text-muted)] w-1/2">
                Stream
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Category
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Peak Viewers
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Avg Viewers
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Duration
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((stream) => (
              <TableRow
                key={stream.id}
                className="border-[var(--border-light)]"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-12 shrink-0 items-center justify-center rounded bg-[#9146ff]/10 text-[#9146ff]">
                      <Video size={14} />
                    </div>
                    <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">
                      {stream.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-[var(--text-muted)]">
                  {stream.category}
                </TableCell>
                <TableCell className="text-right font-bold text-sm text-[#9146ff]">
                  {stream.maxViewers}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {stream.avgViewers}
                </TableCell>
                <TableCell className="text-right text-sm text-[var(--text-muted)]">
                  {stream.duration}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function TiktokTable({ data }: { data: any[] }) {
  return (
    <Card className="mt-6 shadow-none border-[var(--border-light)]">
      <CardHeader>
        <CardTitle className="text-base font-bold">Trending Videos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
              <TableHead className="font-normal text-[var(--text-muted)] w-1/2">
                TikTok Video
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Views
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Likes
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Comments
              </TableHead>
              <TableHead className="text-right font-normal text-[var(--text-muted)]">
                Shares
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tiktok) => (
              <TableRow
                key={tiktok.id}
                className="border-[var(--border-light)]"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                      <SiTiktok size={14} />
                    </div>
                    <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">
                      {tiktok.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-sm">
                  {tiktok.views}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {tiktok.likes}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {tiktok.comments}
                </TableCell>
                <TableCell className="text-right text-sm">
                  {tiktok.shares}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
