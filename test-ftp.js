const ftp = require("basic-ftp");
const fs = require("fs");

async function example() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "23.106.55.197",
            user: "agent@smartmotor.ae",
            password: "Smartmotor@2026",
            secure: "control",
            secureOptions: { rejectUnauthorized: false }
        })
        console.log("Connected!")
        const list = await client.list()
        console.log("Directory listing:", list.map(item => item.name))
        console.log("Current working directory:", await client.pwd())
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

example()
