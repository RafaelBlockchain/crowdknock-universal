// src/requests/ChallengeSubmissionRequest.ts

export interface ChallengeSubmissionRequestParams {
  comment: string;
  file?: File | null;
}

export class ChallengeSubmissionRequest {
  comment: string;
  file?: File | null;

  constructor({ comment, file = null }: ChallengeSubmissionRequestParams) {
    this.comment = comment;
    this.file = file;
  }

  toFormData(): FormData {
    const formData = new FormData();
    formData.append('comment', this.comment);

    if (this.file) {
      formData.append('file', this.file);
    }

    return formData;
  }
}
