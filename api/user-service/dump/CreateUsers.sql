INSERT INTO users 
VALUES (1, 'admin@gmail.com', '59c6ffe992ad64969de4808f97a1ea30', '1698329292459', 
'admin', '2023-10-18 13:08:35', '2023-10-18 13:08:35');

INSERT INTO user_infos 
VALUES (1, 1, 'admin@gmail.com', 'https://i.ibb.co/gdKNYMx/1683184422648379.jpg', 
'I study Comp Science', 'male', '2000-12-28', '2023-10-18 13:08:35', '2023-10-18 13:08:35');

INSERT INTO attempts (userId, questionName, attemptDate, attemptStatus) VALUES 
(1, 'New Years', '2023-11-06', 'success'),
(1, 'Lonely Integer', '2023-11-06', 'attempt'),
(1, 'Diagonal Difference', '2023-11-02', 'failure'),
(1, 'Common Child', '2023-11-02', 'attempt');


INSERT INTO attempt_details (userId, questionName, codeLanguage, savedCode) VALUES 
(1, 'New Years', 'python', 'for i in range(i):
    print("Hello")
    1 + i
    
def sayHello:
        print("hello wei Jie")'),
(1, 'New Years', 'java', 'public class New Years {

}');