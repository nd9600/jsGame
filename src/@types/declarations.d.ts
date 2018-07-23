declare module "folktale/result" {
    const Result: {
        Ok: (parameter: any) => any,
        Error: (parameter: any) => any,
        matchWith: (parameter: any) => any,
    }
    
    export default Result;
}