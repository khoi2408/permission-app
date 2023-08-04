export type IRoleCard = {
    id: string;
    name: string;
    description: string;
    coverUrl: string;
    avatarUrl: string;
    users?: string[];
    groups?: string[];
}