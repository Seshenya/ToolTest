import { ReactNode } from "react";

export type RouterConfigData = {
    id: string;
    title: string;
    messageId: string;
    icon?: string | ReactNode;
    type: 'item' | 'group' | 'collapse' | 'divider';
    children?: RouterConfigData[];
    color?: string;
    path?: string;
    exact?: boolean;
    count?: number;
};