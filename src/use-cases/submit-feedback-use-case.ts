import { FeedbacksRepository } from "../repositories/feedbacks-repository"
import { MailAdapter } from "../adapters/mail-adapter"

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackUseCase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {

    }
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if (!type) {
            throw new Error("type is required");

        }
        if (!comment) {
            throw new Error("comment is required");
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format");

        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })
        await this.mailAdapter.sendmail({
            subject: "novo feedback",
            body: [
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>comentario  do feedback: ${comment}</p>`
            ].join("\n")
        })
    }
}