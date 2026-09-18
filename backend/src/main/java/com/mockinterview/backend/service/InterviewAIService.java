package com.mockinterview.backend.service;

import com.mockinterview.backend.entity.Question;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class InterviewAIService {

    @Autowired(required = false)
    private ChatClient.Builder chatClientBuilder;

    @Value("${spring.ai.openai.api-key:your-openai-api-key}")
    private String apiKey;

    public boolean isAIEnabled() {
        boolean enabled = chatClientBuilder != null && !apiKey.equals("your-openai-api-key") && !apiKey.isEmpty();
        System.out.println("AI Status Check - chatClientBuilder: " + (chatClientBuilder != null) + ", apiKey: " + (!apiKey.equals("your-openai-api-key") && !apiKey.isEmpty()) + ", Overall: " + enabled);
        return enabled;
    }

    public List<Question> generateQuestions(String targetRole, String interviewType, String difficulty, int numberOfQuestions) {
        if (!isAIEnabled()) {
            // Fallback to placeholder questions if AI is not configured
            return generatePlaceholderQuestions(targetRole, interviewType, difficulty, numberOfQuestions);
        }

        try {
            ChatClient chatClient = chatClientBuilder.build();
            List<Question> questions = new ArrayList<>();

            String prompt = String.format(
                "Generate %d %s %s interview questions for a %s position. " +
                "Return each question on a separate line, numbered 1-%d. " +
                "Make questions relevant to the role and difficulty level.",
                numberOfQuestions, difficulty.toLowerCase(), interviewType.toLowerCase(), targetRole, numberOfQuestions
            );

            String response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

            // Parse the AI response to extract questions
            String[] lines = response.split("\n");
            for (int i = 0; i < Math.min(lines.length, numberOfQuestions); i++) {
                String line = lines[i].trim();
                // Remove numbering if present
                line = line.replaceAll("^\\d+\\.\\s*", "");
                
                if (!line.isEmpty()) {
                    Question question = new Question();
                    question.setQuestionText(line);
                    question.setCategory(interviewType);
                    question.setDifficulty(difficulty);
                    question.setQuestionNumber(i + 1);
                    questions.add(question);
                }
            }

            // If we didn't get enough questions, fill with placeholders
            while (questions.size() < numberOfQuestions) {
                questions.add(createPlaceholderQuestion(targetRole, interviewType, difficulty, questions.size() + 1));
            }

            return questions;

        } catch (Exception e) {
            System.err.println("AI question generation failed: " + e.getMessage());
            return generatePlaceholderQuestions(targetRole, interviewType, difficulty, numberOfQuestions);
        }
    }

    public AnswerEvaluation evaluateAnswer(String question, String answer) {
        if (!isAIEnabled()) {
            // Fallback to placeholder evaluation if AI is not configured
            return new AnswerEvaluation(75, "Good answer. Could be more detailed.", "The answer covers the main points but could benefit from more specific examples and deeper explanation.");
        }

        try {
            ChatClient chatClient = chatClientBuilder.build();

            String prompt = String.format(
                "Evaluate this interview answer:\n\nQuestion: %s\nAnswer: %s\n\n" +
                "Provide a score from 0-100, brief feedback, and detailed assessment. " +
                "Format your response as:\nScore: [0-100]\nFeedback: [brief feedback]\nAssessment: [detailed assessment]",
                question, answer
            );

            String response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

            return parseAIResponse(response);

        } catch (Exception e) {
            System.err.println("AI answer evaluation failed: " + e.getMessage());
            return new AnswerEvaluation(75, "Good answer. Could be more detailed.", "The answer covers the main points but could benefit from more specific examples and deeper explanation.");
        }
    }

    public InterviewSummary generateInterviewSummary(List<Question> questions, List<String> answers, int overallScore) {
        if (!isAIEnabled()) {
            return new InterviewSummary(
                "Good performance overall. You demonstrated solid knowledge in the covered areas.",
                Arrays.asList("Provide more specific examples", "Practice articulating your thought process", "Work on time management")
            );
        }

        try {
            ChatClient chatClient = chatClientBuilder.build();

            StringBuilder qaPairs = new StringBuilder();
            for (int i = 0; i < Math.min(questions.size(), answers.size()); i++) {
                qaPairs.append(String.format("Q%d: %s\nA%d: %s\n\n", 
                    i+1, questions.get(i).getQuestionText(), 
                    i+1, answers.get(i)));
            }

            String prompt = String.format(
                "Analyze this interview performance with an overall score of %d/100:\n\n%s\n" +
                "Provide a brief summary and 3 specific areas for improvement. " +
                "Format your response as:\nSummary: [summary]\nAreas for improvement:\n1. [area 1]\n2. [area 2]\n3. [area 3]",
                overallScore, qaPairs.toString()
            );

            String response = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();

            return parseSummaryResponse(response);

        } catch (Exception e) {
            System.err.println("AI summary generation failed: " + e.getMessage());
            return new InterviewSummary(
                "Good performance overall. You demonstrated solid knowledge in the covered areas.",
                Arrays.asList("Provide more specific examples", "Practice articulating your thought process", "Work on time management")
            );
        }
    }

    private List<Question> generatePlaceholderQuestions(String targetRole, String interviewType, String difficulty, int numberOfQuestions) {
        List<Question> questions = new ArrayList<>();
        for (int i = 0; i < numberOfQuestions; i++) {
            questions.add(createPlaceholderQuestion(targetRole, interviewType, difficulty, i + 1));
        }
        return questions;
    }

    private Question createPlaceholderQuestion(String targetRole, String interviewType, String difficulty, int questionNumber) {
        Question question = new Question();
        
        // Generate more realistic placeholder questions based on interview type
        String questionText;
        String role = targetRole.toLowerCase();
        
        if (interviewType.equalsIgnoreCase("Technical")) {
            String[] technicalQuestions = {
                "Describe your experience with the key technologies and skills required for this position.",
                "How do you approach debugging and troubleshooting complex technical issues?",
                "Explain your experience with version control systems and collaborative development.",
                "Describe a challenging technical problem you solved and your approach.",
                "How do you stay updated with the latest technologies and industry trends?",
                "Explain your understanding of software design patterns and when to use them.",
                "Describe your experience with database design and optimization.",
                "How do you ensure code quality and maintainability in your projects?",
                "Explain your approach to testing and quality assurance.",
                "Describe your experience with cloud services and deployment."
            };
            questionText = technicalQuestions[questionNumber % technicalQuestions.length];
        } else if (interviewType.equalsIgnoreCase("Behavioral")) {
            String[] behavioralQuestions = {
                "Tell me about a time you had to work with a difficult team member.",
                "Describe a situation where you had to meet a tight deadline.",
                "How do you handle constructive criticism and feedback?",
                "Tell me about a time you had to adapt to significant changes.",
                "Describe your leadership style and give an example.",
                "How do you prioritize multiple tasks and projects?",
                "Tell me about a time you failed and what you learned from it.",
                "How do you approach conflict resolution in a team setting?",
                "Describe your ideal work environment and team culture.",
                "How do you motivate yourself and others during challenging projects?"
            };
            questionText = behavioralQuestions[questionNumber % behavioralQuestions.length];
        } else {
            // Mixed questions
            String[] mixedQuestions = {
                "Describe your technical background and why you're interested in this role.",
                "How do you balance technical excellence with business requirements?",
                "Tell me about a project where you had to learn a new technology quickly.",
                "How do you communicate complex technical concepts to non-technical stakeholders?",
                "Describe your experience with agile development methodologies.",
                "How do you approach continuous learning and skill development?",
                "Tell me about a time you had to make a difficult technical decision.",
                "How do you ensure your solutions are scalable and maintainable?",
                "Describe your experience with cross-functional collaboration.",
                "How do you handle pressure and tight deadlines in technical projects?"
            };
            questionText = mixedQuestions[questionNumber % mixedQuestions.length];
        }
        
        question.setQuestionText(questionText);
        question.setCategory(interviewType);
        question.setDifficulty(difficulty);
        question.setQuestionNumber(questionNumber);
        return question;
    }

    private AnswerEvaluation parseAIResponse(String response) {
        try {
            int score = 75; // default score
            String feedback = "Good answer.";
            String assessment = "The answer addresses the question adequately.";

            String[] lines = response.split("\n");
            for (String line : lines) {
                if (line.toLowerCase().startsWith("score:")) {
                    try {
                        score = Integer.parseInt(line.substring(6).trim());
                        score = Math.max(0, Math.min(100, score)); // Ensure score is between 0-100
                    } catch (NumberFormatException e) {
                        // Keep default score
                    }
                } else if (line.toLowerCase().startsWith("feedback:")) {
                    feedback = line.substring(8).trim();
                } else if (line.toLowerCase().startsWith("assessment:")) {
                    assessment = line.substring(11).trim();
                }
            }

            return new AnswerEvaluation(score, feedback, assessment);

        } catch (Exception e) {
            return new AnswerEvaluation(75, "Good answer. Could be more detailed.", "The answer covers the main points but could benefit from more specific examples.");
        }
    }

    private InterviewSummary parseSummaryResponse(String response) {
        try {
            String summary = "Good performance overall.";
            List<String> improvements = new ArrayList<>();

            String[] lines = response.split("\n");
            String currentSection = "";
            
            for (String line : lines) {
                line = line.trim();
                if (line.toLowerCase().startsWith("summary:")) {
                    currentSection = "summary";
                    summary = line.substring(8).trim();
                } else if (line.toLowerCase().startsWith("areas for improvement:")) {
                    currentSection = "improvements";
                } else if (currentSection.equals("improvements") && line.matches("^\\d+\\..*")) {
                    improvements.add(line.replaceFirst("^\\d+\\.\\s*", ""));
                }
            }

            if (improvements.isEmpty()) {
                improvements.add("Provide more specific examples");
                improvements.add("Practice articulating your thought process");
                improvements.add("Work on time management");
            }

            return new InterviewSummary(summary, improvements);

        } catch (Exception e) {
            return new InterviewSummary(
                "Good performance overall. You demonstrated solid knowledge in the covered areas.",
                Arrays.asList("Provide more specific examples", "Practice articulating your thought process", "Work on time management")
            );
        }
    }

    // Inner classes for AI responses
    public static class AnswerEvaluation {
        private final int score;
        private final String feedback;
        private final String assessment;

        public AnswerEvaluation(int score, String feedback, String assessment) {
            this.score = score;
            this.feedback = feedback;
            this.assessment = assessment;
        }

        public int getScore() { return score; }
        public String getFeedback() { return feedback; }
        public String getAssessment() { return assessment; }
    }

    public static class InterviewSummary {
        private final String summary;
        private final List<String> areasForImprovement;

        public InterviewSummary(String summary, List<String> areasForImprovement) {
            this.summary = summary;
            this.areasForImprovement = areasForImprovement;
        }

        public String getSummary() { return summary; }
        public List<String> getAreasForImprovement() { return areasForImprovement; }
    }
}