export interface QuoteTag {
    id: number;
    name: string;
    category: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Quote {
    id: number;
    text: string;
    author: string;
    source: string | null;
    tags: QuoteTag[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateQuotePayload {
    text: string;
    author: string;
    source?: string | null;
    tagIds?: number[];
}

export type UpdateQuotePayload = Partial<CreateQuotePayload>;

export interface QuoteTagInput {
    name?: string;
    category?: string | null;
}
