import { Request, Response } from 'express';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';

export const routeAdapter = (controller: Controller) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    file: req.file,
  };
  const httpResponse: HttpResponse = await controller.handle(httpRequest);
  if (httpResponse.statusCode === 200) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  }
};
