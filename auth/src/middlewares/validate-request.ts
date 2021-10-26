import {Request,Response,NextFunction} from 'express';
import {validationResult} from 'express-validator';

import {RequestValidationErr} from '../errors/request-validation-err';

export const validateRequest = (req: Request, res: Response,next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        throw new RequestValidationErr(errors.array());
    }
    next();
};