const ftp = require("basic-ftp");
const fs = require("fs");

async function run() {
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
        
        await client.ensureDir(".ssh")
        console.log("Ensured .ssh directory")
        
        let keys = "";
        try {
            await client.downloadTo("authorized_keys.tmp", "authorized_keys")
            keys = fs.readFileSync("authorized_keys.tmp", "utf8")
        } catch (e) {
            console.log("No existing authorized_keys found or could not download", e.message)
        }
        
        const myKey = fs.readFileSync("/Users/ajmalifthikar/.ssh/id_rsa.pub", "utf8")
        if (!keys.includes(myKey.trim())) {
            keys += "\n" + myKey.trim() + "\n";
            fs.writeFileSync("authorized_keys.tmp", keys);
            await client.uploadFrom("authorized_keys.tmp", "authorized_keys")
            console.log("Uploaded new authorized_keys")
        } else {
            console.log("Key already exists in authorized_keys")
        }
        
    }
    catch(err) {
        console.log("ERROR", err)
    }
    client.close()
}

run()

