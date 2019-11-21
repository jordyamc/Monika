export class Poll {
    author: number;
    server: number;
    createdAt: Date;
    expiresAt: Date;
    title: string;
    roles: string[];
    options: Map<string, number>;
    usersVoted: number[];
    visible: boolean;
    anonymous: boolean;
}