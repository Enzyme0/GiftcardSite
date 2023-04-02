"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numUsers = exports.updateUser = exports.addUser = exports.getUser = exports.findOne = exports.insertOne = exports.getCollection = exports.getDb = exports.connectToDb = void 0;
const mongodb_1 = require("mongodb");
const dburl = 'mongodb://localhost:27017';
const mongoclient = new mongodb_1.MongoClient(dburl);
//how do i make all these exportable?
//a: 
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {}; // Add any required MongoClientOptions here
        try {
            console.log(dburl);
            console.log('connecting to db');
            const client = yield mongodb_1.MongoClient.connect(dburl, options);
            return client;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.connectToDb = connectToDb;
function getDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return connectToDb().then((client) => {
            return mongoclient.db('giftcardwebsite');
        });
    });
}
exports.getDb = getDb;
function getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        return getDb().then((db) => {
            return db.collection(collectionName);
        });
    });
}
exports.getCollection = getCollection;
function insertOne(collectionName, document) {
    return __awaiter(this, void 0, void 0, function* () {
        return getCollection(collectionName).then((collection) => {
            return collection.insertOne(document);
        });
    });
}
exports.insertOne = insertOne;
function findOne(collectionName, query) {
    return __awaiter(this, void 0, void 0, function* () {
        return getCollection(collectionName).then((collection) => {
            return collection.findOne(query);
        });
    });
}
exports.findOne = findOne;
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = findOne('users', { id: userId });
        return user;
    });
}
exports.getUser = getUser;
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        //make sure no user with this id exists
        let userExists = yield getUser(user.getId());
        if (userExists)
            throw new Error('User already exists');
        return insertOne('users', user);
    });
}
exports.addUser = addUser;
//should set any new properties to values specified in the user object
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield getCollection('users').then((collection) => __awaiter(this, void 0, void 0, function* () {
            console.log('updating user');
            return yield collection.updateOne({ id: user.getId() }, { $set: {
                    name: user.getName(),
                    email: user.getEmail(),
                    password: user.getPassword(),
                    balance: user.getBalance(),
                    numberBought: user.getNumberBought(),
                    isAdmin: user.getIsAdmin(),
                    purchases: user.getPurchases()
                }
            });
        }));
    });
}
exports.updateUser = updateUser;
function numUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return getCollection('users').then((collection) => {
            return collection.countDocuments();
        });
    });
}
exports.numUsers = numUsers;
