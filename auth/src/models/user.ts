import mongoose from "mongoose";

//AN interface that describe the properties
//that are required to create user
interface UserAttrs {
    email: string;
    password: string;
}

/* we make this interface to make user that the attrs which user input in new User when create
 user is true that we use to solve issue one of the problem of typescript and mongoose that the typescript
 must know all attrs will input when create user and it`s types
* */


//AN interface that describe the properties
//that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

/*
we make that to make typescript make sure about static function we do to model we extend all
function in mongoose model and give the model new function which we create with static
 */


//AN interface that describe the properties
//that a user document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

/*
we make that to solve issue 2 that about when we use the document of user which created we can access
all attrs of this doc the attrs which the user input when create user or the other attrs that
default in schema ,so we make in this interface all attrs in schema
 */

const userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
    /*
    we make this function to make Ts make sure that each attrs which input when create user
    is true ,so then we will use this function to create user
     */
}


const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
/*
<UserDoc,UserModel> this mean UserDoc that mean this model make user documents include all these attrs
in UserDoc , UserModel that mean this model is type of UserModel that include these function on it

 */

export {User};