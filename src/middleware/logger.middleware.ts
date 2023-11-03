import { logger } from "../util/logger";
import { Request, Response, NextFunction } from 'express';


export const LogAPI = (req: Request, res : Response, next : NextFunction ) => {
    const { method, originalUrl, body } = req;
    const fullUrl = `${req.protocol}://${req.get('host')}${originalUrl}`;
    const startTime = Date.now();
  
    res.on('finish', () => {
      const elapsedTime = Date.now() - startTime;
      const { statusCode } = res;
  
      logger.info({
        method,
        url : fullUrl,
        requestBody: body,
        responseStatus: statusCode,
        responseTime: elapsedTime + 'ms',
      });
    });
  
    next();
}