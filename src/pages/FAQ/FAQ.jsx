// src/components/FAQ.jsx
import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
    {
        question: "How can I register for a medical camp?",
        answer: "You can register by visiting the 'Available Camps' section, selecting a camp, and clicking 'Join'. Fill out the required details and submit."
    },
    {
        question: "Who can participate in the camps?",
        answer: "Medical camps are open to all individuals, regardless of age or medical history. Some specialized camps may have specific eligibility requirements."
    },
    {
        question: "Is there any fee for participating?",
        answer: "Most camps are free of charge. Some specialized services or packages may require a small fee, which will be mentioned on the camp details page."
    },
    {
        question: "Can I volunteer for the medical camp?",
        answer: "Yes! You can join as a volunteer by filling out the volunteer registration form in the 'Volunteer' section of the website."
    },
    {
        question: "How will I receive updates about upcoming camps?",
        answer: "You can subscribe to our newsletter or enable notifications on your profile to receive regular updates about upcoming medical camps."
    },
];

const FAQ = () => {
    return (
        <Box sx={{ py: { xs: 12, sm: 16 }, px: { xs: 4, sm: 8 }, bgcolor: "gray.50" }}>
            <Typography variant="h4" align="center" fontWeight="bold" color="green" mb={2}>
                Frequently Asked Questions
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" mb={6}>
                Answers to the most common questions about our medical camps
            </Typography>

            {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2, boxShadow: 2, borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                        <Typography fontWeight="medium">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default FAQ;
