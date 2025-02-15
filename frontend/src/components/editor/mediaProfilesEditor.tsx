import { Field, Button, Input, Select } from "@headlessui/react";
import { Resume } from "@/models/types";
import Modal, { showModal } from "../modal";

// Courses editor
export interface IMediaProfileProps {
    mediaProfiles: Resume.IMediaProfile[],
    setMediaProfiles: (description: Resume.IMediaProfile[]) => void
}

// Add courses button
export function AddMediaProfileButton({ mediaProfiles, setMediaProfiles }: IMediaProfileProps) {
    return (
        <Field className="flex">
            <Button
                className="btn bg-base-100 shadow-md flex-1"
                onClick={() => setMediaProfiles([...mediaProfiles, { handle: '', platform: '' }])}>
                Add Media Profile
            </Button>
        </Field>
    )
}

// Courses view model
export function MediaProfilesComponent({ mediaProfiles, setMediaProfiles }: IMediaProfileProps) {
    // Return course view model list
    return mediaProfiles.map((mediaProfile, index) => (
        <Field key={index} className="flex flex-col">
            {
                // Platform input
            }
            <div className="flex flex-row">
                <Select name="sort-by" className="select select-bordered flex-1"
                    aria-label="Platform"
                    value={mediaProfile.platform}
                    onChange={(source) => {
                        const list = [...mediaProfiles];
                        list[index] = { ...list[index], platform: source.target.value };
                        setMediaProfiles(list);
                    }}>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Website">Website</option>
                </Select>
                {
                    // Handle of media profile
                }
                <Input
                    className="input input-bordered rounded-r-none"
                    value={mediaProfile.handle}
                    onChange={(source) => {
                        const list = [...mediaProfiles];
                        list[index] = { ...list[index], handle: source.target.value };
                        setMediaProfiles(list);
                    }}
                    type={mediaProfile.platform == "Phone" ? "tel" : (mediaProfile.platform == "Email" ? "email" : "text")}
                    placeholder="Handle for platform" />
                {
                    // Delete button
                }
                <Button
                    className="btn input-bordered rounded-l-none bg-base-300"
                    onClick={() => {
                        const list = [...mediaProfiles];
                        list.splice(index, 1);
                        setMediaProfiles(list);
                    }}>
                    X
                </Button>
            </div>
        </Field>
    ))
}

export default function MediaProfilesEditor({ mediaProfiles, setMediaProfiles }: IMediaProfileProps) {
    // Return course editor
    return (
        <>
            <Button className="btn input-bordered w-full bg-base-300" onClick={() => showModal('mediaProfiles')}>Open Media Profiles Editor</Button>

            <Modal name="mediaProfiles" title="Media Profiles">
                <AddMediaProfileButton mediaProfiles={mediaProfiles} setMediaProfiles={setMediaProfiles} />
                <MediaProfilesComponent mediaProfiles={mediaProfiles} setMediaProfiles={setMediaProfiles} />
            </Modal>
        </>
    );
}