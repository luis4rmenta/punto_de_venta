import express, { Application } from 'express';
import morgan from 'morgan';

//    ROUTES
import IndexRoutes from './routes/index.routes';
import EmployeeRoutes from './routes/employee.routes';
import ProductRoutes from './routes/product.routes';
import InputRoutes from './routes/input.routes';
import ProviderRoutes from './routes/provider.routes';
import CategoryRoutes from './routes/category.routes'
import PersonRoutes from './routes/person.routes';
import OutputRoutes from './routes/output.routes';
import OutputDetailRoutes from './routes/outputDetail.routes';


export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/employees', EmployeeRoutes);
        this.app.use('/products', ProductRoutes);
        this.app.use('/inputs', InputRoutes);
        this.app.use('/providers', ProviderRoutes);
        this.app.use('/categories', CategoryRoutes);
        this.app.use('/people', PersonRoutes);
        this.app.use('/outputs', OutputRoutes);
        this.app.use('/outputdetails', OutputDetailRoutes);

    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`Server on port ${this.app.get('port')}`);
    }
}

