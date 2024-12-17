import { IUserPayload } from "./user-payload"

declare global {
	namespace Express {
		interface Request {
			user: IUserPayload
		}
	}
}
