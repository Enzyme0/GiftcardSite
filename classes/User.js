"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUser = exports.User = void 0;
//import all functions from '../helpers/db-funcs.ts'
const db = __importStar(require("../helpers/db-funcs"));
class User {
    constructor(id, name, email, password, balance, numberBought, isAdmin, purchases) {
        this.id = id || 0;
        this.name = name || '';
        this.email = email || '';
        this.password = password || '';
        this.balance = balance || 0;
        this.numberBought = numberBought || 0;
        this.isAdmin = isAdmin || false;
        this.purchases = purchases || [];
    }
    //constructor for just email and password and name
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getBalance() {
        return this.balance;
    }
    getNumberBought() {
        return this.numberBought;
    }
    getIsAdmin() {
        return this.isAdmin;
    }
    getPurchases() {
        return this.purchases;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
    setBalance(balance) {
        this.balance = balance;
    }
    setNumberBought(numberBought) {
        this.numberBought = numberBought;
    }
    setIsAdmin(isAdmin) {
        this.isAdmin = isAdmin;
    }
    setPurchases(purchases) {
        this.purchases = purchases;
    }
    addPurchase(purchase) {
        this.purchases.push(purchase);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.updateUser(this);
        });
    }
    newUser() {
        return __awaiter(this, void 0, void 0, function* () {
            //check to see if user exists
            let user = yield db.getUser(this.id);
            if (user)
                throw new Error('User already exists');
            yield db.addUser(this);
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield db.getUser(this.id);
            if (!user)
                throw new Error('User does not exist');
            console.log(user);
            this.name = user.name;
            this.email = user.email;
            this.password = user.password;
            this.balance = user.balance;
            this.numberBought = user.numberBought;
            this.isAdmin = user.isAdmin;
            this.purchases = user.purchases;
        });
    }
    loadByEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield db.findOne('users', { email: this.email });
            if (!user)
                throw new Error('User does not exist');
            this.id = user.id;
            this.name = user.name;
            this.password = user.password;
            this.balance = user.balance;
            this.numberBought = user.numberBought;
            this.isAdmin = user.isAdmin;
            this.purchases = user.purchases;
        });
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.User = User;
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.findOne('users', { id: userId });
    });
}
exports.getUser = getUser;
