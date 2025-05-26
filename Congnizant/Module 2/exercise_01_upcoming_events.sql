-- Exercise 1: List all upcoming events in the user's city
-- Objective: Find all upcoming events happening in the same city as the user with user_id = 1

SELECT e.* 
FROM Events e
JOIN Users u ON e.city = u.city
WHERE e.status = 'upcoming' 
AND u.user_id = 1
AND e.start_date >= CURDATE()
ORDER BY e.start_date;
