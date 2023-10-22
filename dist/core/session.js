"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
class Session {
    getUser() {
        return this.user;
    }
    setUser(user) {
        this.user = user;
    }
    setCredits(credits) {
        this.user.credits = credits;
    }
}
exports.session = new Session();
//# sourceMappingURL=session.js.map