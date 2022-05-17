import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator'
//we use body here to check validation in the body of request and pass to it the request
//we can also use in check query and params like we make with body
//validationResult is function that we will call it to get errors that come from express validation we use
import {RequestValidationError} from "../errors/request-validation-error";
import {User} from '../models/user';
import {DatabaseConnectionError} from "../errors/database-connection-error";

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').trim()
        .isLength({min: 4, max: 8})
        .withMessage('Password must be 4 and 20 characters')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    //get errors that come from validation the body of the request
    if (!errors.isEmpty()) { //if there are errors
        throw new RequestValidationError(errors.array());
    }
    const {email, password} = req.body;
    const existingUser = await User.findOne({email})
    if (existingUser) {
        console.log('Email in use');
        return res.send({});
    }
    const user = User.build({email, password});
    await user.save();

    res.status(201).json({
        user
    })
})

export {router as signupRouter}