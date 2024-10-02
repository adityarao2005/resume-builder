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
