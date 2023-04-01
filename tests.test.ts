//runtests
import { User } from './classes/User';
import * as bearer from './helpers/bearer';
import * as users from './helpers/users';
import * as db from './helpers/db-funcs';
const user = {
    id: 0,
    name: 'test',
    email: 'fart@fart.com',
    password: 'fart'
};

describe('User', () => {
    it('should create a new user', async () => {
        const newUser = new User(user.id, user.name, user.email, user.password, 0, 0, false, []);
        expect(newUser).toBeInstanceOf(User);
    });
});

describe('Bearer', () => {
    it('should create a bearer token', async () => {
        const newUser = new User(user.id, user.name, user.email, user.password, 0, 0, false, []);
        //create a bearer and verify it
        const token = bearer.createToken(newUser.toString());
        console.log(token)
        const decoded = await bearer.verifyToken(token);
        const bearerUser = bearer.bearerToUser(decoded);
        expect(bearerUser).toBeInstanceOf(User);
        console.log(decoded);
    });
});
//modify users test 
describe('Modify Users', () => {
    it('should create a new user, change their data, and save it', async () => {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJ0ZXN0IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY4MDExNDM0Ny4yMzIsImV4cCI6MTY4MTMyMzk0Ny4yMzJ9.qhsNK37ZX4LoZS9dukZNSXHx5R1mJ7OsA31m_V1S8ws"
        // const decoded = await bearer.verifyToken(token);
        // const bearerUser = bearer.bearerToUser(decoded);
        // //add 5 to their balance, and change their name from test to tested
        // bearerUser.balance += 5;
        // bearerUser.name = 'testeder';
        // //save the user
        //load user by id 1
        const tempUser = new User(0)
        await tempUser.load();  
        //add 5 to their balance, and change their name from test to tested
        tempUser.balance += 5;
        tempUser.name = 'testeder';
        //save the user
        await db.updateUser(tempUser);
        //load the user by id
        //load the user again, fresh
        const tempUser2 = new User(0)
        await tempUser2.load();
        //check to see if the user's balance and name have been updated
        expect(tempUser2.balance).toBe(tempUser.balance);
        expect(tempUser2.name).toBe('testeder');
    });
});
//q: how do i run this test?
//a: npm run test

//combine the three, and make sure they work together
describe('Modify Users', () => {
    //make a new user and save to the database
    it('should create a new user, get their bearer token, and change their data, then make sure it loads', async () => {
        //create a new user and save
        const newUser = await users.newUser("test", "test@test.com", "test");
        //load from their id, and make sure it's the same
        const tempUser = new User(newUser.id);
        await tempUser.load();
        expect(tempUser).toBeInstanceOf(User);
        //create a bearer and verify it
        const token = bearer.createToken(newUser.toString());
        const decoded = await bearer.verifyToken(token);
        const bearerUser = bearer.bearerToUser(decoded);
        expect(bearerUser).toBeInstanceOf(User);
        //add 5 to their balance, and change their name from test to tested
        bearerUser.balance += 5;
        bearerUser.name = 'testeder';
        //save the user
        await db.updateUser(bearerUser);
        //load the user again, fresh
        const tempUser2 = new User(newUser.id);
        await tempUser2.load();
        //check to see if the user's balance and name have been updated
        expect(tempUser2.balance).toBe(bearerUser.balance + 5);
        expect(tempUser2.name).toBe('testeder');
    });
});
