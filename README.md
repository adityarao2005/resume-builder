# Resume Builder App

🚀 **Introducing My Resume Builder Project!** 📄✨  

Over the past 6 months, I’ve been hard at work creating a tool I wish I had during my last co-op hunt—a **resume builder designed to streamline resume management, tailoring, and scoring**. Here's what it can do:  

### **Key Features**  
✅ **AI-Powered Resume Creation:** Generates tailored resumes from a master profile, aligning your experiences with specific job descriptions.  
✅ **Real-Time Editing:** Edit your resume dynamically, with instant updates.  
✅ **Resume Scoring:** Evaluate your resume's alignment with a target role.  
✅ **Secure Authentication & Authorization:** Built with OAuth2 for privacy and security.  
✅ **Full CRUD Support:** Create, read, update, and delete resumes effortlessly.  
✅ **PDF Export:** Fine-tune your resume and export it with ease.  

### **Tech Stack**  
This project integrates a wide range of technologies, including:  
- **Frontend:** Next.js, TypeScript, TailwindCSS, DaisyUI, Redux, HeadlessUI, React-PDF/renderer.  
- **Backend:** Java, Spring Boot (OAuth2, WebSocket, STOMP, Data Mongo), Python (FastAPI, Scikit-learn, LangChain, Gemini, SpaCy).  
- **Database:** MongoDB, Firebase.  
- **Infrastructure:** Kubernetes, Docker.  

### **Why I Built This**  
Last year, while applying for summer co-op positions, I struggled with resume versioning, tailoring my experiences to job descriptions, and identifying which projects were most relevant. This frustration inspired me to create a tool that automates the process, making resume management more efficient and personalized.  

### **The Current State**  
📌 **Version 1.0.0** is an MVP and Open Source. A demo video is attached for a closer look!  

### **Looking for Your Thoughts!**  
💬 I’d love your **feedback, criticisms, and feature suggestions**.  
🤔 Any questions about the tech stack or functionality? I’m happy to dive into the details!  
👨‍💻 Want to contribute? Fork the project and make a pull request!

This project has been an incredible learning experience, especially while balancing university and co-op applications. I’m excited to hear your thoughts and see where this journey takes me!  

🎥 **Demo Video:** 

https://raw.githubusercontent.com/adityarao2005/resume-builder/master/demo.mp4

# Running it

You need an API key to run this application to work with AI models.
If you want to connect to an external MongoDB database, change the url on 'docker compose.yaml' file.
Want to run it in production? I've made some docker and kubernetes files to help run this project,
albiet incomplete since I never needed to host this in a production setting.

Run commands
```bash
/resume-builder/apps> docker compose up
```
