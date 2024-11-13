import json

def clean_resume(resume_data: dict) -> dict:
    # Clean the resume data here
    
    # Set name to "XXXXX XXXXX"
    resume_data['data']['name'] = "XXXXX XXXXX"

    # Set contact info to "XXXXXXXXXX"
    media_profiles = resume_data['data']['contactInfo']['mediaProfiles']
    for i in range(len(media_profiles)):
        profile = {
          "platform": media_profiles[i]['platform'],
          "handle": "XXXXXXXXXX"
        }
        media_profiles[i] = profile
        
    resume_data['data']['contactInfo']['mediaProfiles'] = media_profiles
    
    # Remove the address
    if 'address' in resume_data['data']['contactInfo']:
        del resume_data['data']['contactInfo']['address']
    
    # delete all the keys that are not needed or might give away API and info
    del resume_data['_id']
    del resume_data['userId']
    del resume_data['createdAt']
    del resume_data['documentId']
    del resume_data['_class']
    del resume_data['version']
    
    # Set the resume data to the cleaned data
    resume_data['resume'] = resume_data['data']
    del resume_data['data']
    return resume_data

if __name__ == '__main__':
    # The test the resume cleaning service
    with open("test_data/test_resume.json", "r") as f:
        test_resume = f.read()
    
        # Load the json data and clean it
        json_data = json.loads(test_resume)
        cleaned_data = clean_resume(json_data)
        test_resume = json.dumps(cleaned_data, indent=4)
        
        print(test_resume)