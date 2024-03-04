import 'dotenv/config'

const panelUrl = process.env.PANEL_URL;
const apiKey = process.env.PANEL_API_KEY
const totalCPU = 600;
export async function getAllUserData(email)
{
    const url = panelUrl + `/api/application/users?filter[email]=${email}&include=servers`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    };

    try {
        const response = await (await fetch(url, options)).json();
        const userData = response.data[0]; // Accessing the first user object
        const data = {
            status: "success",
            username: userData.attributes.username,
            id: userData.attributes.id,
            servers: [],
        };
        const relationships = userData.attributes.relationships; // Accessing the relationships object
        if (relationships && relationships.servers) {
            const serverList = relationships.servers.data;
            serverList.forEach((server) => {
                const serverData = {
                    name: server.attributes.name,
                    description: server.attributes.description,
                    uuid: server.attributes.uuid,
                    specs: {
                        ram: server.attributes.limits.memory,
                        cpu: server.attributes.limits.cpu,
                        storage: server.attributes.limits.disk,
                    }
                };
                data.servers.push(serverData);
            });
        } else {
            console.error("No server relationships found.");
        }
        return data;
    } catch (error) {
        console.error(error);
    }


}

export async function getAllServerAllocation(){
    const url = panelUrl + `/api/application/servers`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    };

    const response = await (await fetch(url, options)).json();
    const data = {
        cpu: 0,
        ram: 0,
        disk: 0,
    };

    response.data.forEach((server)=>{
        data.cpu += server.attributes.limits.cpu;
        data.ram += server.attributes.limits.memory;
        data.disk += server.attributes.limits.disk;
    })

    return data;

}

export async function getAllNodeAllocation(){
    const url = panelUrl + `/api/application/nodes`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey
        }
    };

    const response = await (await fetch(url, options)).json();
    const data = {
        cpu: totalCPU,
        ram: 0,
        disk: 0,
    };

    response.data.forEach((node)=>{
        data.ram += node.attributes.memory;
        data.disk += node.attributes.disk;
    })
    
    return data;
}
export async function getSystemAllocationStatus(){
    
    const serverAllocations = await getAllServerAllocation();
    const nodeAllocations = await getAllNodeAllocation()
    
    return {serverAllocation: serverAllocations, nodeAllocation: nodeAllocations};

}