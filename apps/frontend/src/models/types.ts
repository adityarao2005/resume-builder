// Path: src/models/types.ts
export namespace Common {
    // Address interface
    export interface IAddress {
        city: string;
        country: string;
    }

    // Description interface
    export type IDescription = string[];

    // Duration interface
    export interface IDuration {
        start: string;
        end: string;
    }

    // Award interface
    export interface IAward {
        title: string;
        date: string;
        affiliatedTo?: string;
    }

    // Job interface
    export interface IJob {
        title: string;
        company: string;
        duration: IDuration;
        description: IDescription;
    }

}

// Resume namespace
export namespace Resume {
    // Skill interface
    export interface ISkill {
        name: string;
        type: string;
        level?: string;
    }

    // Experience interface
    export interface IExperience extends Common.IJob {
        location: Common.IAddress;
    }

    // Project interface
    export interface IProject {
        title: string;
        duration: Common.IDuration;
        description: Common.IDescription;
    }

    // Education entry interface
    export interface IEducationEntry {
        institution: string; // e.g McMaster University
        qualification: string; // e.g Bachelors of Computer Science
        location: Common.IAddress; // e.g Hamilton, ON
        courses: string[]; // e.g ["Data Structures", "Algorithms"]
        duration: Common.IDuration; // e.g {start: new Date("2015-09-01"), end: new Date("2019-04-30")}
        description: Common.IDescription;
    }

    // Media profile type
    export interface IMediaProfile {
        platform: string;
        handle: string;
    }

    // Contact information interface
    export interface IContactInfo {
        address?: Common.IAddress;
        mediaProfiles: IMediaProfile[]; // e.g [["LinkedIn", "https://www.linkedin.com/in/username"]]
    }

    // Resume details interface
    export interface ResumeData {
        name: string;
        contactInfo: IContactInfo;
        highlights: Common.IDescription;
        education: IEducationEntry[];
        experiences: IExperience[];
        projects: IProject[];
        extraCurriculars: IExperience[];
        skills: ISkill[];
        awards: Common.IAward[];
        hobbies: string[];
    }

    // Resume interface
    export interface Resume {
        // TODO: add a separate section for styling
        data: ResumeData;
        job: Common.IJob;
        createdAt: string;
        documentId?: string;
    }
}

// Profile namespace
export namespace Profile {

    // Profile experience interface
    export interface IProfileExperience extends Resume.IExperience {
        skills: Resume.ISkill[];
    }

    // Profile project interface
    export interface IProfileProject extends Resume.IProject {
        skills: Resume.ISkill[];
    }

    // Profile interface
    export interface IProfile {
        name: string;
        contactInfo: Resume.IContactInfo;
        education: Resume.IEducationEntry[];
        experiences: IProfileExperience[];
        projects: IProfileProject[];
        extraCurriculars: IProfileExperience[];
        otherSkills: Resume.ISkill[];
        otherAwards: Common.IAward[];
        hobbies: string[];
    }
}