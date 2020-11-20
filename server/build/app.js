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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//    ROUTES
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const input_routes_1 = __importDefault(require("./routes/input.routes"));
const provider_routes_1 = __importDefault(require("./routes/provider.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const person_routes_1 = __importDefault(require("./routes/person.routes"));
const output_routes_1 = __importDefault(require("./routes/output.routes"));
const outputDetail_routes_1 = __importDefault(require("./routes/outputDetail.routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/employees', employee_routes_1.default);
        this.app.use('/products', product_routes_1.default);
        this.app.use('/inputs', input_routes_1.default);
        this.app.use('/providers', provider_routes_1.default);
        this.app.use('/categories', category_routes_1.default);
        this.app.use('/people', person_routes_1.default);
        this.app.use('/outputs', output_routes_1.default);
        this.app.use('/outputdetails', outputDetail_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}
exports.App = App;
