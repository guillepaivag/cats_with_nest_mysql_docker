import { User } from '../modules/users/entities/user.entity'

interface UserPayload {
    id: string
    email: string
    name: string
    role: string
}

declare global {
    namespace Express {
        interface Request {
            userPayload: UserPayload
        }
    }
}