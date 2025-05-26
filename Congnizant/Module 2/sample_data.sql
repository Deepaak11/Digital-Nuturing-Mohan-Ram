-- Sample Data for Event Portal
-- Users
INSERT INTO Users (full_name, email, city, registration_date) VALUES
('John Doe', 'john.doe@example.com', 'Chennai', '2023-12-01'),
('Jane Smith', 'jane.smith@example.com', 'Mumbai', '2023-12-15'),
('Robert Johnson', 'robert.j@example.com', 'Delhi', '2024-01-10'),
('Emily Davis', 'emily.d@example.com', 'Bangalore', '2024-01-20'),
('Michael Brown', 'michael.b@example.com', 'Hyderabad', '2024-02-05'),
('Sarah Wilson', 'sarah.w@example.com', 'Chennai', '2024-02-15'),
('David Lee', 'david.lee@example.com', 'Pune', '2024-03-01'),
('Lisa Wang', 'lisa.w@example.com', 'Mumbai', '2024-03-10'),
('James Taylor', 'james.t@example.com', 'Delhi', '2024-03-20'),
('Emma Martinez', 'emma.m@example.com', 'Bangalore', '2024-04-01');

-- Events
INSERT INTO Events (title, description, city, start_date, end_date, status, organizer_id) VALUES
('Tech Summit 2024', 'Annual technology conference for IT professionals', 'Bangalore', '2024-06-15', '2024-06-17', 'upcoming', 1),
('Data Science Workshop', 'Hands-on workshop on data analysis and visualization', 'Mumbai', '2024-07-05', '2024-07-06', 'upcoming', 2),
('Cloud Computing Expo', 'Explore the latest in cloud technologies', 'Delhi', '2024-05-20', '2024-05-21', 'upcoming', 3),
('Digital Marketing Conference', 'Learn strategies for digital marketing success', 'Chennai', '2024-04-25', '2024-04-26', 'completed', 4),
('AI & Machine Learning Summit', 'Cutting-edge AI and ML technologies', 'Hyderabad', '2024-08-10', '2024-08-12', 'upcoming', 5),
('Cybersecurity Workshop', 'Enhance your security skills', 'Pune', '2024-09-05', '2024-09-06', 'upcoming', 6),
('Blockchain Conference', 'Understanding blockchain technology', 'Bangalore', '2024-07-20', '2024-07-21', 'upcoming', 7),
('DevOps Days', 'CI/CD and DevOps best practices', 'Mumbai', '2024-05-10', '2024-05-11', 'completed', 8),
('UX/UI Design Workshop', 'Design thinking and user experience', 'Delhi', '2024-06-01', '2024-06-02', 'upcoming', 9),
('Mobile App Development', 'Build cross-platform mobile apps', 'Chennai', '2024-10-15', '2024-10-16', 'upcoming', 10);

-- Sessions
INSERT INTO Sessions (event_id, title, speaker_name, start_time, end_time) VALUES
(1, 'Keynote: Future of Tech', 'Dr. Alan Turing', '09:00:00', '10:30:00'),
(1, 'Cloud Native Applications', 'Sarah Johnson', '11:00:00', '12:30:00'),
(1, 'AI in Business', 'Dr. Lisa Ray', '14:00:00', '15:30:00'),
(2, 'Introduction to Data Science', 'Prof. Robert Chen', '10:00:00', '11:30:00'),
(2, 'Data Visualization with Python', 'Emily Wong', '12:00:00', '13:30:00'),
(3, 'Cloud Architecture', 'Michael Brown', '09:30:00', '11:00:00'),
(4, 'SEO Best Practices', 'David Kim', '10:30:00', '12:00:00'),
(5, 'Deep Learning Workshop', 'Dr. Andrew Ng', '10:00:00', '16:00:00'),
(6, 'Ethical Hacking', 'Kevin Mitnick', '09:00:00', '17:00:00'),
(7, 'Blockchain for Business', 'Vitalik Buterin', '11:00:00', '12:30:00');

-- Registrations
INSERT INTO Registrations (user_id, event_id, registration_date) VALUES
(1, 1, '2024-05-01'),
(2, 1, '2024-05-02'),
(3, 1, '2024-05-03'),
(4, 2, '2024-05-04'),
(5, 2, '2024-05-05'),
(6, 3, '2024-05-06'),
(7, 4, '2024-05-07'),
(8, 5, '2024-05-08'),
(9, 6, '2024-05-09'),
(10, 7, '2024-05-10'),
(1, 3, '2024-05-11'),
(2, 4, '2024-05-12'),
(3, 5, '2024-05-13'),
(4, 6, '2024-05-14'),
(5, 7, '2024-05-15');

-- Feedback
INSERT INTO Feedback (user_id, event_id, rating, comments, feedback_date) VALUES
(1, 1, 5, 'Excellent event with great speakers!', '2024-04-20'),
(2, 1, 4, 'Very informative sessions', '2024-04-21'),
(3, 2, 5, 'Learned a lot about data science', '2024-04-22'),
(4, 2, 3, 'Good content but too basic', '2024-04-23'),
(5, 3, 4, 'Great networking opportunities', '2024-04-24'),
(6, 4, 5, 'Amazing workshop!', '2024-04-25'),
(7, 5, 5, 'Best AI conference I\'ve attended', '2024-04-26'),
(8, 6, 4, 'Very technical but useful', '2024-04-27'),
(9, 7, 5, 'Loved the blockchain sessions', '2024-04-28'),
(10, 1, 4, 'Well organized event', '2024-04-29');

-- Resources
INSERT INTO Resources (event_id, resource_type, resource_url) VALUES
(1, 'Presentation', 'https://example.com/tech-summit-2024/presentations/day1'),
(1, 'Video', 'https://example.com/tech-summit-2024/videos/keynote'),
(2, 'Workshop Materials', 'https://example.com/datascience-workshop/materials'),
(3, 'Whitepaper', 'https://example.com/cloud-computing/whitepaper.pdf'),
(4, 'Slides', 'https://example.com/digital-marketing/slides'),
(5, 'Research Paper', 'https://example.com/ai-summit/research.pdf'),
(6, 'Hands-on Lab', 'https://example.com/cybersecurity/lab'),
(7, 'Case Study', 'https://example.com/blockchain/case-study.pdf'),
(8, 'Tutorial', 'https://example.com/devops/tutorial'),
(9, 'Design Templates', 'https://example.com/ux-workshop/templates');
