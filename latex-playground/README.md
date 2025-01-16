# Latex Playground

latex is going on in here

to install latex perform the following:

sudo apt update
sudo apt install texlive

## Test compilation with pipes

use "compile-latex-pipe.sh" to compile to latex

to test use the following command "cat hello.tex | ./compile-latex-pipe.sh > output.pdf"

In practice what we would do is have a process builder and set this as the task to execute and
execute it while having sysin and sysout linked to java

TODO: Implement this comple-latex-pipe logic into java code, management of temporary files with @Scheduled annotation
If you can specify the folder where your files are stored you can create a scheduled task that runs each hour and deletes the files older than one hour.

Take a look at the @Scheduled annotation.

https://stackoverflow.com/questions/16713173/is-there-a-proper-way-to-manage-temporary-files-in-spring-mvc-context