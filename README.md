# Resume Builder App

# Client Side technologies:

-   DaisyUI
    -   https://daisyui.com/docs/install/
-   HeadlessUI
    -   https://headlessui.com/
-   react-pdf
    -   https://react-pdf.org/
-   redux
    -   https://redux.js.org/tutorials/quick-start
-   Next.js

Backend

-   Texlive
-   sudo apt install texlive
- Maven Java 17 Spring boot

To Fix:
 - Add backend validation for education, name, contact info and all since we shouldnt have to rely on the ML worker to do the work for us
 - Ensure that Gemini description length has a word limit on the generator and that Gemini gives output what its told
 - Ensure that skills arent repeated (use a set for that)
 - Fix the division by zero error when no required skills that it can parse exist (if required is 0 then return 0 or shift the weight)
 - Transform the docker compose to kubernetes demployment files

Run commands
```bash
/resume-builder/apps> docker compose up
```