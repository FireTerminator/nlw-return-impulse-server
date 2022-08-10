import { SubmitFeedbackCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackCase(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy}
)


describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, 1238364sdsd86a74hyrt687234',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64, 1238364sdsd86a74hyrt687234',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: '',
      screenshot: 'data:image/png;base64, 1238364sdsd86a74hyrt687234',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'Bug',
      comment: 'Ta tudo bugado',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
}); 