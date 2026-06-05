import { toast } from "react-toastify";
import { serverMutation } from "../core/server";


const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const createJob = async (newJobData) => {
    return serverMutation('/api/jobs', newJobData)
}

// export const createJob = async (newJobData) => {
//     const res = await fetch(`${ServerUrl}/api/jobs`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newJobData)
//     })

//     return res.json()
// }


export const DeleteJob = async (jobId) => {
    // Standardizing the case for consistency
    const res = await fetch(`${ServerUrl}/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobId })
    });

    const data = await res.json();

    if (res.ok) {
        toast.success(data.message || 'Deleted successfully');
        return true; // Added return to notify component of success
    } else {
        console.error('Error:', data.error || data.message);
        toast.error(data.message || 'Failed to delete');
        return false;
    }
};


