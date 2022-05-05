import express from "express";

import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedbacks-repository"
import { NodeMailerMailAdapter } from "./adapters/node-mailer/node-mailer-adapter"
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case"

export const routes = express.Router()

routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodeMailerAdapter = new NodeMailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbackRepository,
        nodeMailerAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    res.status(201).send()
})