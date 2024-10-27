package com.resumebuilder.backend.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.stereotype.Service;
import com.resumebuilder.backend.models.resume.Resume;
import com.resumebuilder.backend.service.ResumeCompilationService;

@Service
public class LaTeXCompilationService implements ResumeCompilationService {

    @Override
    public ResumeCompilationReport compileResume(ResumeCompilationRequest request, Resume resume)
            throws IOException, InterruptedException {
        // TODO Auto-generated method stub
        String latexData = templateJSONtoLaTeX(resume);

        // Create temporary input file and output directory
        Path tempInFile = Files.createTempFile("latex_input", ".tex");
        Path tempOutDir = Files.createTempDirectory("latex_output");

        try {
            // Write data to the temporary input file
            Files.write(tempInFile, latexData.getBytes());

            // Execute pdflatex command
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "pdflatex",
                    "-output-directory=" + tempOutDir.toString(),
                    "-jobname=output",
                    tempInFile.toString());
            processBuilder.inheritIO();
            Process process = processBuilder.start();
            process.waitFor();

            // Read the generated PDF file
            Path pdfFile = tempOutDir.resolve("output.pdf");
            byte[] data = Files.readAllBytes(pdfFile);

            // Return the pdf data
            return new ResumeCompilationReport(request.resume().getDocumentId(), data);
        } finally {
            // Clean up temporary files and directories
            Files.deleteIfExists(tempInFile);
            Files.walk(tempOutDir)
                    .sorted((a, b) -> b.compareTo(a)) // Delete files before directories
                    .forEach(path -> {
                        try {
                            Files.deleteIfExists(path);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        }
    }

    public String templateJSONtoLaTeX(Resume resume) {
        // TODO: for now, just return a simple LaTeX template
        StringBuilder sb = new StringBuilder();
        sb.append("\\documentclass{article}\n");
        sb.append("\\begin{document}\n");
        sb.append("Hello, World!\n");
        sb.append("\\end{document}\n");
        return sb.toString();
    }
}
