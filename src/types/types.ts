

export interface PostProps {
    id : number;
    title : string;
    url : string;
    likes : number;
    user : `0x${string}`;
}

export interface LikeDataProps {
    index : number;
    user : `0x${string}`
}