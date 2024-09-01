// Path: src/models/types.ts
export namespace Common {
    export interface IAddress {
        city: string;
        country: string;
    }

    export interface IDescription {
        lines: string[];
    }

    export interface IDuration {
        start: Date;
        end: Date;
    }

    export interface IAward {
        title: string;
        date: Date;
        affiliatedTo?: string;
    }

    export interface IJob {
        title: string;
        company: string;
        duration: IDuration;
        description: IDescription;
    }

}

export namespace Resume {
    export interface ISkill {
        name: string;
        type: string;
        level?: string;
    }

    export interface IExperience extends Common.IJob {
        location: Common.IAddress;
    }

    export interface IProject {
        title: string;
        duration: Common.IDuration;
        description: Common.IDescription;
    }

    export interface IEducationEntry {
        institution: string; // e.g McMaster University
        degree: string; // potential values: Bachelors, Masters, PhD
        discipline: string; // e.g Computer Science
        location: Common.IAddress; // e.g Hamilton, ON
        courses: string[]; // e.g ["Data Structures", "Algorithms"]
        duration: Common.IDuration; // e.g {start: new Date("2015-09-01"), end: new Date("2019-04-30")}
        description: Common.IDescription;
        awards: Common.IAward[]; // e.g [{title: "Dean's Honour List", date: new Date("2018-04-30")}]
    }

    export type MediaProfile = 'LinkedIn' | 'Github' | 'Website';

    export interface IContactInfo {
        email: string;
        phone: string;
        address?: Common.IAddress;
        mediaProfiles: [MediaProfile, string][]; // e.g [["LinkedIn", "https://www.linkedin.com/in/username"]]
    }

    export interface ResumeDetails {
        name: string;
        contactInfo: IContactInfo;
        highlights?: Common.IDescription;
        education: IEducationEntry[];
        experiences?: IExperience[];
        projects?: IProject[];
        extraCurriculars?: IExperience[];
        skills?: ISkill[];
        awards?: Common.IAward[];
        hobbies?: string[];
        version: number;
        template: string;
    }

    export interface Resume {
        versions: ResumeDetails[];
        job: Common.IJob;
    }
}

export namespace Profile {

    export interface IProfileExperience extends Resume.IExperience {
        skills: Resume.ISkill[];
    }

    export interface IProfileProject extends Resume.IProject {
        skills: Resume.ISkill[];
    }

    export interface IProfile {
        userID: string;
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