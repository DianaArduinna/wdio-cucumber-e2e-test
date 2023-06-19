import request from "supertest";
import reporter from "../helper/reporter.js"

let payload = {
    email: "eve.holt@reqres.in",
    password: "pistol"
}

// what is request
// console.log(`>> The typeof request: ${typeof request}`); //function
// console.log(`>> Number of args: ${request.length}`); // 1 arg
// console.log(`>> what is the of the function: ${request.toString()}`);

async function GET(testid: string, baseURL: string, endpoint: string, authToken: string, queryParam: object,) {
    if (!baseURL || !endpoint) {
        throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid `)
    }
    baseURL = baseURL.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testid, "info", `Making a GET to ${endpoint}`)
    try {
        return await request(baseURL)
            .get(endpoint)
            .query(queryParam)
            .auth(authToken, { type: 'bearer' })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
    } catch (err) {
        err.message = `Error making a GET call to ${endpoint}, ${err}`
        throw err
    }
}



// (async function POST(testid: string, baseURL:string, endpoint: string, authToken: string, payload: object){
//     if(!baseURL || !endpoint){
//      throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid.`)
//     }
//     baseURL = baseURL.trim();
//     endpoint = endpoint.trim();
//     reporter.addStep(testid, "info", `Making a POST to ${endpoint}`)
 
//      try {
//          let res = await request(baseURL)
//          .post(endpoint)
//          .auth(authToken, {type: 'bearer'})
//          .set("Content-Type", "application/json")
//          .set("Accept", "application/json")
//          .send(payload)
//          console.log(`Res: ${JSON.stringify(res)}`);

//      } catch (error) {
//          error.message = `Error making a POST call to ${endpoint}, ${error}`
//          throw error;
//      }
//  })("TC001", "https://reqres.in", "/api/register", "", payload);

export default { GET }

//"https://reqres.in"
//"/api/users?page=2"
