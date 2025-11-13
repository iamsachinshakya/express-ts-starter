
/** Enum for blog post status */
export enum IBlogPostStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
    SCHEDULED = "scheduled",
}

/** Enum for blog post visibility */
export enum IBlogPostVisibility {
    PUBLIC = "public",
    PRIVATE = "private",
    UNLISTED = "unlisted",
}

/** Featured image structure */
export interface IFeaturedImage {
    url: string;
    alt?: string;
    caption?: string;
}

/** Like structure */
export interface IBlogLike {
    user: string; // user id
    likedAt: Date;
}

/** SEO structure */
export interface IBlogSEO {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
}

/** Blog post entity interface */
export interface IBlogPostEntity {
    id: string; // _id or primary key
    title: string; // 10–200 characters
    slug: string; // unique URL-friendly identifier
    content: string; // minimum 100 characters
    excerpt?: string; // optional, max 300 characters // summary of the post or preview text 
    author: string; // user id 
    category: string; // category id
    tags: string[]; // lowercase
    featuredImage?: IFeaturedImage;
    status: IBlogPostStatus;
    visibility: IBlogPostVisibility;
    viewCount: number;
    likes: IBlogLike[];
    readTime: number; // in minutes
    seo?: IBlogSEO;
    publishedAt?: Date;
    scheduledFor?: Date;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Filters and pagination options for fetching blog posts
 */
export interface IBlogQueryOptions {
    /** Optional filters */
    filters?: {
        authorId?: string;             // Filter by author ID
        categoryId?: string;           // Filter by category ID
        status?: IBlogPostStatus;       // Filter by post status
        visibility?: IBlogPostVisibility; // Filter by visibility
        tags?: string[];               // Filter by tags (array)
        publishedBefore?: Date;        // Filter posts published before this date
        publishedAfter?: Date;         // Filter posts published after this date
    };

    /** Pagination: number of items to skip */
    skip?: number;

    /** Pagination: maximum number of items to return */
    limit?: number;
}
