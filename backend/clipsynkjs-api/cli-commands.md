# initiate a new project

npx @nestjs/cli new devmatch --package-manager npm --skip-git --directory .

# create the boilerplate for users modules with its controllers

npx @nestjs/cli generate module users
npx @nestjs/cli generate controller users

# Generate service boilerplate for Users

nest g s users

# Generate Resources

nest generate resource users
    When you run this, it will ask you two questions:
        What transport layer do you use? Select REST API.
        Would you like to generate CRUD entry points? Select Yes.
        This creates a src/users folder with everything you need, including a skeleton for your database entity.

# Generate Individual Component Commands

nest generate module users	nest g mo users	 # Creates the users.module.ts
nest generate service users	nest g s users	# Creates the users.service.ts
nest generate controller users	nest g co users	# Creates the users.controller.ts
nest generate class users/entities/user --no-spec
