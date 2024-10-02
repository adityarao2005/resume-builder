package com.resumebuilder.backend.models.resume;

import java.util.Map;

import com.resumebuilder.backend.models.Address;
import com.resumebuilder.backend.models.Builder;

public class ContactInfo {
    private String email;
    private String phone;
    private Address address;
    private Map<String, String> mediaProfiles;

    // Constructors, getters, and setters
    public ContactInfo() {
    }

    public ContactInfo(String email, String phone, Address address, Map<String, String> mediaProfiles) {
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.mediaProfiles = mediaProfiles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Map<String, String> getMediaProfiles() {
        return mediaProfiles;
    }

    public void setMediaProfiles(Map<String, String> mediaProfiles) {
        this.mediaProfiles = mediaProfiles;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((phone == null) ? 0 : phone.hashCode());
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
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (phone == null) {
            if (other.phone != null)
                return false;
        } else if (!phone.equals(other.phone))
            return false;
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

        public ContactInfoBuilder withEmail(String email) {
            contactInfo.setEmail(email);
            return this;
        }

        public ContactInfoBuilder withPhone(String phone) {
            contactInfo.setPhone(phone);
            return this;
        }

        public ContactInfoBuilder withAddress(Address address) {
            contactInfo.setAddress(address);
            return this;
        }

     


        @Override
        public ContactInfo build() {
            return contactInfo;
        }
    }

    
}
