import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { SiTwitter, SiYoutube } from './social/social-icons';

type Performance = {
  platform: string;
  title: string;
  views: string;
  rate: string;
  engagement: string;
};

const PLATFORM_ICON: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  twitter: SiTwitter,
  youtube: SiYoutube,
};

export default function BestPerformance({ data }: { data: Performance[] }) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-[var(--text-muted)] font-normal">
            Titre
          </TableHead>
          <TableHead className="text-right text-[var(--text-muted)] font-normal">
            View
          </TableHead>
          <TableHead className="text-right text-[var(--text-muted)] font-normal">
            Rate
          </TableHead>
          <TableHead className="text-right text-[var(--text-muted)] font-normal">
            Engagement
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((perf) => {
          const Icon = PLATFORM_ICON[perf.platform];
          return (
            <TableRow key={perf.title}>
              <TableCell className="flex items-center gap-2">
                {Icon && (
                  <Icon
                    size={14}
                    className="shrink-0 text-[var(--text-muted)]"
                  />
                )}
                <span className="truncate max-w-[280px]">{perf.title}</span>
              </TableCell>
              <TableCell className="text-right">{perf.views}</TableCell>
              <TableCell className="text-right">{perf.rate}</TableCell>
              <TableCell className="text-right">{perf.engagement}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
