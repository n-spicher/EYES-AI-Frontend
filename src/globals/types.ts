export interface ShowableRoute {
    Name?: string;
    Icon: string;
    Title: string;
    Chip: string;
    Color: string;
    Position?: number;
}

export interface AnyObject {
    [key: string]: any;
}

export interface InfoWindowLinkType {
    title: string;
    link: string;
    key: string;
}
