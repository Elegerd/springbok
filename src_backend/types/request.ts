export default interface IRequest extends Request {
    userId: number,
    body: any,
    headers: any
}