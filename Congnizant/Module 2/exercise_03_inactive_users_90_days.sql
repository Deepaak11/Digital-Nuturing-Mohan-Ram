-- Exercise 3: Inactive Users (90 days)
-- Find users who have not registered for any event in the past 90 days

SELECT 
    u.user_id,
    u.full_name,
    u.email,
    u.registration_date,
    MAX(r.registration_date) as last_registration_date
FROM 
    Users u
LEFT JOIN 
    Registrations r ON u.user_id = r.user_id
GROUP BY 
    u.user_id, u.full_name, u.email, u.registration_date
HAVING 
    MAX(r.registration_date) IS NULL 
    OR MAX(r.registration_date) < DATE_SUB(CURDATE(), INTERVAL 90 DAY)
ORDER BY 
    last_registration_date DESC;
