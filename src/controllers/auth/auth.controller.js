import Users from '../../models/Users';
// import parserErrors from '../../utils/ParserErrors';

const AuthAccount = async (req, res) => {
	const { credentials } = req.body;
	const user = await Users.findOne({ email: credentials.email }).exec();
	if(user && user.isValidPassword(credentials.password)) {
		if(user.isAdminMaster || user.isAdmin){
			res.json({ user: user.toAuthJSON() });
		} else if(!user.confirmed) {
			res.status(400).json({ errors: { global: "Please activation your account" } });
		} else {
			res.status(400).json({ errors: { global: "Invalid credential" } });
		}
	} else {
		res.status(400).json({ errors: { global: "Invalid credential" } });
	}
};

export default AuthAccount;

