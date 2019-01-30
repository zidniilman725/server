import Users from '../../models/Users';

const validate = (user) => {
	if(!user && !user.isAdminMaster || !user.isAdmin) {
		throw new Error('You not have permission to access this page');
	};
}
export default {
	getAllUser: async () => {
		const users = await Users.find({}).exec();
		return users;
	},
	getOneUser: async (root, { id }, { user }) => {
		// // validate contect auth graphql
		// await validate(user);

		const User = Users.findById({_id: id}).exec();

		const response = await User;
		return response;

	},
	createAdminUser: async (root, { name, username, email, password }) => {
		
		// validate context auth graphql
		// await validate(user);

		const CreateUser = new Users({
			name,
			username,
			email,
			password
		});

		const response = await CreateUser.save();
		return response;
	},
	updateAdminUser: async (root, { id, name, username, email}, { user }) => {

		// validate context auth graphql
		// await validate(user);

		const UpdateUser = Users.findByIdAndUpdate({_id: id}, 
			{
				name,
				username,
				email
			}, 
			{ new: true}
		);

		const response = await UpdateUser;
		return UpdateUser
	},
	removeAdminUser: async (root, { id }) => {
		// validate context auth graphql
		// await validate(user);

		const RemoveUser = Users.findByIdAndRemove({ _id: id }).exec();

		const response = await RemoveUser;
		return response;

	}
}