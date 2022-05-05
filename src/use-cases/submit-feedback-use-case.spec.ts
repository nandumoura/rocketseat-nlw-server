import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendmail: sendMailSpy }
)

describe("Submit feedback", () => {
    it("should send feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "data:image/png;base64 fdlksdkfjsdklfjksdljfkljsdklfj"
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()

    });

    it("should not be able to submit feedback without type", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            screenshot: "data:image/png;base64 fdlksdkfjsdklfjksdljfkljsdklfj"
        })).rejects.toThrow()
    });

    it("should not be able to submit feedback without comment", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64 fdlksdkfjsdklfjksdljfkljsdklfj"
        })).rejects.toThrow()
    });

    it("should not be able to submit feedback with an invalid screenshot", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "adsadkasd dasdask dasdasd",
            screenshot: "teste.jpg"
        })).rejects.toThrow()
    });
});