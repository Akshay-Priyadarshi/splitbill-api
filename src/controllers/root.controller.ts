import { Request, Response, NextFunction, Router } from "express"
import { ApiResponse } from "@/models/response.model"
import { RootService } from "@/services/root.service"

export class RootController {
    public router: Router
    private service: RootService

    constructor() {
        this.router = Router()
        this.initializeRoutes()
        this.service = new RootService()
    }

    initializeRoutes() {
        this.router.get("/check", this.check.bind(this))
        this.router.get("/greet/:name", this.greet.bind(this))
    }

    async check(req: Request, res: Response, next: NextFunction) {
        const apiResponse = new ApiResponse({
            message: "🚀 Application is up and running"
        })
        res.status(apiResponse.statusCode).json(apiResponse)
    }

    public greet(req: Request, res: Response, next: NextFunction) {
        const { name } = req.params
        const data = this.service.greet(name)
        const apiResponse = new ApiResponse({
            message: `Greeted successfully`,
            data
        })
        res.status(apiResponse.statusCode).json(apiResponse)
    }
}
