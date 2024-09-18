export interface Email {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
}

export async function getPublicEmail(access_token: string): Promise<string | null> {
    const userEmailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
            "Authorization": `Bearer ${access_token}`,
        },
        cache: "no-cache",
    });

    if (!userEmailResponse.ok) {
        throw new Error("Failed to fetch user emails");
    }

    const emails: Email[] = await userEmailResponse.json();

    // Filter for the first email with visibility 'public'
    const publicEmail = emails.filter(email => email.visibility === 'public')[0];

    return publicEmail ? publicEmail.email : null;
}






export async function getUserProfile(access_token: string): Promise<any> {
    const userProfileResponse = await fetch("https://api.github.com/user", {
        headers: {
            "Authorization": `Bearer ${access_token}`,
        },
        cache: "no-cache",
    });

    if (!userProfileResponse.ok) {
        throw new Error("Failed to fetch user profile");
    }

    return await userProfileResponse.json();
}