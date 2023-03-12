import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    //app.useGlobalPipes(new ValidationPipe());

    app.listen(PORT, () => console.log(`Server started on port: http://localhost:${PORT}`))
}

start();
