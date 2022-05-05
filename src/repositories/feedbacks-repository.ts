export interface FeedbackCreateData {
    type: string,
    comment: string,
    screenshot?: string
}

export interface FeedbacksRepository {
    create: (date: FeedbackCreateData) => Promise<void>;
}