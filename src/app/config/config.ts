const SERVER = 'DEV'

const BASE = {

    //? stubby
    STUBBY: {
        BASE_API: "",
        BASE_PATH_API: ""
    },

    //? test
    TEST: {
        BASE_API: "https://www.anapioficeandfire.com/api",
        BASE_PATH_API: ""
    },

    //? dev
    DEV: {
        BASE_API: "http://localhost:1150",
        BASE_PATH_API: ""
    },

    //? prod
    PROD: {
        BASE_API: "http://backendspringbootbook-env.eba-ad4jycde.us-west-2.elasticbeanstalk.com",
        BASE_PATH_API: ""
    }

}

export const BASE_API = BASE[SERVER].BASE_API
export const BASE_PATH_API = BASE[SERVER].BASE_PATH_API