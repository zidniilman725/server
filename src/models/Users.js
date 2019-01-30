import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'mongoose-unique-validator';

const SALT_WORK_FACTOR = 10;

const UsersSchema = new Schema(
	{
		name: { type: String },
		username: { type: String, index: true, unique: true },
		image: { type: String, default: '' },
		email: { type: String, lowercase: true, unique: true },
		password: { type: String },
		isAdminMaster: { type: Boolean, default: false },
		isAdmin: { type: Boolean, default: false },
		isOnline: { type: Boolean, default: false }
	},
	{
		timestamp: true
	}
);

UsersSchema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.password);
};

UsersSchema.methods.toAuthJSON = function toAuthJSON() {
	return {
		userId: this._id,
		name: this.email,
		image: this.image,
		email: this.email,
		confirmed: this.confirmed,
		isAdminMaster: this.isAdminMaster,
		isAdmin: this.isAdmin,
		token: this.generateJWT(),
	}
};

UsersSchema.methods.generateJWT = function generateJWT() {
	return jwt.sign({
		userId: this._id,
		name: this.name,
		username: this.username,
		email: this.email,
		isAdminMaster: this.isAdmin,
		isAdmin: this.isDeveloper,
		date: Date.now()
	}, process.env.SECRETOURTOKENS,
	{ expiresIn: "1d" });
};

UsersSchema.pre('save', function(next) {
    const user = this;
    if (user.password === undefined) {
        return next();
    }
    return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) console.log(err);
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) console.log(err);
            user.password = hash;
            next();
        });
    });
});

UsersSchema.plugin(validator);

export default mongoose.model('Users', UsersSchema);