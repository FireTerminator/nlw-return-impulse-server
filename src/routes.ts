import express from 'express';

import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import {SubmitFeedbackCase} from './use-cases/submit-feedback-use-case'

export const routes = express.Router();



/* aula 03 tempo: 01:20:00 */




routes.post('/feedbacks', async (request, response) => {
  
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase  = new SubmitFeedbackCase(prismaFeedbacksRepository, nodemailerMailAdapter);


  await submitFeedbackUseCase.execute({
    type: request.body.type,
    comment: request.body.comment,
    screenshot: request.body.screenshot
  })

  return response.status(201).send();
})