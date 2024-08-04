import express from "express"
import cors from "cors"
import { appLogger } from "@/utils/logger.util"
import constants from "@/utils/constant.util"
import { RootController } from "@/controllers/root.controller"
import { errorMiddleware } from "./middlewares/error.middleware"

const initializeApp = () => {
    appLogger.info(`🚀 Initializing application in ${constants.NODE_ENV}`)
    const application = express()
    application.use(cors({ origin: "*" }))
    application.use(express.json())
    application.use(express.urlencoded({ extended: true }))
    const rootController = new RootController()
    application.use("/", rootController.router)
    application.use(errorMiddleware)
    application.listen(constants.PORT, () => {
        appLogger.info(
            `🚀 Server is running at http://localhost:${constants.PORT}`
        )
    })
}

initializeApp()
