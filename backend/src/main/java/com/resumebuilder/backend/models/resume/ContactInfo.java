package com.resumebuilder.backend.models.resume;

import java.util.List;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Builder;

public class ContactInfo {
    private Address address;
    private List<MediaProfile> mediaProfiles;

    // Constructors, getters, and setters
    public ContactInfo() {
    }

    public ContactInfo(Address address, List<MediaProfile> mediaProfiles) {
        this.address = address;
        this.mediaProfiles = mediaProfiles;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<MediaProfile> getMediaProfiles() {
        return mediaProfiles;
    }

    public void setMediaProfiles(List<MediaProfile> mediaProfiles) {
        this.mediaProfiles = mediaProfiles;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((address == null) ? 0 : address.hashCode());
        result = prime * result + ((mediaProfiles == null) ? 0 : mediaProfiles.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ContactInfo other = (ContactInfo) obj;
        if (address == null) {
            if (other.address != null)
                return false;
        } else if (!address.equals(other.address))
            return false;
        if (mediaProfiles == null) {
            if (other.mediaProfiles != null)
                return false;
        } else if (!mediaProfiles.equals(other.mediaProfiles))
            return false;
        return true;
    }

    public static class ContactInfoBuilder implements Builder<ContactInfo> {
        private ContactInfo contactInfo;

        public ContactInfoBuilder() {
            contactInfo = new ContactInfo();
        }

        public ContactInfoBuilder withAddress(Address address) {
            contactInfo.setAddress(address);
            return this;
        }

        public ContactInfoBuilder withMediaProfiles(List<MediaProfile> mediaProfiles) {
            contactInfo.setMediaProfiles(mediaProfiles);
            return this;
        }

        @Override
        public ContactInfo build() {
            return contactInfo;
        }
    }

}
