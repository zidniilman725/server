import UsersController from '../controllers/admin/users.controller';

const resolvers = {
	Query: {
		getAllUser: UsersController.getAllUser,
		getOneUser: UsersController.getOneUser,
	},
	Mutation: {
		createAdminUser: UsersController.createAdminUser,
		updateAdminUser: UsersController.updateAdminUser,
		removeAdminUser: UsersController.removeAdminUser
	}
};

export default resolvers;