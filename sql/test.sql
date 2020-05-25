SELECT * from todo;

SELECT title as things_to_do 
FROM todo 
WHERE title LIKE '%buy%';

SELECT * 
FROM todo 
WHERE levenshtein(title, 'buy cheese') < 8 
ORDER BY levenshtein(title, 'buy cheese');
