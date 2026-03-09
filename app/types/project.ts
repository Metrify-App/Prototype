export type Video = {
    thumbnail: string;
    title: string;
    author: string;
    platform: string;
    views: string;
};

export type ProjectStats = {
    mediaValue: string;
    views: string;
    followers: string;
    engagement: string;
};

export type Project = {
    id: string;
    name: string;
    logo: string | null;
    startDate: string;
    endDate: string | null;
    archived: boolean;
    pinned: boolean;
    stats: ProjectStats;
    videos: Video[];
};
